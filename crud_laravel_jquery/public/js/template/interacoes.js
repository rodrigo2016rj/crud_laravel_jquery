$(window).on("load", function(){
  /* Ajustando altura do tronco para preencher a parte vertical visível da tela: */
  const $body = $("body");
  const $div_cabecalho_template = $("#div_cabecalho_template");
  const $div_tronco_template = $("#div_tronco_template");
  
  let altura_minima = window.innerHeight;
  altura_minima -= $div_cabecalho_template.outerHeight(true);
  
  let altura_do_corpo_todo = $body.outerHeight(true);
  let altura_interna_do_corpo = $body.height();
  var diferenca = altura_do_corpo_todo - altura_interna_do_corpo;
  altura_minima -= diferenca / 2;
  
  let altura_do_tronco_todo = $div_tronco_template.outerHeight(true);
  let altura_interna_do_tronco = $div_tronco_template.height();
  var diferenca = altura_do_tronco_todo - altura_interna_do_tronco;
  altura_minima -= diferenca;
  
  $div_tronco_template.css("min-height", altura_minima);
});
