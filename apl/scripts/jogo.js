/* A Person's Life
 * Trabalho de Web – INF-1A – CEFET-MG
 * Versão 2 – Sem teste
 */

$(function() {

  let todosOsItens = { // Talvez seja bom criar um arquivo .json com os dados.

    // Criança e Adolescente:
    bola: new Item('Bola', 10, FasesDaVida.CRIANCA),
    bicicleta: new Item('Bicicleta de Brinquedo', 50, FasesDaVida.CRIANCA),
    carrinho: new Item('Carrinho de Brinquedo', 40, FasesDaVida.CRIANCA),
    boneco: new Item('Boneco', 20, FasesDaVida.CRIANCA),
    chocalho: new Item('Chocalho', 30, FasesDaVida.CRIANCA),
    peteca: new Item('Peteca', 10, FasesDaVida.CRIANCA),
    cubos: new Item('Cubos de Brinquedo', 15, FasesDaVida.CRIANCA),
    cachorro: new Item('Cachorro', 200, FasesDaVida.ADOLESCENTE),
    gato: new Item('Gato', 200, FasesDaVida.ADOLESCENTE),
    mp3: new Item('MP3 Player', 150, FasesDaVida.ADOLESCENTE),
    celular: new Item('Celular', 700, FasesDaVida.ADOLESCENTE),
    videogame: new Item('Video-game', 1000, FasesDaVida.ADOLESCENTE),
    computador: new Item('Computador', 1500, FasesDaVida.ADOLESCENTE),
    // Adulto e Idoso:
    sofa: new Item('Sofá', 500, FasesDaVida.ADULTO),
    tv: new Item('Televisão', 1500, FasesDaVida.ADULTO),
    carro: new Item('Carro', 20000, FasesDaVida.ADULTO),
    casa: new Item('Casa', 150000, FasesDaVida.ADULTO),
    eletrodomesticos: new Item('Eletrodomésticos', 10000, FasesDaVida.ADULTO)

  };

  // não haverá itens para idoso por enquanto...

  // arrays com as fichas (cujos dados estarão em um arquivo .json):
  let todasAsFichas = [];
  let fichasCrianca = [];
  let fichasAdolesc = [];
  let fichasAdulto = [];
  let fichasIdoso = [];

  // criação das fichas:
  $.getJSON('fichas.json', function(dados) {
    let fichas = dados.fichas;
    for (let ficha of fichas) {
      todasAsFichas.push(new Ficha(ficha.mensagem, ficha.tipo, ficha.efeito));
    }
  });



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
    setTimeout(function() {
      $('#aux').trigger('click');
    }, 350);
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
        // estruturas de seleção (para o Funcionamento das fichas e o fluxo da história):
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
