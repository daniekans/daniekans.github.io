/* A Person's Life
 * Trabalho de Web – INF-1A – CEFET-MG
 * Versão 2 – Sem teste
 */

$(function() {

  let jogador;

  /* Janela de criação inicial do personagem */

  let $nomeEl = $('#input-nome');
  $nomeEl.on('input', function() {
    $('#nome-span').text($(this).val());
  }); // depois, pode ser legal dar na verdade um nome aleatório para a pessoa.

  let $opcoesGeneroEl = $('.opc-genero-jogador');
  $opcoesGeneroEl.on('click', function() {
    $opcoesGeneroEl.removeClass('selecionado');
    $(this).addClass('selecionado');
  }); // o gênero pode ser mantido conforme a escolha do usuário.

  function iniciarJogo() {

    /* Funcionamento do Jogo */

    let $auxEl = $('#aux');
    // remoção de #aux. O método fadeOut() gera o mesmo resultado, mas não remove as classes.
    $auxEl.removeClass('escuro');
    $auxEl.removeClass('ocupa-espaco');

    let $nomeSpanEl = $('#nome-span');
    let $idadeSpanEl = $('#idade-span');
    let $dinheiroSpanEl = $('#dinheiro-span');

    jogador.atualizaSpansComAtributos();
    $('title').text(`${jogador.nome}\'${(jogador.nome.endsWith('s') ? '' : 's')} Life`);

    // carregamento das imagens dos pertences
    $('#jogador-imagem').attr('src', jogador.imagemSrc);
    let $imgCenarioEl = $('#img-cenario');
    if (jogador.idade >= 18)
      $imgCenarioEl.attr('src', 'imgs/background-adulto.png');
    else
      $imgCenarioEl.attr('src', `imgs/quarto-${jogador.genero}.png`);

    let $cenarioEl = $('#cenario-container');
    for (let nomeProp in todosOsItens) {
      $cenarioEl.append($('<img>').attr('src', `imgs/${nomeProp}.png`));
      let $imgItemCenarioEl = $(`img[src="imgs/${nomeProp}.png"]`);
      if (( // condições para mostrar os pertences:
          jogador.isMaiorDeIdade()
          && jogador.possuiItem(todosOsItens[nomeProp])
          && todosOsItens[nomeProp].tipo === FasesDaVida.ADULTO
        ) || (
          !jogador.isMaiorDeIdade()
          && jogador.possuiItem(todosOsItens[nomeProp])
        )
      ) $imgItemCenarioEl.animate({ 'opacity': '1' }, 200);
    }

    // Clique na imagem do personagem e efeitos:
    function atzBarraXP() {
      let larguraAtual = (jogador.xp + jogador.limiteXPInicial - jogador.limiteXP)
        * 100 / jogador.limiteXPInicial;

      $('#barra-xp').css('width', `${larguraAtual}%`);
      $('#jogador-xp').text(`Seu XP: ${jogador.xp}`);
      $('#jogador-limite-xp').text(`Próx. Idade: ${jogador.limiteXP}`);
    }

    $('#conteudo').on('click', '#jogador-imagem', function (evt) {
      if (jogador) {
        jogador.aumentaXP();
        jogador.aumentaDinheiro();
        $idadeSpanEl.text(jogador.idade);
        $dinheiroSpanEl.text('R$' + jogador.dinheiro);
        atzBarraXP();

        // mostra o XP ganho no clique:
        let $spanXPEl = $('<span></span>')
          .text(`+${jogador.incrementoXP}XP`)
          .addClass('span-xp');
        $spanXPEl.css({
          left: evt.pageX,
          top: evt.pageY,
        });
        $spanXPEl.animate({
          'top': parseInt($spanXPEl.css('top')) - 50 + 'px',
          'opacity': '0.7',
          'transform': 'scale(0.8)'
        }, 300);
        $spanXPEl.fadeOut(300);
        setTimeout(() => $spanXPEl.remove(), 600);
        $('body').append($spanXPEl);
      }
    });

    atzBarraXP();
    Item.atualizaItens(jogador);
    Upgrade.atualizaUpgrades(jogador);
    if (jogador.faseVida !== FasesDaVida.CRIANCA)
      jogador.atualizaMusicaDeFundo();

  }

  // Carregamento de jogador existente, caso exista:
  let tempJogador = new Jogador(JSON.parse(localStorage.getItem('Jogador')));
  if (tempJogador && tempJogador.nome !== null) {
    $('#menu-criacao-conta').hide();
    // para que dê tempo de carregar os arquivos necessários, é preciso esperar um tempo:
    setTimeout(() => iniciarJogo(), 100);
    jogador = tempJogador;
    // ...
  } else {

    // botão para iniciar o jogo:
    $('#botao-iniciar-jogo').on('click', function() {

      let $persSelecionadoEl = $('.selecionado');

      if ($nomeEl.val().replace(' ', '') === '') {
        alert('Digite um nome válido!');
      } else if (!$persSelecionadoEl.length) {
        alert('Selecione o modelo primeiro!');
      } else {
        // instanciação do novo jogador:
        jogador = new Jogador($nomeEl.val());
        jogador.genero = $persSelecionadoEl.data('genero');
        jogador.imagemSrc = $persSelecionadoEl.find('img').attr('src');
        iniciarJogo();

        let $menuCriaConta = $('#menu-criacao-conta');
        $menuCriaConta.fadeOut(300);
      }

    });

  }

  // apagamento os dados e salvamento do jogo:
  function apagaDados() {
    localStorage.clear();
    jogador = null;
    location.reload();
  }

  $('#li-apagar-dados').on('click', apagaDados);
  $('#botao-recomecar').on('click', apagaDados);

  $(window).on('unload', function () {
    if (jogador)
      localStorage.setItem('Jogador', JSON.stringify(jogador));
  });


});
