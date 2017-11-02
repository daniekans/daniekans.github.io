/* A Person's Life
 * Trabalho de Web – INF-1A – CEFET-MG
 * Versão 2 – Sem teste
 */

$(function() {

	// Handlers para janelas à parte do conteúdo principal:
	let $auxEl = $('#aux');
	let $infoEl = $('#janela-info');

	$('header').on('click', '#icone-info', function() {
		if (!$auxEl.hasClass('escuro')) {
			$auxEl.show();
			$auxEl.addClass('escuro');
			$infoEl.addClass('ocupa-espaco');
		}
	});

	$auxEl.on('click', function() {
		if ($('#menu-criacao-conta').css('display') === 'none' && !$('.ficha').length) {
			$auxEl.removeClass('escuro');
			setTimeout(function() {
				$auxEl.hide();
			}, 200);
			$infoEl.removeClass('ocupa-espaco');
		}
	});

	$('header').on('click', '#botao-menu-lateral', function() {
		$('body').toggleClass('menu-lateral-ativo');
	});

});
