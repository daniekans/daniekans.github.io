/* A Person's Life
 * Trabalho de Web – INF-1A – CEFET-MG
 * Versão 2 – Sem teste
 */

$(function() {

	/* Handlers para janelas à parte do conteúdo principal */

	let $auxEl = $('#aux');
	let $infoEl = $('#janela-info');
	let $headerEl = $('header');

	// ícone para a janela de informações:
	$headerEl.on('click', '#icone-info', function() {
		if (!$auxEl.hasClass('escuro')) {
			$auxEl.show();
			$auxEl.addClass('escuro');
			$infoEl.addClass('ocupa-espaco');
		}
	});

	// evento para o desvanescimento da div auxiliar ao clicá-la:
	$auxEl.on('click', function() {
		if ($('#menu-criacao-conta').css('display') === 'none'
				&& $('#fim-de-jogo').css('display') === 'none'
				&& !$('.ficha').length) {
			$auxEl.removeClass('escuro');
			setTimeout(() => $auxEl.hide(), 200);
			$infoEl.removeClass('ocupa-espaco');
		}
	});

	// ícone para ativar o menu lateral:
	$('header').on('click', '#icone-menu-lateral', function() {
		$('body').toggleClass('menu-lateral-ativo');
		playSfx('menu-ativo.wav');
	});

	// seleção do modelo de personagem:
	let $modelosEl = $('#menu-criacao-conta').find('section');

	$modelosEl.on('click', function() {
		$modelosEl.removeClass('selecionado');
		$(this).addClass('selecionado');
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
