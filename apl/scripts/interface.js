/* A Person's Life
 * Trabalho de Web – INF-1A – CEFET-MG
 * Versão 2 – Sem teste
 */

$(function() {

	// Handlers para janelas à parte do conteúdo principal:
	let $auxEl = $('#aux');
	let $infoEl = $('#janela-info');
	let $headerEl = $('header');

	$headerEl.on('click', '#icone-info', function() {
		if (!$auxEl.hasClass('escuro')) {
			$auxEl.show();
			$auxEl.addClass('escuro');
			$infoEl.addClass('ocupa-espaco');
		}
	});

	$auxEl.on('click', function() {
		if ($('#menu-criacao-conta').css('display') === 'none'
				&& $('#fim-de-jogo').css('display') === 'none'
				&& !$('.ficha').length) {
			$auxEl.removeClass('escuro');
			setTimeout(() => $auxEl.hide(), 200);
			$infoEl.removeClass('ocupa-espaco');
		}
	});

	$('header').on('click', '#icone-menu-lateral', function() {
		$('body').toggleClass('menu-lateral-ativo');
		playSfx('menu-ativo.wav');
	});

	// áudios do jogo:
	$headerEl.on('click', '#icone-audio', function() {

		let $audiosEl = $('audio');

		if ($audiosEl.prop('muted')) {
			$audiosEl.prop('muted', false);
			$(this).attr('src', 'imgs/com-audio.png');
		}	else {
			$audiosEl.prop('muted', true);
			$(this).attr('src', 'imgs/sem-audio.svg');
		}

	});

});
