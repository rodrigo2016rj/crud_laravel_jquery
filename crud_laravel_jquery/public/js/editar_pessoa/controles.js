$(document).ready(function(){
  /* Máscara do campo_cpf */
  const $campo_cpf = $("#campo_cpf");
  let ultimo_valor_campo_cpf = "";
  
  $campo_cpf.keyup(function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = $campo_cpf[0].selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_cpf = $campo_cpf.val();
      return;
    }
    
    $campo_cpf.val($campo_cpf.val().replace(/[^0-9]/g, ""));
    
    if($campo_cpf.val().length >= 3){
      $campo_cpf.val($campo_cpf.val().slice(0, 3) + "." + $campo_cpf.val().slice(3));
      if(posicao_do_cursor >= 3 && $campo_cpf.val().length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }
      if($campo_cpf.val().length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if($campo_cpf.val().length >= 7){
      $campo_cpf.val($campo_cpf.val().slice(0, 7) + "." + $campo_cpf.val().slice(7));
      if(posicao_do_cursor >= 7 && $campo_cpf.val().length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }
      if($campo_cpf.val().length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if($campo_cpf.val().length >= 11){
      $campo_cpf.val($campo_cpf.val().slice(0, 11) + "-" + $campo_cpf.val().slice(11));
      if(posicao_do_cursor === 12 && $campo_cpf.val().length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }
    }
    if($campo_cpf.val().length > 14){
      $campo_cpf.val($campo_cpf.val().slice(0, 14));
    }
    
    $campo_cpf[0].setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_cpf = $campo_cpf.val();
  });
  
  /* Seletor de data (calendário) do campo_data_de_nascimento */
  const $campo_data_de_nascimento = $("#campo_data_de_nascimento");
  const $span_icone_de_calendario_do_campo_data_de_nascimento = $("#span_icone_de_calendario_do_campo_data_de_nascimento");
  const $div_calendario = $("#div_calendario");
  const $caixa_de_selecao_de_mes_do_calendario = $("#caixa_de_selecao_de_mes_do_calendario");
  const $caixa_de_selecao_de_ano_do_calendario = $("#caixa_de_selecao_de_ano_do_calendario");
  const $celulas_do_calendario = $(".celula_do_calendario");
  const $botao_confirmar_do_calendario = $("#botao_confirmar_do_calendario");
  
  let dia_selecionado = null;
  let ocultar_div_calendario = true;
  
  $campo_data_de_nascimento.keyup(function(){
    atualizar_calendario();
  });
  
  $campo_data_de_nascimento.click(function(){
    ocultar_div_calendario = false;
  });
  
  $span_icone_de_calendario_do_campo_data_de_nascimento.click(function(){
    ocultar_div_calendario = false;
    mostrar_calendario();
  });
  
  /* Impedindo clique duplo selecionar o texto */
  $span_icone_de_calendario_do_campo_data_de_nascimento.mousedown(function(evento){
    evento.preventDefault();
  });
  
  function mostrar_calendario(){
    if($div_calendario.hasClass("tag_oculta")){
      let posicao_x = $campo_data_de_nascimento.offset().left;
      let posicao_y = $campo_data_de_nascimento.offset().top;
      
      posicao_y += $campo_data_de_nascimento.outerHeight();
      
      $div_calendario.css("position", "absolute");
      $div_calendario.css("left", posicao_x);
      $div_calendario.css("top", posicao_y);
      if(window.innerWidth <= 640){
        const largura_do_calendario = 348; //Em pixels.
        $div_calendario.css("left", window.innerWidth / 2 - largura_do_calendario / 2);
      }
      
      $div_calendario.removeClass("tag_oculta");
      
      atualizar_calendario();
    }else{
      $div_calendario.addClass("tag_oculta");
    }
  }
  
  function atualizar_calendario(){
    let valor = $campo_data_de_nascimento.val();
    let dia = null;
    let mes = null;
    let ano = null;
    let total_de_dias_do_mes = null;
    let ano_referencia = null;
    
    if(valor !== null && valor.match(/^\d{2}\/(0[1-9]|1[0-2])\/\d{4}$/)){
      dia = valor.substring(0, 2);
      mes = valor.substring(3, 5);
      ano = valor.substring(6, 10);
      
      if(dia.substring(0, 1) === "0"){
        dia = dia.substring(1, 2);
      }
      dia = parseInt(dia, 10);
      
      if(mes.substring(0, 1) === "0"){
        mes = mes.substring(1, 2);
      }
      mes = parseInt(mes, 10);
      
      ano = parseInt(ano, 10);
      
      total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
      
      ano_referencia = ano;
      
      if(dia > total_de_dias_do_mes){
        dia = total_de_dias_do_mes;
      }
    }else{
      const data_atual = new Date();
      dia = data_atual.getDate();
      mes = data_atual.getMonth() + 1;
      ano = data_atual.getFullYear() - 30;
      total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
      ano_referencia = ano;
    }
    
    dia_selecionado = dia;
    
    $caixa_de_selecao_de_mes_do_calendario.val(mes).change();
    
    const menor_ano = ano_referencia - 6;
    const maior_ano = ano_referencia + 5;
    $caixa_de_selecao_de_ano_do_calendario.html("");
    for(let i = menor_ano; i <= maior_ano; i++){
      let html_option = '<option value="' + i + '">' + i + "</option>";
      $caixa_de_selecao_de_ano_do_calendario.append(html_option);
    }
    $caixa_de_selecao_de_ano_do_calendario.val(ano).change();
    
    gerar_dias_do_mes(total_de_dias_do_mes);
  }
  
  $caixa_de_selecao_de_mes_do_calendario.change(function(){
    const mes = parseInt($caixa_de_selecao_de_mes_do_calendario.val(), 10);
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario.val(), 10);
    const total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(total_de_dias_do_mes);
  });
  
  $caixa_de_selecao_de_ano_do_calendario.change(function(){
    const mes = parseInt($caixa_de_selecao_de_mes_do_calendario.val(), 10);
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario.val(), 10);
    const total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(total_de_dias_do_mes);
  });
  
  function calcular_total_de_dias_do_mes(ano, mes){
    const mes_seguinte = mes + 1;
    const total_de_dias_do_mes = new Date(ano, mes_seguinte - 1, 0).getDate();
    return total_de_dias_do_mes;
  }
  
  function gerar_dias_do_mes(total_de_dias_do_mes){
    if(dia_selecionado > total_de_dias_do_mes){
      dia_selecionado = total_de_dias_do_mes;
    }
    
    const mes = parseInt($caixa_de_selecao_de_mes_do_calendario.val(), 10);
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario.val(), 10);
    const dia_da_semana_do_primeiro_dia_do_mes = new Date(ano, mes - 1, 1).getDay() + 1;
    const posicao_inicial = 7; //As posições de 0 a 6 são as legendas (exemplo: Dom, Seg, Ter e etc).
    const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    const posicao_do_ultimo_dia = total_de_dias_do_mes - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    let posicao_do_dia_selecionado = dia_selecionado - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    
    let numero_do_dia = 0;
    $celulas_do_calendario.each(function(posicao){
      if(posicao < 7){
        return; //continue;
      }
      
      $(this).html("");
      $(this).removeClass("dia_do_calendario");
      $(this).removeClass("dia_escolhido");
      
      if(posicao >= posicao_do_primeiro_dia && posicao <= posicao_do_ultimo_dia){
        numero_do_dia++;
        $(this).removeClass("tag_oculta");
        $(this).addClass("dia_do_calendario");
        $(this).html("<span>" + numero_do_dia + "</span>");
        if(posicao === posicao_do_dia_selecionado){
          $(this).addClass("dia_escolhido");
        }
      }else if(posicao > posicao_do_ultimo_dia){
        $(this).addClass("tag_oculta");
      }
    });
  }
  
  $celulas_do_calendario.click(function(){
    if($(this).hasClass("dia_do_calendario")){
      $celulas_do_calendario.each(function(){
        $(this).removeClass("dia_escolhido");
      });
      
      $(this).addClass("dia_escolhido");
      dia_selecionado = $(this).text();
    }
  });
  
  $botao_confirmar_do_calendario.click(function(){
    let dia = dia_selecionado;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = parseInt($caixa_de_selecao_de_mes_do_calendario.val(), 10);
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario.val(), 10);
    
    const valor = dia + "/" + mes + "/" + ano;
    if($campo_data_de_nascimento !== null){
      $campo_data_de_nascimento.val(valor);
    }
    
    $div_calendario.addClass("tag_oculta");
  });
  
  /* Descrição do setor aparece ao selecionar na caixa de seleção */
  const $caixa_de_selecao_setor = $("#caixa_de_selecao_setor");
  const $div_descricoes_dos_setores = $("#div_descricoes_dos_setores");
  
  let ocultar_div_descricoes_dos_setores = true;
  
  $caixa_de_selecao_setor.change(function(){
    if(window.innerWidth <= 640){
      return;
    }
    
    const id_do_setor = $caixa_de_selecao_setor.val();
    
    if(isNaN(id_do_setor) || id_do_setor % 1 != 0 || id_do_setor <= 0){
      $div_descricoes_dos_setores.addClass("tag_oculta");
      return;
    }
    
    ocultar_div_descricoes_dos_setores = false;
    $div_descricoes_dos_setores.removeClass("tag_oculta");
    
    const $descricoes_dos_setores = $(".descricao_do_setor");
    $descricoes_dos_setores.each(function(){
      $(this).addClass("tag_oculta");
    });
    
    const $div_descricao_do_setor = $("#div_descricao_do_setor_id_" + id_do_setor);
    $div_descricao_do_setor.removeClass("tag_oculta");
    
    let posicao_x = $caixa_de_selecao_setor.offset().left;
    let posicao_y = $caixa_de_selecao_setor.offset().top;
    
    posicao_x += $caixa_de_selecao_setor.outerWidth() + 10;
    posicao_y -= $div_descricoes_dos_setores.outerHeight() / 2;
    posicao_y += $caixa_de_selecao_setor.outerHeight() / 2;
    
    $div_descricoes_dos_setores.css("position", "absolute");
    $div_descricoes_dos_setores.css("left", posicao_x);
    $div_descricoes_dos_setores.css("top", posicao_y);
  });
  
  /* Máscara do campo_telefone_fixo */
  const $campo_telefone_fixo = $("#campo_telefone_fixo");
  
  $campo_telefone_fixo.keyup(function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = $campo_telefone_fixo[0].selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if($campo_telefone_fixo.val().charAt(0) !== "("){
      if(/[0-9]/.test($campo_telefone_fixo.val().charAt(0))){
        $campo_telefone_fixo.val("(" + $campo_telefone_fixo.val());
        atualizacao_do_cursor++;
      }else{
        $campo_telefone_fixo.val("(" + $campo_telefone_fixo.val().slice(1));
      }
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(1))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 1) + $campo_telefone_fixo.val().slice(2));
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(2))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 2) + $campo_telefone_fixo.val().slice(3));
    }
    if($campo_telefone_fixo.val().length > 3 && $campo_telefone_fixo.val().charAt(3) !== ")"){
      if(/[0-9]/.test($campo_telefone_fixo.val().charAt(3))){
        $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 3) + ")" + $campo_telefone_fixo.val().slice(3));
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 3) + ")" + $campo_telefone_fixo.val().slice(4));
      }
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(4))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 4) + $campo_telefone_fixo.val().slice(5));
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(5))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 5) + $campo_telefone_fixo.val().slice(6));
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(6))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 6) + $campo_telefone_fixo.val().slice(7));
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(7))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 7) + $campo_telefone_fixo.val().slice(8));
    }
    if($campo_telefone_fixo.val().length > 8 && $campo_telefone_fixo.val().charAt(8) !== "-"){
      if(/[0-9]/.test($campo_telefone_fixo.val().charAt(8))){
        $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 8) + "-" + $campo_telefone_fixo.val().slice(8));
        if(posicao_do_cursor >= 8){
          atualizacao_do_cursor++;
        }
      }else{
        $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 8) + "-" + $campo_telefone_fixo.val().slice(9));
      }
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(9))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 9) + $campo_telefone_fixo.val().slice(10));
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(10))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 10) + $campo_telefone_fixo.val().slice(11));
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(11))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 11) + $campo_telefone_fixo.val().slice(12));
    }
    if(/[^0-9]/.test($campo_telefone_fixo.val().charAt(12))){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 12) + $campo_telefone_fixo.val().slice(13));
    }
    if($campo_telefone_fixo.val().length > 13){
      $campo_telefone_fixo.val($campo_telefone_fixo.val().slice(0, 13));
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    $campo_telefone_fixo[0].setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Máscara do campo_telefone_movel */
  const $campo_telefone_movel = $("#campo_telefone_movel");
  
  $campo_telefone_movel.keyup(function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = $campo_telefone_movel[0].selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if($campo_telefone_movel.val().charAt(0) !== "("){
      if(/[0-9]/.test($campo_telefone_movel.val().charAt(0))){
        $campo_telefone_movel.val("(" + $campo_telefone_movel.val());
        atualizacao_do_cursor++;
      }else{
        $campo_telefone_movel.val("(" + $campo_telefone_movel.val().slice(1));
      }
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(1))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 1) + $campo_telefone_movel.val().slice(2));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(2))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 2) + $campo_telefone_movel.val().slice(3));
    }
    if($campo_telefone_movel.val().length > 3 && $campo_telefone_movel.val().charAt(3) !== ")"){
      if(/[0-9]/.test($campo_telefone_movel.val().charAt(3))){
        $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 3) + ")" + $campo_telefone_movel.val().slice(3));
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 3) + ")" + $campo_telefone_movel.val().slice(4));
      }
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(4))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 4) + $campo_telefone_movel.val().slice(5));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(5))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 5) + $campo_telefone_movel.val().slice(6));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(6))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 6) + $campo_telefone_movel.val().slice(7));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(7))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 7) + $campo_telefone_movel.val().slice(8));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(8))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 8) + $campo_telefone_movel.val().slice(9));
    }
    if($campo_telefone_movel.val().length > 9 && $campo_telefone_movel.val().charAt(9) !== "-"){
      if(/[0-9]/.test($campo_telefone_movel.val().charAt(9))){
        $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 9) + "-" + $campo_telefone_movel.val().slice(9));
        if(posicao_do_cursor >= 9){
          atualizacao_do_cursor++;
        }
      }else{
        $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 9) + "-" + $campo_telefone_movel.val().slice(10));
      }
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(10))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 10) + $campo_telefone_movel.val().slice(11));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(11))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 11) + $campo_telefone_movel.val().slice(12));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(12))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 12) + $campo_telefone_movel.val().slice(13));
    }
    if(/[^0-9]/.test($campo_telefone_movel.val().charAt(13))){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 13) + $campo_telefone_movel.val().slice(14));
    }
    if($campo_telefone_movel.val().length > 14){
      $campo_telefone_movel.val($campo_telefone_movel.val().slice(0, 14));
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    $campo_telefone_movel[0].setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Ocultando popups */
  $div_calendario.click(function(){
    ocultar_div_calendario = false;
  });
  $caixa_de_selecao_setor.click(function(){
    ocultar_div_descricoes_dos_setores = false;
  });
  $div_descricoes_dos_setores.click(function(){
    ocultar_div_descricoes_dos_setores = false;
  });
  
  $(document).click(function(){
    if(ocultar_div_calendario){
      $div_calendario.addClass("tag_oculta");
    }else{
      ocultar_div_calendario = true;
    }
    if(ocultar_div_descricoes_dos_setores){
      $div_descricoes_dos_setores.addClass("tag_oculta");
    }else{
      ocultar_div_descricoes_dos_setores = true;
    }
  });
});
