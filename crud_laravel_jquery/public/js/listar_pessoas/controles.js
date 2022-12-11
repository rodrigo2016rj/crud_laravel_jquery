$(document).ready(function(){
  const $form_filtros = $("#form_filtros");
  const $campo_filtro_nome = $("#campo_filtro_nome");
  const $campo_filtro_cpf = $("#campo_filtro_cpf");
  const $campo_filtro_data_de_nascimento = $("#campo_filtro_data_de_nascimento");
  const $caixa_de_selecao_filtro_setor = $("#caixa_de_selecao_filtro_setor");
  const $caixa_de_selecao_quantidade_por_pagina = $("#caixa_de_selecao_quantidade_por_pagina");
  const $campo_ordenacao = $("#campo_ordenacao");
  
  /* Guardando backup dos valores do formulário de filtros */
  const filtro_nome = $campo_filtro_nome.val();
  const filtro_cpf = $campo_filtro_cpf.val();
  const filtro_data_de_nascimento = $campo_filtro_data_de_nascimento.val();
  const filtro_setor = $caixa_de_selecao_filtro_setor.val();
  const quantidade_por_pagina = $caixa_de_selecao_quantidade_por_pagina.val();
  const ordenacao = $campo_ordenacao.val();
  
  /* Máscara do campo_filtro_cpf */
  let ultimo_valor_campo_filtro_cpf = "";
  
  $campo_filtro_cpf.keyup(function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = $campo_filtro_cpf[0].selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_filtro_cpf = $campo_filtro_cpf.val();
      return;
    }
    
    $campo_filtro_cpf.val($campo_filtro_cpf.val().replace(/[^0-9]/g, ""));
    
    if($campo_filtro_cpf.val().length >= 3){
      $campo_filtro_cpf.val($campo_filtro_cpf.val().slice(0, 3) + "." + $campo_filtro_cpf.val().slice(3));
      if(posicao_do_cursor >= 3 && $campo_filtro_cpf.val().length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }
      if($campo_filtro_cpf.val().length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if($campo_filtro_cpf.val().length >= 7){
      $campo_filtro_cpf.val($campo_filtro_cpf.val().slice(0, 7) + "." + $campo_filtro_cpf.val().slice(7));
      if(posicao_do_cursor >= 7 && $campo_filtro_cpf.val().length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }
      if($campo_filtro_cpf.val().length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if($campo_filtro_cpf.val().length >= 11){
      $campo_filtro_cpf.val($campo_filtro_cpf.val().slice(0, 11) + "-" + $campo_filtro_cpf.val().slice(11));
      if(posicao_do_cursor === 12 && $campo_filtro_cpf.val().length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }
    }
    if($campo_filtro_cpf.val().length > 14){
      $campo_filtro_cpf.val($campo_filtro_cpf.val().slice(0, 14));
    }
    
    $campo_filtro_cpf[0].setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_filtro_cpf = $campo_filtro_cpf.val();
  });
  
  /* Seletor de data (calendário) do campo_filtro_data_de_nascimento */
  const $span_icone_de_calendario_do_campo_filtro_data_de_nascimento = $("#span_icone_de_calendario_do_campo_filtro_data_de_nascimento");
  const $div_calendario = $("#div_calendario");
  const $caixa_de_selecao_de_mes_do_calendario = $("#caixa_de_selecao_de_mes_do_calendario");
  const $caixa_de_selecao_de_ano_do_calendario = $("#caixa_de_selecao_de_ano_do_calendario");
  const $celulas_do_calendario = $(".celula_do_calendario");
  const $botao_confirmar_do_calendario = $("#botao_confirmar_do_calendario");
  
  let dia_selecionado = null;
  let ocultar_div_calendario = true;
  
  $campo_filtro_data_de_nascimento.keyup(function(){
    atualizar_calendario();
  });
  
  $campo_filtro_data_de_nascimento.click(function(){
    ocultar_div_calendario = false;
  });
  
  $span_icone_de_calendario_do_campo_filtro_data_de_nascimento.click(function(){
    ocultar_div_calendario = false;
    mostrar_calendario();
  });
  
  /* Impedindo clique duplo selecionar o texto */
  $span_icone_de_calendario_do_campo_filtro_data_de_nascimento.mousedown(function(evento){
    evento.preventDefault();
  });
  
  function mostrar_calendario(){
    if($div_calendario.hasClass("tag_oculta")){
      let posicao_x = $campo_filtro_data_de_nascimento.offset().left;
      let posicao_y = $campo_filtro_data_de_nascimento.offset().top;
      
      posicao_y += $campo_filtro_data_de_nascimento.outerHeight();
      
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
    let valor = $campo_filtro_data_de_nascimento.val();
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
    if($campo_filtro_data_de_nascimento !== null){
      $campo_filtro_data_de_nascimento.val(valor);
    }
    
    $div_calendario.addClass("tag_oculta");
  });
  
  /* Comportamento do botão buscar */
  const $botao_buscar = $("#botao_buscar");
  
  $botao_buscar.click(function(evento){
    evento.preventDefault();
    
    let quantidade_nao_enviada = 0;
    
    if($campo_filtro_nome.val() == ""){
      $campo_filtro_nome.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($campo_filtro_cpf.val() == ""){
      $campo_filtro_cpf.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($campo_filtro_data_de_nascimento.val() == ""){
      $campo_filtro_data_de_nascimento.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($caixa_de_selecao_filtro_setor.val() == ""){
      $caixa_de_selecao_filtro_setor.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($caixa_de_selecao_quantidade_por_pagina.val() == "padrao"){
      $caixa_de_selecao_quantidade_por_pagina.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($campo_ordenacao.val() == "padrao"){
      $campo_ordenacao.removeAttr("name");
      quantidade_nao_enviada++;
    }
    
    if(quantidade_nao_enviada == 6){
      window.location.href = "/listar_pessoas";
    }else{
      $form_filtros.submit();
    }
  });
  
  /* Comportamento do botão limpar */
  const $botao_limpar = $("#botao_limpar");
  
  $botao_limpar.click(function(evento){
    evento.preventDefault();
    window.location.href = "/listar_pessoas";
  });
  
  /* Comportamento dos links da paginação */
  const $links_da_paginacao = $("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
  
  $links_da_paginacao.click(function(evento){
    evento.preventDefault();
    
    /* Os valores devem ser aqueles utilizados na busca ao invés do que foi digitado após */
    $campo_filtro_nome.val(filtro_nome).change();
    $campo_filtro_cpf.val(filtro_cpf).change();
    $campo_filtro_data_de_nascimento.val(filtro_data_de_nascimento).change();
    $caixa_de_selecao_filtro_setor.val(filtro_setor).change();
    $caixa_de_selecao_quantidade_por_pagina.val(quantidade_por_pagina).change();
    $campo_ordenacao.val(ordenacao).change();
    
    if($campo_filtro_nome.val() == ""){
      $campo_filtro_nome.removeAttr("name");
    }
    if($campo_filtro_cpf.val() == ""){
      $campo_filtro_cpf.removeAttr("name");
    }
    if($campo_filtro_data_de_nascimento.val() == ""){
      $campo_filtro_data_de_nascimento.removeAttr("name");
    }
    if($caixa_de_selecao_filtro_setor.val() == ""){
      $caixa_de_selecao_filtro_setor.removeAttr("name");
    }
    if($caixa_de_selecao_quantidade_por_pagina.val() == "padrao"){
      $caixa_de_selecao_quantidade_por_pagina.removeAttr("name");
    }
    if($campo_ordenacao.val() == "padrao"){
      $campo_ordenacao.removeAttr("name");
    }
    
    let href = $(this).attr("href");
    let pagina = href.replace("/listar_pessoas?pagina=", "");
    let html_do_campo_pagina = '<input type="hidden" name="pagina" value="'+pagina+'"/>';
    
    $form_filtros.append(html_do_campo_pagina);
    $form_filtros.submit();
  });
  
  /* Ordenação */
  const $div_parte_nome_da_lista_de_pessoas = $("#div_parte_nome_da_lista_de_pessoas");
  const $div_parte_cpf_da_lista_de_pessoas = $("#div_parte_cpf_da_lista_de_pessoas");
  const $div_parte_setor_da_lista_de_pessoas = $("#div_parte_setor_da_lista_de_pessoas");
  const $div_parte_contato_da_lista_de_pessoas = $("#div_parte_contato_da_lista_de_pessoas");
  const $partes_da_lista = $(".parte_da_lista");
  
  /* Impedindo clique duplo selecionar o texto */
  $partes_da_lista.mousedown(function(evento){
    const texto = $(this).children().text();
    
    if(texto === "Opções"){
      return;
    }
    
    evento.preventDefault();
  });
  
  $partes_da_lista.click(function(){
    const texto = $(this).children().text();
    
    if(texto === "Opções"){
      return;
    }
    
    /* Os valores devem ser aqueles utilizados na busca ao invés do que foi digitado após */
    $campo_filtro_nome.val(filtro_nome).change();
    $campo_filtro_cpf.val(filtro_cpf).change();
    $campo_filtro_data_de_nascimento.val(filtro_data_de_nascimento).change();
    $caixa_de_selecao_filtro_setor.val(filtro_setor).change();
    $caixa_de_selecao_quantidade_por_pagina.val(quantidade_por_pagina).change();
    $campo_ordenacao.val(ordenacao).change();
    
    /* Trocando o valor após o clique */
    switch (texto){
      case "Nome":
        $campo_ordenacao.val("nome_completo_a_z").change();
        break;
      case "Nome (A → Z)":
        $campo_ordenacao.val("nome_completo_z_a").change();
        break;
      case "Nome (Z → A)":
        $campo_ordenacao.val("padrao").change();
        break;
      case "CPF":
        $campo_ordenacao.val("cpf_crescente").change();
        break;
      case "CPF (0 → 9)":
        $campo_ordenacao.val("cpf_decrescente").change();
        break;
      case "CPF (9 → 0)":
        $campo_ordenacao.val("padrao").change();
        break;
      case "Setor":
        $campo_ordenacao.val("setor_a_z").change();
        break;
      case "Setor (A → Z)":
        $campo_ordenacao.val("setor_z_a").change();
        break;
      case "Setor (Z → A)":
        $campo_ordenacao.val("padrao").change();
        break;
      case "Contato":
        $campo_ordenacao.val("contato_a_z").change();
        break;
      case "Contato (A → Z)":
        $campo_ordenacao.val("contato_z_a").change();
        break;
      case "Contato (Z → A)":
        $campo_ordenacao.val("padrao").change();
        break;
    }
    
    /* Não enviar valores vazios ou padrões */
    let quantidade_nao_enviada = 0;
    
    if($campo_filtro_nome.val() == ""){
      $campo_filtro_nome.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($campo_filtro_cpf.val() == ""){
      $campo_filtro_cpf.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($campo_filtro_data_de_nascimento.val() == ""){
      $campo_filtro_data_de_nascimento.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($caixa_de_selecao_filtro_setor.val() == ""){
      $caixa_de_selecao_filtro_setor.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($caixa_de_selecao_quantidade_por_pagina.val() == "padrao"){
      $caixa_de_selecao_quantidade_por_pagina.removeAttr("name");
      quantidade_nao_enviada++;
    }
    if($campo_ordenacao.val() == "padrao"){
      $campo_ordenacao.removeAttr("name");
      quantidade_nao_enviada++;
    }
    
    if(quantidade_nao_enviada == 6){
      window.location.href = "/listar_pessoas";
    }else{
      $form_filtros.submit();
    }
  });
  
  /* Ocultando popups */
  $div_calendario.click(function(){
    ocultar_div_calendario = false;
  });
  
  $(document).click(function(){
    if(ocultar_div_calendario){
      $div_calendario.addClass("tag_oculta");
    }else{
      ocultar_div_calendario = true;
    }
  });
  
});
