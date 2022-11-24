$(document).ready(function(){
  const $html = $("html");
  
  /* Filtros, ordenação e paginação da lista de pessoas */
  const $campo_filtro_nome = $("#campo_filtro_nome");
  const $campo_filtro_cpf = $("#campo_filtro_cpf");
  const $campo_filtro_data_de_nascimento = $("#campo_filtro_data_de_nascimento");
  const $caixa_de_selecao_filtro_setor = $("#caixa_de_selecao_filtro_setor");
  const $caixa_de_selecao_quantidade_por_pagina = $("#caixa_de_selecao_quantidade_por_pagina");
  
  const $botao_buscar = $("#botao_buscar");
  const $botao_limpar = $("#botao_limpar");
  
  const $div_local_da_lista_de_pessoas = $("#div_local_da_lista_de_pessoas");
  const $span_status_da_busca = $("#span_status_da_busca");
  
  const $div_paginacao_de_cima_da_lista_de_pessoas = $("#div_paginacao_de_cima_da_lista_de_pessoas");
  const $div_paginacao_de_baixo_da_lista_de_pessoas = $("#div_paginacao_de_baixo_da_lista_de_pessoas");
  const $paginacao = $.merge($div_paginacao_de_cima_da_lista_de_pessoas, $div_paginacao_de_baixo_da_lista_de_pessoas);
  
  const $div_partes_da_lista_de_pessoas = $("#div_partes_da_lista_de_pessoas");
  const $partes_da_lista = $(".parte_da_lista");
  const $div_lista_de_pessoas = $("#div_lista_de_pessoas");
  
  const $botao_confirmar_do_calendario = $("#botao_confirmar_do_calendario");
  
  const $div_cadastrar_pessoa = $("#div_cadastrar_pessoa");
  const $div_editar_pessoa = $("#div_editar_pessoa");
  
  let limpando = false;
  let ordenacao = null;
  let pagina = null;
  let contador_de_filtro = 0;
  
  $campo_filtro_nome.keyup(function(){
    setTimeout(function(){
      $botao_buscar.trigger("click");
    }, 0);
  });
  $campo_filtro_cpf.keyup(function(){
    setTimeout(function(){
      $botao_buscar.trigger("click");
    }, 0);
  });
  $campo_filtro_data_de_nascimento.keyup(function(){
    setTimeout(function(){
      $botao_buscar.trigger("click");
    }, 0);
  });
  $caixa_de_selecao_filtro_setor.change(function(){
    if(limpando){
      return;
    }
    setTimeout(function(){
      $botao_buscar.trigger("click");
    }, 0);
  });
  $caixa_de_selecao_quantidade_por_pagina.change(function(){
    if(limpando){
      return;
    }
    setTimeout(function(){
      $botao_buscar.trigger("click");
    }, 0);
  });
  $botao_confirmar_do_calendario.click(function(){
    if(!$div_cadastrar_pessoa.hasClass("tag_oculta") || !$div_editar_pessoa.hasClass("tag_oculta")){
      return;
    }
    setTimeout(function(){
      $botao_buscar.trigger("click");
    }, 0);
  });
  
  $botao_buscar.click(function(){
    let filtro_nome = $campo_filtro_nome.val();
    let filtro_cpf = $campo_filtro_cpf.val();
    let filtro_data_de_nascimento = $campo_filtro_data_de_nascimento.val();
    let filtro_id_do_setor = $caixa_de_selecao_filtro_setor.val();
    let quantidade_por_pagina = $caixa_de_selecao_quantidade_por_pagina.val();
    
    pagina = null;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    $span_status_da_busca.text("Buscando...");
    $span_status_da_busca.removeClass("tag_oculta");
    //$div_paginacao_de_cima_da_lista_de_pessoas.html(""); //Opcional
    //$div_partes_da_lista_de_pessoas.addClass("tag_oculta"); //Opcional
    //$div_lista_de_pessoas.html("Aguarde..."); //Opcional
    //$div_paginacao_de_baixo_da_lista_de_pessoas.html(""); //Opcional
    
    /* Requisição ajax */
    $.ajax({
      url: "/tudo_em_um/mostrar_pessoas_ajax",
      type: "GET",
      data: {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, filtro_data_de_nascimento: filtro_data_de_nascimento, 
             filtro_id_do_setor: filtro_id_do_setor, quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao},
      success: function(data){
        if(numero_desta_acao_filtrar >= contador_de_filtro){
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          $div_paginacao_de_cima_da_lista_de_pessoas.html(data["paginacao"]);
          //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          $div_lista_de_pessoas.html(data["lista"]);
          $div_paginacao_de_baixo_da_lista_de_pessoas.html(data["paginacao"]);
        }
      },
      dataType:"json"
    });
  });
  
  $botao_limpar.click(function(){
    limpando = true;
    
    $campo_filtro_nome.val("").change();
    $campo_filtro_cpf.val("").change();
    $campo_filtro_data_de_nascimento.val("").change();
    $caixa_de_selecao_filtro_setor.val("").change();
    $caixa_de_selecao_quantidade_por_pagina.val("padrao").change();
    
    $partes_da_lista.eq(0).children().text("Nome");
    $partes_da_lista.eq(1).children().text("CPF");
    $partes_da_lista.eq(2).children().text("Setor");
    $partes_da_lista.eq(3).children().text("Contato");
    ordenacao = null;
    
    pagina = null;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    $span_status_da_busca.text("Buscando...");
    $span_status_da_busca.removeClass("tag_oculta");
    $div_paginacao_de_cima_da_lista_de_pessoas.html(""); //Opcional
    $div_partes_da_lista_de_pessoas.addClass("tag_oculta"); //Opcional
    $div_lista_de_pessoas.html("Aguarde..."); //Opcional
    $div_paginacao_de_baixo_da_lista_de_pessoas.html(""); //Opcional
    
    /* Requisição ajax */
    $.ajax({
      url: "/tudo_em_um/mostrar_pessoas_ajax",
      type: "GET",
      data: {filtro_nome: "", filtro_cpf: "", filtro_data_de_nascimento: "", filtro_id_do_setor: "", 
             quantidade_por_pagina: "", ordenacao: null},
      success: function(data){
        if(numero_desta_acao_filtrar >= contador_de_filtro){
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          $div_paginacao_de_cima_da_lista_de_pessoas.html(data["paginacao"]);
          $div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          $div_lista_de_pessoas.html(data["lista"]);
          $div_paginacao_de_baixo_da_lista_de_pessoas.html(data["paginacao"]);
        }
      },
      dataType:"json"
    });
    
    limpando = false;
  });
  
  $partes_da_lista.click(function(){
    const texto = $(this).children().text();
    
    if(texto === "Opções"){
      return;
    }
    
    let filtro_nome = $campo_filtro_nome.val();
    let filtro_cpf = $campo_filtro_cpf.val();
    let filtro_data_de_nascimento = $campo_filtro_data_de_nascimento.val();
    let filtro_id_do_setor = $caixa_de_selecao_filtro_setor.val();
    let quantidade_por_pagina = $caixa_de_selecao_quantidade_por_pagina.val();
    
    $partes_da_lista.eq(0).children().text("Nome");
    $partes_da_lista.eq(1).children().text("CPF");
    $partes_da_lista.eq(2).children().text("Setor");
    $partes_da_lista.eq(3).children().text("Contato");
    
    /* Trocando o valor após o clique */
    switch (texto){
      case "Nome":
        ordenacao = "nome_completo_a_z";
        $(this).children().text("Nome (A → Z)");
        break;
      case "Nome (A → Z)":
        ordenacao = "nome_completo_z_a";
        $(this).children().text("Nome (Z → A)");
        break;
      case "Nome (Z → A)":
        ordenacao = "padrao";
        $(this).children().text("Nome");
        break;
      case "CPF":
        ordenacao = "cpf_crescente";
        $(this).children().text("CPF (0 → 9)");
        break;
      case "CPF (0 → 9)":
        ordenacao = "cpf_decrescente";
        $(this).children().text("CPF (9 → 0)");
        break;
      case "CPF (9 → 0)":
        ordenacao = "padrao";
        $(this).children().text("CPF");
        break;
      case "Setor":
        ordenacao = "setor_a_z";
        $(this).children().text("Setor (A → Z)");
        break;
      case "Setor (A → Z)":
        ordenacao = "setor_z_a";
        $(this).children().text("Setor (Z → A)");
        break;
      case "Setor (Z → A)":
        ordenacao = "padrao";
        $(this).children().text("Setor");
        break;
      case "Contato":
        ordenacao = "contato_a_z";
        $(this).children().text("Contato (A → Z)");
        break;
      case "Contato (A → Z)":
        ordenacao = "contato_z_a";
        $(this).children().text("Contato (Z → A)");
        break;
      case "Contato (Z → A)":
        ordenacao = "padrao";
        $(this).children().text("Contato");
        break;
    }
    
    pagina = null;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    $span_status_da_busca.text("Ordenando...");
    $span_status_da_busca.removeClass("tag_oculta");
    //$div_paginacao_de_cima_da_lista_de_pessoas.html(""); //Opcional
    //$div_partes_da_lista_de_pessoas.addClass("tag_oculta"); //Opcional
    //$div_lista_de_pessoas.html("Aguarde..."); //Opcional
    //$div_paginacao_de_baixo_da_lista_de_pessoas.html(""); //Opcional
    
    /* Requisição ajax */
    $.ajax({
      url: "/tudo_em_um/mostrar_pessoas_ajax",
      type: "GET",
      data: {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, filtro_data_de_nascimento: filtro_data_de_nascimento, 
             filtro_id_do_setor: filtro_id_do_setor, quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao},
      success: function(data){
        if(numero_desta_acao_filtrar >= contador_de_filtro){
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          $div_paginacao_de_cima_da_lista_de_pessoas.html(data["paginacao"]);
          //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          $div_lista_de_pessoas.html(data["lista"]);
          $div_paginacao_de_baixo_da_lista_de_pessoas.html(data["paginacao"]);
        }
      },
      dataType:"json"
    });
  });
  
  $paginacao.on("click", "a", function(evento){
    evento.preventDefault();
    
    let filtro_nome = $campo_filtro_nome.val();
    let filtro_cpf = $campo_filtro_cpf.val();
    let filtro_data_de_nascimento = $campo_filtro_data_de_nascimento.val();
    let filtro_id_do_setor = $caixa_de_selecao_filtro_setor.val();
    let quantidade_por_pagina = $caixa_de_selecao_quantidade_por_pagina.val();
    
    let href = $(this).attr("href");
    pagina = href.replace("/tudo_em_um?pagina=", "");
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    $span_status_da_busca.text("Mudando de página...");
    $span_status_da_busca.removeClass("tag_oculta");
    //$div_paginacao_de_cima_da_lista_de_pessoas.html(""); //Opcional
    //$div_partes_da_lista_de_pessoas.addClass("tag_oculta"); //Opcional
    //$div_lista_de_pessoas.html("Aguarde..."); //Opcional
    //$div_paginacao_de_baixo_da_lista_de_pessoas.html(""); //Opcional
    
    if($(this).offset().top > $div_lista_de_pessoas.offset().top){
      var posicao_alvo = $div_local_da_lista_de_pessoas.offset().top;
      $html.animate({scrollTop: posicao_alvo - 4}, 175, "swing");
    }
    
    /* Requisição ajax */
    $.ajax({
      url: "/tudo_em_um/mostrar_pessoas_ajax",
      type: "GET",
      data: {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, filtro_data_de_nascimento: filtro_data_de_nascimento, 
             filtro_id_do_setor: filtro_id_do_setor, quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao, 
             pagina: pagina},
      success: function(data){
        if(numero_desta_acao_filtrar >= contador_de_filtro){
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          $div_paginacao_de_cima_da_lista_de_pessoas.html(data["paginacao"]);
          //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          $div_lista_de_pessoas.html(data["lista"]);
          $div_paginacao_de_baixo_da_lista_de_pessoas.html(data["paginacao"]);
        }
      },
      dataType:"json"
    });
  });
  
  /* Formulário Cadastrar Pessoa */
  const $campo_nome = $("#campo_nome");
  const $campo_sobrenome = $("#campo_sobrenome");
  const $campo_cpf = $("#campo_cpf");
  const $campo_data_de_nascimento = $("#campo_data_de_nascimento");
  const $botoes_de_radio_para_sexo = $("input[type='radio'][name='sexo']");
  const $caixa_de_selecao_setor = $("#caixa_de_selecao_setor");
  const $campo_email = $("#campo_email");
  const $campo_telefone_fixo = $("#campo_telefone_fixo");
  const $campo_telefone_movel = $("#campo_telefone_movel");
  const $campo_telefone_estrangeiro = $("#campo_telefone_estrangeiro");
  
  const $div_mensagem_cadastrar_pessoa = $("#div_mensagem_cadastrar_pessoa");
  const $span_mensagem_cadastrar_pessoa = $("#span_mensagem_cadastrar_pessoa");
  
  const $div_botao_cadastrar = $("#div_botao_cadastrar");
  const $botao_cadastrar = $("#botao_cadastrar");
  
  $botao_cadastrar.click(function(){
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    $span_status_da_busca.text("Atualizando...");
    $span_status_da_busca.removeClass("tag_oculta");
    //$div_paginacao_de_cima_da_lista_de_pessoas.html(""); //Opcional
    //$div_partes_da_lista_de_pessoas.addClass("tag_oculta"); //Opcional
    //$div_lista_de_pessoas.html("Aguarde..."); //Opcional
    //$div_paginacao_de_baixo_da_lista_de_pessoas.html(""); //Opcional
    
    let nome = $campo_nome.val();
    let sobrenome = $campo_sobrenome.val();
    let cpf = $campo_cpf.val();
    let data_de_nascimento = $campo_data_de_nascimento.val();
    let sexo = $("input[type='radio'][name='sexo']:checked").attr("value");
    let id_do_setor = $caixa_de_selecao_setor.val();
    let email = $campo_email.val();
    let telefone_fixo = $campo_telefone_fixo.val();
    let telefone_movel = $campo_telefone_movel.val();
    let telefone_estrangeiro = $campo_telefone_estrangeiro.val();
    
    let anti_csrf = $div_botao_cadastrar.children("input[name='_token']").val();
    
    $div_mensagem_cadastrar_pessoa.removeClass("tag_oculta");
    $span_mensagem_cadastrar_pessoa.removeClass("mensagem_de_falha");
    $span_mensagem_cadastrar_pessoa.removeClass("mensagem_de_sucesso");
    $span_mensagem_cadastrar_pessoa.text("Aguarde...");
    
    /* Requisição ajax */
    $.ajax({
      url: "/tudo_em_um/cadastrar_pessoa_ajax",
      type: "POST",
      data: {filtro_nome: "", filtro_cpf: "", filtro_data_de_nascimento: "", filtro_id_do_setor: "", 
             quantidade_por_pagina: "", ordenacao: null, nome: nome, sobrenome: sobrenome, cpf: cpf, 
             data_de_nascimento: data_de_nascimento, sexo: sexo, id_do_setor: id_do_setor, email: email, 
             telefone_fixo: telefone_fixo, telefone_movel: telefone_movel, telefone_estrangeiro: telefone_estrangeiro, 
             _token: anti_csrf},
      success: function(data){
        if(typeof data["mensagem_de_falha"] != "undefined"){
          $span_mensagem_cadastrar_pessoa.attr("class", "mensagem_de_falha");
          $span_mensagem_cadastrar_pessoa.text(data["mensagem_de_falha"]);
          
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          return;
        }
        if(typeof data["mensagem_de_sucesso"] != "undefined"){
          $span_mensagem_cadastrar_pessoa.attr("class", "mensagem_de_sucesso");
          $span_mensagem_cadastrar_pessoa.text(data["mensagem_de_sucesso"]);
          
          $campo_nome.val("").change();
          $campo_sobrenome.val("").change();
          $campo_cpf.val("").change();
          $campo_data_de_nascimento.val("").change();
          
          $botoes_de_radio_para_sexo.each(function(){
            $(this)[0].checked = false;
          });
          
          $caixa_de_selecao_setor.val("").change();
          $campo_email.val("").change();
          $campo_telefone_fixo.val("").change();
          $campo_telefone_movel.val("").change();
          $campo_telefone_estrangeiro.val("").change();
        }
        if(numero_desta_acao_filtrar >= contador_de_filtro){
          limpando = true;
          
          $campo_filtro_nome.val("").change();
          $campo_filtro_cpf.val("").change();
          $campo_filtro_data_de_nascimento.val("").change();
          $caixa_de_selecao_filtro_setor.val("").change();
          $caixa_de_selecao_quantidade_por_pagina.val("padrao").change();
          
          $partes_da_lista.eq(0).children().text("Nome");
          $partes_da_lista.eq(1).children().text("CPF");
          $partes_da_lista.eq(2).children().text("Setor");
          $partes_da_lista.eq(3).children().text("Contato");
          ordenacao = null;
          
          pagina = null;
          
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          $div_paginacao_de_cima_da_lista_de_pessoas.html(data["paginacao"]);
          $div_lista_de_pessoas.html(data["lista"]);
          $div_paginacao_de_baixo_da_lista_de_pessoas.html(data["paginacao"]);
          
          limpando = false;
        }
      },
      dataType:"json"
    });
  });
  
  /* Formulário Editar Pessoa */
  $div_editar_pessoa.on("click", ".div_botao_editar>.botao_editar", function(){
    let filtro_nome = $campo_filtro_nome.val();
    let filtro_cpf = $campo_filtro_cpf.val();
    let filtro_data_de_nascimento = $campo_filtro_data_de_nascimento.val();
    let filtro_id_do_setor = $caixa_de_selecao_filtro_setor.val();
    let quantidade_por_pagina = $caixa_de_selecao_quantidade_por_pagina.val();
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    $span_status_da_busca.text("Atualizando...");
    $span_status_da_busca.removeClass("tag_oculta");
    //$div_paginacao_de_cima_da_lista_de_pessoas.html(""); //Opcional
    //$div_partes_da_lista_de_pessoas.addClass("tag_oculta"); //Opcional
    //$div_lista_de_pessoas.html("Aguarde..."); //Opcional
    //$div_paginacao_de_baixo_da_lista_de_pessoas.html(""); //Opcional
    
    const $campo_nome = $div_editar_pessoa.children(".div_editar_nome").find(".campo_nome");
    const $campo_sobrenome = $div_editar_pessoa.children(".div_editar_sobrenome").find(".campo_sobrenome");
    const $campo_cpf = $div_editar_pessoa.children(".div_editar_cpf").find(".campo_cpf");
    const $campo_data_de_nascimento = $div_editar_pessoa.children(".div_editar_data_de_nascimento").find(".campo_data_de_nascimento");
    const $botoes_de_radio_para_sexo = $div_editar_pessoa.children(".div_editar_sexo").find("input[type='radio'][name^='sexo_da_pessoa_do_id_']");
    const $caixa_de_selecao_setor = $div_editar_pessoa.children(".div_editar_setor").find(".caixa_de_selecao_setor");
    const $campo_email = $div_editar_pessoa.children(".div_editar_email").find(".campo_email");
    const $campo_telefone_fixo = $div_editar_pessoa.children(".div_editar_telefone_fixo").find(".campo_telefone_fixo");
    const $campo_telefone_movel = $div_editar_pessoa.children(".div_editar_telefone_movel").find(".campo_telefone_movel");
    const $campo_telefone_estrangeiro = $div_editar_pessoa.children(".div_editar_telefone_estrangeiro").find(".campo_telefone_estrangeiro");
    
    let nome = $campo_nome.val();
    let sobrenome = $campo_sobrenome.val();
    let cpf = $campo_cpf.val();
    let data_de_nascimento = $campo_data_de_nascimento.val();
    let sexo = $div_editar_pessoa.children(".div_editar_sexo").find("input[type='radio'][name^='sexo_da_pessoa_do_id_']:checked").attr("value");
    let id_do_setor = $caixa_de_selecao_setor.val();
    let email = $campo_email.val();
    let telefone_fixo = $campo_telefone_fixo.val();
    let telefone_movel = $campo_telefone_movel.val();
    let telefone_estrangeiro = $campo_telefone_estrangeiro.val();
    
    const $div_botao_editar = $div_editar_pessoa.children(".div_botao_editar");
    
    const anti_csrf = $div_botao_editar.children("input[name='_token']").val();
    
    const id_da_pessoa = $div_botao_editar.children(".campo_id_da_pessoa").val();
    
    const $div_mensagem = $div_editar_pessoa.children(".div_mensagem");
    $div_mensagem.removeClass("tag_oculta");
    
    const $span_mensagem_editar_pessoa = $div_mensagem.children(".span_mensagem_editar_pessoa");
    $span_mensagem_editar_pessoa.removeClass("mensagem_de_falha");
    $span_mensagem_editar_pessoa.removeClass("mensagem_de_sucesso");
    $span_mensagem_editar_pessoa.text("Aguarde...");
    
    /* Requisição ajax */
    $.ajax({
      url: "/tudo_em_um/editar_pessoa_ajax",
      type: "POST",
      data: {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, filtro_data_de_nascimento: filtro_data_de_nascimento, 
             filtro_id_do_setor: filtro_id_do_setor, quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao, 
             pagina: pagina, nome: nome, sobrenome: sobrenome, cpf: cpf, data_de_nascimento: data_de_nascimento, 
             sexo: sexo, id_do_setor: id_do_setor, email: email, telefone_fixo: telefone_fixo, 
             telefone_movel: telefone_movel, telefone_estrangeiro: telefone_estrangeiro, id_da_pessoa: id_da_pessoa, 
             _token: anti_csrf},
      success: function(data){
        if(typeof data["mensagem_de_falha"] != "undefined"){
          $span_mensagem_editar_pessoa.addClass("mensagem_de_falha");
          $span_mensagem_editar_pessoa.text(data["mensagem_de_falha"]);
          
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          return;
        }
        if(typeof data["mensagem_de_sucesso"] != "undefined"){
          $span_mensagem_editar_pessoa.addClass("mensagem_de_sucesso");
          $span_mensagem_editar_pessoa.text(data["mensagem_de_sucesso"]);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            $span_status_da_busca.text("");
            $span_status_da_busca.addClass("tag_oculta");
            //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
            $div_paginacao_de_cima_da_lista_de_pessoas.html(data["paginacao"]);
            $div_lista_de_pessoas.html(data["lista"]);
            $div_paginacao_de_baixo_da_lista_de_pessoas.html(data["paginacao"]);
            
            const html = $("#div_editar_pessoa_do_id_" + id_da_pessoa).html();
            $div_editar_pessoa.html(html);
            
            const $div_mensagem_apos_atualizacao = $div_editar_pessoa.children(".div_mensagem");
            $div_mensagem_apos_atualizacao.removeClass("tag_oculta");
            
            const $span_mensagem_editar_pessoa_apos_atualizacao = $div_mensagem_apos_atualizacao.children(".span_mensagem_editar_pessoa");
            $span_mensagem_editar_pessoa_apos_atualizacao.addClass("mensagem_de_sucesso");
            $span_mensagem_editar_pessoa_apos_atualizacao.text(data["mensagem_de_sucesso"]);
          }
        }
      },
      dataType:"json"
    });
  });
  
  /* Formulário Excluir Pessoa */
  const $div_excluir_pessoa = $("#div_excluir_pessoa");
  
  $div_excluir_pessoa.on("click", ".div_botao_excluir>.botao_excluir", function(){
    let filtro_nome = $campo_filtro_nome.val();
    let filtro_cpf = $campo_filtro_cpf.val();
    let filtro_data_de_nascimento = $campo_filtro_data_de_nascimento.val();
    let filtro_id_do_setor = $caixa_de_selecao_filtro_setor.val();
    let quantidade_por_pagina = $caixa_de_selecao_quantidade_por_pagina.val();
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    $span_status_da_busca.text("Atualizando...");
    $span_status_da_busca.removeClass("tag_oculta");
    //$div_paginacao_de_cima_da_lista_de_pessoas.html(""); //Opcional
    //$div_partes_da_lista_de_pessoas.addClass("tag_oculta"); //Opcional
    //$div_lista_de_pessoas.html("Aguarde..."); //Opcional
    //$div_paginacao_de_baixo_da_lista_de_pessoas.html(""); //Opcional
    
    const $div_botao_excluir = $div_excluir_pessoa.children(".div_botao_excluir");
    
    const anti_csrf = $div_botao_excluir.children("input[name='_token']").val();
    
    const id_da_pessoa = $div_botao_excluir.children(".campo_id_da_pessoa").val();
    
    const $div_mensagem = $div_excluir_pessoa.children(".div_mensagem");
    $div_mensagem.removeClass("tag_oculta");
    
    const $span_mensagem_excluir_pessoa = $div_mensagem.children(".span_mensagem_excluir_pessoa");
    $span_mensagem_excluir_pessoa.removeClass("mensagem_de_falha");
    $span_mensagem_excluir_pessoa.removeClass("mensagem_de_sucesso");
    $span_mensagem_excluir_pessoa.text("Aguarde...");
    
    /* Requisição ajax */
    $.ajax({
      url: "/tudo_em_um/excluir_pessoa_ajax",
      type: "POST",
      data: {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, filtro_data_de_nascimento: filtro_data_de_nascimento, 
             filtro_id_do_setor: filtro_id_do_setor, quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao, 
             pagina: pagina, id_da_pessoa: id_da_pessoa, _token: anti_csrf},
      success: function(data){
        if(typeof data["mensagem_de_falha"] != "undefined"){
          $span_mensagem_excluir_pessoa.addClass("mensagem_de_falha");
          $span_mensagem_excluir_pessoa.text(data["mensagem_de_falha"]);
          
          $span_status_da_busca.text("");
          $span_status_da_busca.addClass("tag_oculta");
          //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
          return;
        }
        if(typeof data["mensagem_de_sucesso"] != "undefined"){
          $span_mensagem_excluir_pessoa.addClass("mensagem_de_sucesso");
          $span_mensagem_excluir_pessoa.text(data["mensagem_de_sucesso"]);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            $span_status_da_busca.text("");
            $span_status_da_busca.addClass("tag_oculta");
            //$div_partes_da_lista_de_pessoas.removeClass("tag_oculta"); //Opcional
            $div_paginacao_de_cima_da_lista_de_pessoas.html(data["paginacao"]);
            $div_lista_de_pessoas.html(data["lista"]);
            $div_paginacao_de_baixo_da_lista_de_pessoas.html(data["paginacao"]);
            
            const html = $("#div_excluir_pessoa_do_id_" + id_da_pessoa).html();
            $div_excluir_pessoa.html(html);
            
            const $div_mensagem_apos_atualizacao = $div_excluir_pessoa.children(".div_mensagem");
            $div_mensagem_apos_atualizacao.removeClass("tag_oculta");
            
            const $span_mensagem_excluir_pessoa_apos_atualizacao = $div_mensagem_apos_atualizacao.children(".span_mensagem_excluir_pessoa");
            $span_mensagem_excluir_pessoa_apos_atualizacao.addClass("mensagem_de_sucesso");
            $span_mensagem_excluir_pessoa_apos_atualizacao.text(data["mensagem_de_sucesso"]);
          }
        }
      },
      dataType:"json"
    });
  });
});
