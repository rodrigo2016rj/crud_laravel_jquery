$(document).ready(function(){
  /* Máscara do campo_filtro_cpf */
  const $campo_filtro_cpf = $("#campo_filtro_cpf");
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
  
  /* Mostrar popup cadastrar pessoa */
  const $link_cadastrar_pessoa = $("#link_cadastrar_pessoa");
  const $div_cadastrar_pessoa = $("#div_cadastrar_pessoa");
  const $div_mensagem_cadastrar_pessoa = $("#div_mensagem_cadastrar_pessoa");
  const $span_mensagem_cadastrar_pessoa = $("#span_mensagem_cadastrar_pessoa");
  
  let ocultar_div_cadastrar_pessoa = true;
  
  $link_cadastrar_pessoa.click(function(evento){
    evento.preventDefault();
    
    $div_cadastrar_pessoa.removeClass("tag_oculta");
    ocultar_div_cadastrar_pessoa = false;
    
    $div_mensagem_cadastrar_pessoa.addClass("tag_oculta");
    $span_mensagem_cadastrar_pessoa.removeClass("mensagem_de_falha");
    $span_mensagem_cadastrar_pessoa.removeClass("mensagem_de_sucesso");
    $span_mensagem_cadastrar_pessoa.text("");
    
    var largura_da_div = $div_cadastrar_pessoa.outerWidth();
    var posicao_x = $(document).width() / 2 - largura_da_div / 2;
    if($(document).width() < 482){
      posicao_x = 0;
    }
    
    var altura_da_div = $div_cadastrar_pessoa.outerHeight();
    var posicao_y = $(window).scrollTop() + ($(window).height() - altura_da_div) / 2;
    if($(document).width() <= 640){
      var posicao_deste_link = $(this).offset();
      posicao_y = posicao_deste_link.top;
    }
    
    $div_cadastrar_pessoa.css("position", "absolute");
    $div_cadastrar_pessoa.offset({top: posicao_y, left: posicao_x});
  });
  
  $div_cadastrar_pessoa.on("click", ".div_fechar", function(){
    $div_cadastrar_pessoa.addClass("tag_oculta");
    ocultar_div_cadastrar_pessoa = true;
  });
  
  /* Máscara do campo_cpf do formulário cadastrar */
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
  
  /* Máscara do campo_telefone_fixo do formulário cadastrar */
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
  
  /* Máscara do campo_telefone_movel do formulário cadastrar */
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
  
  /* Mostrar popup visualizar pessoa */
  const $div_lista_de_pessoas = $("#div_lista_de_pessoas");
  const $div_visualizar_pessoa = $("#div_visualizar_pessoa");
  
  let ocultar_div_visualizar_pessoa = true;
  
  $div_lista_de_pessoas.on("click", ".pessoa>.local_do_nome_da_pessoa>.nome_da_pessoa", function(evento){
    evento.preventDefault();
    
    const href = $(this).attr("href");
    const id_da_pessoa = href.replace("pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = $("#div_visualizar_pessoa_do_id_" + id_da_pessoa).html();
    
    $div_visualizar_pessoa.html(html);
    $div_visualizar_pessoa.removeClass("tag_oculta");
    ocultar_div_visualizar_pessoa = false;
    
    var largura_da_div = $div_visualizar_pessoa.outerWidth();
    var posicao_x = $(document).width() / 2 - largura_da_div / 2;
    if($(document).width() < 882){
      posicao_x = 0;
    }
    
    var altura_da_div = $div_visualizar_pessoa.outerHeight();
    var posicao_y = $(window).scrollTop() + ($(window).height() - altura_da_div) / 2;
    if($(document).width() <= 640){
      var posicao_deste_link = $(this).offset();
      posicao_y = posicao_deste_link.top;
    }
    
    $div_visualizar_pessoa.css("position", "absolute");
    $div_visualizar_pessoa.offset({top: posicao_y, left: posicao_x});
  });
  
  $div_visualizar_pessoa.on("click", ".div_fechar", function(){
    $div_visualizar_pessoa.addClass("tag_oculta");
    ocultar_div_visualizar_pessoa = true;
  });
  
  /* Mostrar popup editar pessoa */
  const $div_editar_pessoa = $("#div_editar_pessoa");
  
  let ocultar_div_editar_pessoa = true;
  
  $div_lista_de_pessoas.on("click", ".pessoa>.local_das_opcoes_do_item_da_lista>.opcao_do_item_da_lista>.link_editar_pessoa", function(evento){
    evento.preventDefault();
    
    const href = $(this).attr("href");
    const id_da_pessoa = href.replace("editar_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = $("#div_editar_pessoa_do_id_" + id_da_pessoa).html();
    
    $div_editar_pessoa.html(html);
    $div_editar_pessoa.removeClass("tag_oculta");
    ocultar_div_editar_pessoa = false;
    
    var largura_da_div = $div_editar_pessoa.outerWidth();
    var posicao_x = $(document).width() / 2 - largura_da_div / 2;
    if($(document).width() < 482){
      posicao_x = 0;
    }
    
    var altura_da_div = $div_editar_pessoa.outerHeight();
    var posicao_y = $(window).scrollTop() + ($(window).height() - altura_da_div) / 2;
    if($(document).width() <= 640){
      var posicao_deste_link = $(this).offset();
      posicao_y = posicao_deste_link.top;
    }
    
    $div_editar_pessoa.css("position", "absolute");
    $div_editar_pessoa.offset({top: posicao_y, left: posicao_x});
  });
  
  $div_editar_pessoa.on("click", ".div_fechar", function(){
    $div_editar_pessoa.addClass("tag_oculta");
    ocultar_div_editar_pessoa = true;
  });
  
  /* Refazendo o comportamento dos labels */
  $div_editar_pessoa.on("click", "div>div>:not(.item_da_lista_de_sexos)", function(evento){
    evento.preventDefault();
    const atributo_for_do_label = $(this).attr("for");
    $div_editar_pessoa.find("." + atributo_for_do_label).focus();
  });
  $div_editar_pessoa.on("click", "div>div>.item_da_lista_de_sexos", function(){
    $(this).children("input")[0].checked = true;
  });
  
  /* Máscara do campo_cpf dos formulários de editar */
  let ultimo_valor_campo_cpf_do_formulario_de_editar = "";
  
  $div_editar_pessoa.on("keyup", ".div_editar_cpf>.div_campo_cpf>.campo_cpf", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = $(this)[0].selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_cpf_do_formulario_de_editar = $(this).val();
      return;
    }
    
    $(this).val($(this).val().replace(/[^0-9]/g, ""));
    
    if($(this).val().length >= 3){
      $(this).val($(this).val().slice(0, 3) + "." + $(this).val().slice(3));
      if(posicao_do_cursor >= 3 && $(this).val().length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }
      if($(this).val().length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if($(this).val().length >= 7){
      $(this).val($(this).val().slice(0, 7) + "." + $(this).val().slice(7));
      if(posicao_do_cursor >= 7 && $(this).val().length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }
      if($(this).val().length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if($(this).val().length >= 11){
      $(this).val($(this).val().slice(0, 11) + "-" + $(this).val().slice(11));
      if(posicao_do_cursor === 12 && $(this).val().length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }
    }
    if($(this).val().length > 14){
      $(this).val($(this).val().slice(0, 14));
    }
    
    $(this)[0].setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_cpf_do_formulario_de_editar = $(this).val();
  });
  
  /* Máscara do campo_telefone_fixo dos formulários de editar */
  $div_editar_pessoa.on("keyup", ".div_editar_telefone_fixo>.div_campo_telefone_fixo>.campo_telefone_fixo", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = $(this)[0].selectionStart;
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
    
    if($(this).val().charAt(0) !== "("){
      if(/[0-9]/.test($(this).val().charAt(0))){
        $(this).val("(" + $(this).val());
        atualizacao_do_cursor++;
      }else{
        $(this).val("(" + $(this).val().slice(1));
      }
    }
    if(/[^0-9]/.test($(this).val().charAt(1))){
      $(this).val($(this).val().slice(0, 1) + $(this).val().slice(2));
    }
    if(/[^0-9]/.test($(this).val().charAt(2))){
      $(this).val($(this).val().slice(0, 2) + $(this).val().slice(3));
    }
    if($(this).val().length > 3 && $(this).val().charAt(3) !== ")"){
      if(/[0-9]/.test($(this).val().charAt(3))){
        $(this).val($(this).val().slice(0, 3) + ")" + $(this).val().slice(3));
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        $(this).val($(this).val().slice(0, 3) + ")" + $(this).val().slice(4));
      }
    }
    if(/[^0-9]/.test($(this).val().charAt(4))){
      $(this).val($(this).val().slice(0, 4) + $(this).val().slice(5));
    }
    if(/[^0-9]/.test($(this).val().charAt(5))){
      $(this).val($(this).val().slice(0, 5) + $(this).val().slice(6));
    }
    if(/[^0-9]/.test($(this).val().charAt(6))){
      $(this).val($(this).val().slice(0, 6) + $(this).val().slice(7));
    }
    if(/[^0-9]/.test($(this).val().charAt(7))){
      $(this).val($(this).val().slice(0, 7) + $(this).val().slice(8));
    }
    if($(this).val().length > 8 && $(this).val().charAt(8) !== "-"){
      if(/[0-9]/.test($(this).val().charAt(8))){
        $(this).val($(this).val().slice(0, 8) + "-" + $(this).val().slice(8));
        if(posicao_do_cursor >= 8){
          atualizacao_do_cursor++;
        }
      }else{
        $(this).val($(this).val().slice(0, 8) + "-" + $(this).val().slice(9));
      }
    }
    if(/[^0-9]/.test($(this).val().charAt(9))){
      $(this).val($(this).val().slice(0, 9) + $(this).val().slice(10));
    }
    if(/[^0-9]/.test($(this).val().charAt(10))){
      $(this).val($(this).val().slice(0, 10) + $(this).val().slice(11));
    }
    if(/[^0-9]/.test($(this).val().charAt(11))){
      $(this).val($(this).val().slice(0, 11) + $(this).val().slice(12));
    }
    if(/[^0-9]/.test($(this).val().charAt(12))){
      $(this).val($(this).val().slice(0, 12) + $(this).val().slice(13));
    }
    if($(this).val().length > 13){
      $(this).val($(this).val().slice(0, 13));
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    $(this)[0].setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Máscara do campo_telefone_movel dos formulários de editar */
  $div_editar_pessoa.on("keyup", ".div_editar_telefone_movel>.div_campo_telefone_movel>.campo_telefone_movel", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = $(this)[0].selectionStart;
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
    
    if($(this).val().charAt(0) !== "("){
      if(/[0-9]/.test($(this).val().charAt(0))){
        $(this).val("(" + $(this).val());
        atualizacao_do_cursor++;
      }else{
        $(this).val("(" + $(this).val().slice(1));
      }
    }
    if(/[^0-9]/.test($(this).val().charAt(1))){
      $(this).val($(this).val().slice(0, 1) + $(this).val().slice(2));
    }
    if(/[^0-9]/.test($(this).val().charAt(2))){
      $(this).val($(this).val().slice(0, 2) + $(this).val().slice(3));
    }
    if($(this).val().length > 3 && $(this).val().charAt(3) !== ")"){
      if(/[0-9]/.test($(this).val().charAt(3))){
        $(this).val($(this).val().slice(0, 3) + ")" + $(this).val().slice(3));
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        $(this).val($(this).val().slice(0, 3) + ")" + $(this).val().slice(4));
      }
    }
    if(/[^0-9]/.test($(this).val().charAt(4))){
      $(this).val($(this).val().slice(0, 4) + $(this).val().slice(5));
    }
    if(/[^0-9]/.test($(this).val().charAt(5))){
      $(this).val($(this).val().slice(0, 5) + $(this).val().slice(6));
    }
    if(/[^0-9]/.test($(this).val().charAt(6))){
      $(this).val($(this).val().slice(0, 6) + $(this).val().slice(7));
    }
    if(/[^0-9]/.test($(this).val().charAt(7))){
      $(this).val($(this).val().slice(0, 7) + $(this).val().slice(8));
    }
    if(/[^0-9]/.test($(this).val().charAt(8))){
      $(this).val($(this).val().slice(0, 8) + $(this).val().slice(9));
    }
    if($(this).val().length > 9 && $(this).val().charAt(9) !== "-"){
      if(/[0-9]/.test($(this).val().charAt(9))){
        $(this).val($(this).val().slice(0, 9) + "-" + $(this).val().slice(9));
        if(posicao_do_cursor >= 9){
          atualizacao_do_cursor++;
        }
      }else{
        $(this).val($(this).val().slice(0, 9) + "-" + $(this).val().slice(10));
      }
    }
    if(/[^0-9]/.test($(this).val().charAt(10))){
      $(this).val($(this).val().slice(0, 10) + $(this).val().slice(11));
    }
    if(/[^0-9]/.test($(this).val().charAt(11))){
      $(this).val($(this).val().slice(0, 11) + $(this).val().slice(12));
    }
    if(/[^0-9]/.test($(this).val().charAt(12))){
      $(this).val($(this).val().slice(0, 12) + $(this).val().slice(13));
    }
    if(/[^0-9]/.test($(this).val().charAt(13))){
      $(this).val($(this).val().slice(0, 13) + $(this).val().slice(14));
    }
    if($(this).val().length > 14){
      $(this).val($(this).val().slice(0, 14));
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    $(this)[0].setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Mostrar popup excluir pessoa */
  const $div_excluir_pessoa = $("#div_excluir_pessoa");
  
  let ocultar_div_excluir_pessoa = true;
  
  $div_lista_de_pessoas.on("click", ".pessoa>.local_das_opcoes_do_item_da_lista>.opcao_do_item_da_lista>.link_excluir_pessoa", function(evento){
    evento.preventDefault();
    
    const href = $(this).attr("href");
    const id_da_pessoa = href.replace("excluir_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = $("#div_excluir_pessoa_do_id_" + id_da_pessoa).html();
    
    $div_excluir_pessoa.html(html);
    $div_excluir_pessoa.removeClass("tag_oculta");
    ocultar_div_excluir_pessoa = false;
    
    var largura_da_div = $div_excluir_pessoa.outerWidth();
    var posicao_x = $(document).width() / 2 - largura_da_div / 2;
    if($(document).width() < 482){
      posicao_x = 0;
    }
    
    var altura_da_div = $div_excluir_pessoa.outerHeight();
    var posicao_deste_link = $(this).offset();
    var posicao_y = posicao_deste_link.top - altura_da_div / 2;
    if($(document).width() <= 640){
      posicao_y = posicao_deste_link.top;
    }
    
    $div_excluir_pessoa.css("position", "absolute");
    $div_excluir_pessoa.offset({top: posicao_y, left: posicao_x});
  });
  
  $div_excluir_pessoa.on("click", ".div_fechar", function(){
    $div_excluir_pessoa.addClass("tag_oculta");
    ocultar_div_excluir_pessoa = true;
  });
  
  /* Seletor de data (calendário) dos campos de data */
  const $campo_filtro_data_de_nascimento = $("#campo_filtro_data_de_nascimento");
  const $span_icone_de_calendario_do_campo_filtro_data_de_nascimento = $("#span_icone_de_calendario_do_campo_filtro_data_de_nascimento");
  const $campo_data_de_nascimento = $("#campo_data_de_nascimento");
  const $span_icone_de_calendario_do_campo_data_de_nascimento = $("#span_icone_de_calendario_do_campo_data_de_nascimento");
  const $div_calendario = $("#div_calendario");
  const $caixa_de_selecao_de_mes_do_calendario = $("#caixa_de_selecao_de_mes_do_calendario");
  const $caixa_de_selecao_de_ano_do_calendario = $("#caixa_de_selecao_de_ano_do_calendario");
  const $celulas_do_calendario = $(".celula_do_calendario");
  const $botao_confirmar_do_calendario = $("#botao_confirmar_do_calendario");
  
  let alvo_do_calendario = null;
  let dia_selecionado = null;
  let ocultar_div_calendario = true;
  
  $campo_filtro_data_de_nascimento.keyup(function(){
    if(alvo_do_calendario === "filtro_data_de_nascimento"){
      atualizar_calendario();
    }
  });
  $campo_data_de_nascimento.keyup(function(){
    if(alvo_do_calendario === "cadastrar_data_de_nascimento"){
      atualizar_calendario();
    }
  });
  $div_editar_pessoa.on("keyup", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento", function(){
    if(alvo_do_calendario === "editar_data_de_nascimento"){
      atualizar_calendario();
    }
  });
  
  $campo_filtro_data_de_nascimento.click(function(){
    if(alvo_do_calendario === "filtro_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  });
  $campo_data_de_nascimento.click(function(){
    if(alvo_do_calendario === "cadastrar_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  });
  $div_editar_pessoa.on("click", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento", function(){
    if(alvo_do_calendario === "editar_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  });
  
  $span_icone_de_calendario_do_campo_filtro_data_de_nascimento.click(function(){
    ocultar_div_calendario = false;
    mostrar_calendario("filtro_data_de_nascimento");
  });
  $span_icone_de_calendario_do_campo_data_de_nascimento.click(function(){
    ocultar_div_calendario = false;
    mostrar_calendario("cadastrar_data_de_nascimento");
  });
  $div_editar_pessoa.on("click", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.span_icone_de_calendario_do_campo_data_de_nascimento", function(){
    ocultar_div_calendario = false;
    mostrar_calendario("editar_data_de_nascimento");
  });
  
  /* Impedindo clique duplo selecionar o texto */
  $span_icone_de_calendario_do_campo_filtro_data_de_nascimento.mousedown(function(evento){
    evento.preventDefault();
  });
  $span_icone_de_calendario_do_campo_data_de_nascimento.mousedown(function(evento){
    evento.preventDefault();
  });
  $div_editar_pessoa.on("mousedown", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.span_icone_de_calendario_do_campo_data_de_nascimento", function(evento){
    evento.preventDefault();
  });
  
  function mostrar_calendario(referencia_do_campo){
    if($div_calendario.hasClass("tag_oculta") || alvo_do_calendario !== referencia_do_campo){
      alvo_do_calendario = referencia_do_campo;
      
      let $campo_alvo = null;
      switch(alvo_do_calendario){
        case "filtro_data_de_nascimento":
          $campo_alvo = $campo_filtro_data_de_nascimento;
        break;
        case "cadastrar_data_de_nascimento":
          $campo_alvo = $campo_data_de_nascimento;
        break;
        case "editar_data_de_nascimento":
          $campo_alvo = $div_editar_pessoa.children(".div_editar_data_de_nascimento").children(".div_campo_data_de_nascimento").children(".campo_data_de_nascimento");
        break;
      }
      
      let posicao_x = $campo_alvo.offset().left;
      let posicao_y = $campo_alvo.offset().top;
      
      posicao_y += $campo_alvo.outerHeight();
      
      $div_calendario.css("position", "absolute");
      $div_calendario.css("left", posicao_x);
      $div_calendario.css("top", posicao_y);
      if(window.innerWidth <= 640){
        const largura_do_calendario = 347; //Em pixels.
        $div_calendario.css("left", window.innerWidth / 2 - largura_do_calendario / 2);
      }
      
      $div_calendario.removeClass("tag_oculta");
      
      atualizar_calendario();
    }else{
      $div_calendario.addClass("tag_oculta");
    }
  }
  
  function atualizar_calendario(){
    let $campo_alvo = null;
    switch(alvo_do_calendario){
      case "filtro_data_de_nascimento":
        $campo_alvo = $campo_filtro_data_de_nascimento;
      break;
      case "cadastrar_data_de_nascimento":
        $campo_alvo = $campo_data_de_nascimento;
      break;
      case "editar_data_de_nascimento":
        $campo_alvo = $div_editar_pessoa.children(".div_editar_data_de_nascimento").children(".div_campo_data_de_nascimento").children(".campo_data_de_nascimento");
      break;
    }
    
    let valor = $campo_alvo.val();
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
    let $campo_alvo = null;
    switch(alvo_do_calendario){
      case "filtro_data_de_nascimento":
        $campo_alvo = $campo_filtro_data_de_nascimento;
      break;
      case "cadastrar_data_de_nascimento":
        $campo_alvo = $campo_data_de_nascimento;
      break;
      case "editar_data_de_nascimento":
        $campo_alvo = $div_editar_pessoa.children(".div_editar_data_de_nascimento").children(".div_campo_data_de_nascimento").children(".campo_data_de_nascimento");
      break;
    }
    
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
    if($campo_alvo !== null){
      $campo_alvo.val(valor);
    }
    
    $div_calendario.addClass("tag_oculta");
  });
  
  /* Ocultando popups */
  $div_calendario.click(function(){
    ocultar_div_calendario = false;
    switch(alvo_do_calendario){
      case "cadastrar_data_de_nascimento":
        ocultar_div_cadastrar_pessoa = false;
      break;
      case "editar_data_de_nascimento":
        ocultar_div_editar_pessoa = false;
      break;
    }
  });
  $div_cadastrar_pessoa.click(function(){
    ocultar_div_cadastrar_pessoa = false;
  });
  $div_visualizar_pessoa.click(function(){
    ocultar_div_visualizar_pessoa = false;
  });
  $div_editar_pessoa.click(function(){
    ocultar_div_editar_pessoa = false;
  });
  $div_excluir_pessoa.click(function(){
    ocultar_div_excluir_pessoa = false;
  });
  
  $(document).click(function(){
    if(ocultar_div_calendario){
      $div_calendario.addClass("tag_oculta");
    }else{
      ocultar_div_calendario = true;
    }
    if(ocultar_div_cadastrar_pessoa){
      $div_cadastrar_pessoa.addClass("tag_oculta");
    }else{
      ocultar_div_cadastrar_pessoa = true;
    }
    if(ocultar_div_visualizar_pessoa){
      $div_visualizar_pessoa.addClass("tag_oculta");
    }else{
      ocultar_div_visualizar_pessoa = true;
    }
    if(ocultar_div_editar_pessoa){
      $div_editar_pessoa.addClass("tag_oculta");
    }else{
      ocultar_div_editar_pessoa = true;
    }
    if(ocultar_div_excluir_pessoa){
      $div_excluir_pessoa.addClass("tag_oculta");
    }else{
      ocultar_div_excluir_pessoa = true;
    }
  });
  
});
