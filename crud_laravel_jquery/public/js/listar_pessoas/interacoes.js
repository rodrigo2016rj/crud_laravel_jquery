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
  
  /* Removendo o foco do botão confirmar do calendário quando o cursor sai de cima dele */
  const $botao_confirmar_do_calendario = $("#botao_confirmar_do_calendario");
  
  $botao_confirmar_do_calendario.mouseleave(function(){
    $(this).blur();
  });
});
