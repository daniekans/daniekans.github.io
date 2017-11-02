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

    $('#nome-span').text(jogador.nome);
    $('#idade-span').text(jogador.idade);
    $('#dinheiro-span').text('R$' + jogador.dinheiro);
    $('title').text(jogador.nome + '\'' + (jogador.nome.endsWith('s')) ? '' : 's Life');

    // Clique na imagem do personagem e efeitos:
    let $progressEl = $('#barra-xp');
    $progressEl.attr('max', jogador.limiteXP);
    $progressEl.val(0);

    $('#conteudo').on('click', '#jogador-imagem', function () {
      if (jogador) {
        jogador.aumentaXP();
        jogador.aumentaDinheiro();
        $('#idade-span').text(jogador.idade);
        $('#dinheiro-span').text('R$' + jogador.dinheiro);
        $progressEl.val($progressEl.val() + jogador.incrementoXP);
      }
    });

    Item.atzItens(todosOsItens, jogador);

  }
  // Carregamento de jogador existente, caso exista:
  let tempJogador = new Jogador(JSON.parse(localStorage.getItem('Jogador')));
  if (tempJogador && tempJogador.nome !== null) {
    $('#menu-criacao-conta').hide();
    jogador = tempJogador;
    iniciarJogo();
    // ...
  } else {

    // Início do jogo:
    $('#botao-iniciar-jogo').on('click', function() {

      let $persSelecionadoEl = $('.selecionado');

      if ($nomeEl.val().replace(' ', '') === '') {
        alert('Digite um nome válido!');
      // } else if (!$persSelecionadoEl.length) {
      //   alert('Selecione o modelo primeiro!');
      } else {

        // instanciação do novo jogador:
        jogador = new Jogador($nomeEl.val());
        //jogador.imagem.attr('src', $persSelecionadoEl.find('img').attr('src'));
        //jogador.genero = $persSelecionadoEl.data('genero');
        iniciarJogo();

        let $menuCriaConta = $('#menu-criacao-conta');
        $menuCriaConta.fadeOut(300);
      }

    });

  }

  // apagar os dados
  $('#li-apagar-dados').on('click', function() {
    localStorage.clear();
    jogador = null;
    location.reload();
  });

  $(window).on('unload', function () {
    if (jogador)
      localStorage.setItem('Jogador', JSON.stringify(jogador));
  });


});
