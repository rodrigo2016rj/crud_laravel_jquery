$(document).ready(function(){
  /* Refazendo o efeito de hover no campo_filtro_data_de_nascimento */
  const $campo_filtro_data_de_nascimento = $("#campo_filtro_data_de_nascimento");
  const $span_icone_de_calendario_do_campo_filtro_data_de_nascimento = $("#span_icone_de_calendario_do_campo_filtro_data_de_nascimento");
  
  $campo_filtro_data_de_nascimento.mouseenter(function(){
    $(this).css("border", "1px solid #8080C8");
  });
  $campo_filtro_data_de_nascimento.mouseleave(function(){
    $(this).css("border", "1px solid #C8C8C8");
  });
  $span_icone_de_calendario_do_campo_filtro_data_de_nascimento.mouseenter(function(){
    $campo_filtro_data_de_nascimento.css("border", "1px solid #8080C8");
  });
  $span_icone_de_calendario_do_campo_filtro_data_de_nascimento.mouseleave(function(){
    $campo_filtro_data_de_nascimento.css("border", "1px solid #C8C8C8");
  });
  
  /* Removendo o foco do botão buscar quando o cursor sai de cima dele e após o clique */
  const $botao_buscar = $("#botao_buscar");
  
  $botao_buscar.mouseleave(function(){
    $(this).blur();
  });
  $botao_buscar.click(function(){
    $(this).blur();
  });
  
  /* Removendo o foco do botão limpar quando o cursor sai de cima dele e após o clique */
  const $botao_limpar = $("#botao_limpar");
  
  $botao_limpar.mouseleave(function(){
    $(this).blur();
  });
  $botao_limpar.click(function(){
    $(this).blur();
  });
  
  /* Refazendo o efeito de hover no campo_data_de_nascimento do formulário cadastrar */
  const $campo_data_de_nascimento = $("#campo_data_de_nascimento");
  const $span_icone_de_calendario_do_campo_data_de_nascimento = $("#span_icone_de_calendario_do_campo_data_de_nascimento");
  
  $campo_data_de_nascimento.mouseenter(function(){
    $(this).css("border", "1px solid #8080C8");
  });
  $campo_data_de_nascimento.mouseleave(function(){
    $(this).css("border", "1px solid #C8C8C8");
  });
  $span_icone_de_calendario_do_campo_data_de_nascimento.mouseenter(function(){
    $campo_data_de_nascimento.css("border", "1px solid #8080C8");
  });
  $span_icone_de_calendario_do_campo_data_de_nascimento.mouseleave(function(){
    $campo_data_de_nascimento.css("border", "1px solid #C8C8C8");
  });
  
  /* Removendo o foco do botão cadastrar quando o cursor sai de cima dele e após o clique */
  const $botao_cadastrar = $("#botao_cadastrar");
  
  $botao_cadastrar.mouseleave(function(){
    $(this).blur();
  });
  $botao_cadastrar.click(function(){
    $(this).blur();
  });
  
  /* Refazendo o efeito de hover nos campos de data de nascimento dos formulários de editar */
  const $div_editar_pessoa = $("#div_editar_pessoa");
  
  $div_editar_pessoa.on("mouseenter", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento", function(){
    $(this).css("border", "1px solid #8080C8");
  });
  $div_editar_pessoa.on("mouseleave", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento", function(){
    $(this).css("border", "1px solid #C8C8C8");
  });
  $div_editar_pessoa.on("mouseenter", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.span_icone_de_calendario_do_campo_data_de_nascimento", function(){
    $div_editar_pessoa.children(".div_editar_data_de_nascimento").children(".div_campo_data_de_nascimento").children(".campo_data_de_nascimento").css("border", "1px solid #8080C8");
  });
  $div_editar_pessoa.on("mouseleave", ".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.span_icone_de_calendario_do_campo_data_de_nascimento", function(){
    $div_editar_pessoa.children(".div_editar_data_de_nascimento").children(".div_campo_data_de_nascimento").children(".campo_data_de_nascimento").css("border", "1px solid #C8C8C8");
  });
  
  /* Removendo o foco dos botões de editar quando o cursor sai de cima deles e após o clique */
  $div_editar_pessoa.on("mouseleave", ".botao_editar", function(){
    $(this).blur();
  });
  $div_editar_pessoa.on("click", ".botao_editar", function(){
    $(this).blur();
  });
  
  /* Removendo o foco dos botões de excluir quando o cursor sai de cima deles e após o clique */
  const $div_excluir_pessoa = $("#div_excluir_pessoa");
  
  $div_excluir_pessoa.on("mouseleave", ".botao_excluir", function(){
    $(this).blur();
  });
  $div_excluir_pessoa.on("click", ".botao_excluir", function(){
    $(this).blur();
  });
  
  /* Removendo o foco do botão confirmar do calendário quando o cursor sai de cima dele */
  const $botao_confirmar_do_calendario = $("#botao_confirmar_do_calendario");
  
  $botao_confirmar_do_calendario.mouseleave(function(){
    $(this).blur();
  });
});
