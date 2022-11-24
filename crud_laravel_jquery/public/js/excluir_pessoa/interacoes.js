$(window).on("load", function(){
  /* Removendo o foco do botão excluir quando o cursor sai de cima dele e após o clique */
  const $botao_excluir = $("#botao_excluir");
  
  $botao_excluir.mouseleave(function(){
    $(this).blur();
  });
  $botao_excluir.click(function(){
    $(this).blur();
  });
});
