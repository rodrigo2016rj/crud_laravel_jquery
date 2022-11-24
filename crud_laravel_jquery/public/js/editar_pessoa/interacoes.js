$(document).ready(function(){
  /* Refazendo o efeito de hover no campo_data_de_nascimento */
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
  
  /* Removendo o foco do botão editar quando o cursor sai de cima dele e após o clique */
  const $botao_editar = $("#botao_editar");
  
  $botao_editar.mouseleave(function(){
    $(this).blur();
  });
  $botao_editar.click(function(){
    $(this).blur();
  });
  
  /* Removendo o foco do botão confirmar do calendário quando o cursor sai de cima dele */
  const $botao_confirmar_do_calendario = $("#botao_confirmar_do_calendario");
  
  $botao_confirmar_do_calendario.mouseleave(function(){
    $(this).blur();
  });
});
