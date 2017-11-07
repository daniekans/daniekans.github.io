/* A Person's Life
 * Trabalho de Web – INF-1A – CEFET-MG
 * Versão 2 – Sem teste
 */

/* Este arquivo possui as classes e variáveis que darão a base para o jogo */

 // Tentativa de criar uma enumeração no JS...
 const FasesDaVida = { // primeira letra maiúscula por agir como uma enum
   CRIANCA: 'Criança',
   ADOLESCENTE: 'Adolescente',
   ADULTO: 'Adulto',
   IDOSO: 'Idoso',
   MORTO: 'Morto'
 };

// contante que descreve a situação do personagem:
const Situacao = {
  NADA: 'Nada', // '-'
  ESTUDANTE: 'Estudante',
  EMPREGADO: 'Empregado',
  DESEMPREGADO: 'Desempregado',
  CASADO: 'Casado'
};

// função para efeito sonoros:
function playSfx(nomeAudio) {
  $('#efeito-sonoro')
    .attr('src', 'audio/' + nomeAudio + '')
    .trigger('play');
}

// Classe Item, usada para o que é comprado dentro do jogo.
class Item {

  constructor(nome = '', preco = 0, tipo = FasesDaVida.CRIANCA) {
    this.nome = nome;
    this.preco = preco;
    this.tipo = tipo;
  }

  static atualizaItens(jogador) {

    // Loja e pertences:
    let $lojaEl = $('#loja');
    let $pertencesEl = $('#pertences');
    $lojaEl.empty();
    $pertencesEl.empty();

    Object.entries(todosOsItens).forEach(function(parItem) {

      let nomeProp = parItem[0];
      let item = parItem[1];
      let $itemEl = $('<div></div>');
      let $itemImgEl = $('<img>');
      let $itemNomeEl = $('<h3></h3>').text(item.nome);
      let $itemPrecoEl = $('<span></span>')
        .text(`Preço: R$${item.preco}`);
      let $btComprarEl = $('<button></button>').text('COMPRAR');

      $itemImgEl.attr('src', (`imgs/ampliadas/${nomeProp}.png`)); // Ajustar depois
      $itemEl.addClass('item');
      // acréscimos:
      $itemEl.append($itemNomeEl);
      $itemEl.append($itemImgEl);

      // adiciona corretamente os itens:
      if (jogador.itens.find(jogItem => jogItem.nome === item.nome)) {
        $pertencesEl.append($itemEl); // Os pertences permanecem até o fim...
      } else if (item.tipo === jogador.tipoItens) {
        $itemEl.append($itemPrecoEl);
        $itemEl.append($btComprarEl);
        $itemEl.append($('<div></div>').addClass('clear'));

        $btComprarEl.on('click', () => jogador.compraItem(item, nomeProp));

        $lojaEl.append($itemEl);
      }

    });

    [$pertencesEl, $lojaEl].forEach(function($containerEl) {
      if (!$containerEl.children().length)
        $containerEl.append($('<h3>Sem itens.</h3>').addClass('sem-itens'));
    });

  }

}

// Classe Jogador, representando o usuário e seus dados.
class Jogador {

  constructor(jog = 'Person') {
    // Eu gostaria de eliminar esta repetição, mas não sei como fazer isto...
    this.nome = jog;
    this.idade = 1;
    this.genero = '';
    this.xp = 0;
    this.limiteXPInicial = 15;
    this.limiteXP = this.limiteXPInicial;
    this.incrementoXP = 1;
    this.dinheiro = 0;
    this.incrementoDinheiro = 1;
    this.felicidade = 20;
    this.inteligencia = 20;
    this.amor = 10;
    this.itens = [];
    this.upgrades = [];
    this.faseVida = FasesDaVida.CRIANCA;
    this.tipoItens = this.faseVida;
    this.situacao = Situacao.NADA;
    this.imagemSrc = '';

    // caso seja passado um objeto para o construtor:
    if (jog instanceof Object) {
      for (let nomeProp of Object.getOwnPropertyNames(jog))
        if (this.hasOwnProperty(nomeProp))
          this[nomeProp] = jog[nomeProp];
    }
  }

  aumentaIdade() {

    this.idade++;

    // configurações para as mudanças de fase da vida:
    switch (this.idade) {
      case 12:
        this.faseVida = FasesDaVida.ADOLESCENTE;
        this.tipoItens = this.faseVida;
        this.incrementoDinheiro = 10;
        this.limiteXPInicial = 20;
        Item.atualizaItens(this);
        this.atualizaMusicaDeFundo();
        alert('Você se tornou adolescente!');
        break;
      case 18:
        this.faseVida = FasesDaVida.ADULTO;
        this.tipoItens = this.faseVida;
        this.situacao = Situacao.DESEMPREGADO;
        this.incrementoDinheiro = 25;
        this.incrementoXP = 2;
        $('#img-cenario').attr('src', 'imgs/background-adulto.png');
        for (let nomeProp in todosOsItens) {
          let $imgItemCenarioEl = $(`img[src="imgs/${nomeProp}.png"]`);
          $imgItemCenarioEl.animate({ 'opacity': '0' }, 200);
        }
        this.compraItem(todosOsItens['casa-aluguel'], 'casa-aluguel');
        Item.atualizaItens(this);
        this.atualizaMusicaDeFundo();
        alert('Você se tornou adulto!');
        break;
      case 65:
        this.faseVida = FasesDaVida.IDOSO;
        this.atualizaMusicaDeFundo();
        alert('Você se tornou idoso!');
        break;
      case 100:
        this.faseVida = FasesDaVida.MORTO;
        $('#fim-de-jogo').fadeIn(300);
        let $auxEl = $('#aux');
        $auxEl.show();
        $auxEl.addClass('escuro');
        break;
    }

    // coisas acontecerão de acordo com a sorte do jogador...
    let fichas = {};
    fichas[FasesDaVida.CRIANCA] = fichasCrianca;
    fichas[FasesDaVida.ADOLESCENTE] = fichasAdolescente;
    fichas[FasesDaVida.ADULTO] = fichas[FasesDaVida.IDOSO] = fichasAdulto;

    for (let ficha of fichas[this.faseVida])
      if (ficha.testaProbabilidade()) {
        ficha.exibir();
        ficha.aplicaEfeito(this);
        break;
      }

    playSfx('cresceu.wav');

  }

  aumentaXP() {

    this.xp += this.incrementoXP;
    if (this.xp >= this.limiteXP) {
      this.aumentaIdade();
      this.limiteXP += this.limiteXPInicial;
    }

  }

  aumentaDinheiro() {

    this.dinheiro += this.incrementoDinheiro;

  }

  adicionaItem(item) {

    if (item instanceof Item)
      this.itens.push(item);

  }

  retiraItem(item) {
    // -> usar depois o método find() para arrays
    if (item instanceof Item)
      for (let i = 0; i < this.itens.length; i++) {
        let temp = this.itens[i];
        if (temp.nome === item.nome && temp.preco === item.preco)
            this.itens.splice(i, 1);
      }
  }

  adicionaUpgrade(upgrade) {

    if (upgrade instanceof Upgrade)
      this.upgrades.push(upgrade);

  }

  isMaiorDeIdade() {

    return (this.idade >= 18);

  }

  possuiItem(item) {

    return this.itens.find(jogItem => jogItem.nome === item.nome);

  }

  atualizaSpansComAtributos() {

    $('#nome-span').text(this.nome);
    $('#idade-span').text(this.idade);
    $('#dinheiro-span').text(`R$${this.dinheiro}`);

  }

  atualizaMusicaDeFundo() {

    let nomeMusica = {};

    nomeMusica[FasesDaVida.CRIANCA] = '7-years';
    nomeMusica[FasesDaVida.ADOLESCENTE] = 'sweet-child-o-mine';
    nomeMusica[FasesDaVida.ADULTO] = 'castle-on-the-hill';
    nomeMusica[FasesDaVida.IDOSO] = 'in-my-life';

    let $musicaFundoEl = $('#musica-de-fundo');
    $musicaFundoEl.attr('src', `audio/${nomeMusica[this.faseVida]}.mp3`);

  }

  compraItem(item, nomeProp) {

    if (this.dinheiro >= item.preco) {
      playSfx('comprado.wav');
      this.adicionaItem(item);
      this.dinheiro -= item.preco;
      this.atualizaSpansComAtributos();
      let $imgItemCenarioEl = $(`img[src="imgs/${nomeProp}.png"]`);
      $imgItemCenarioEl.animate({ 'opacity': '1' }, 200); // fade() não está dando certo
      if (nomeProp === 'casa')
        jogador.retiraItem(todosOsItens['casa-aluguel']);
      Item.atualizaItens(this);
    } else {
      playSfx('sem-permissao.wav');
    }

  }

}

class EfeitoJogador {

  constructor(mensagem = '', tipoEfeito = '', efeito = null) {
    this.mensagem = mensagem;
    this.tipoEfeito = tipoEfeito;
    // efeito é a quntidade de dinheiro retirado ou a função executada de acordo com o 'comando' da ficha:
    this.efeito = efeito;
  }

  aplicaEfeito(jogador) {

     /* Foi necessário atribuir o 'this' mais externo a uma variável.
        A função de seta não funcionaria muito bem aqui... */
    let self = this;
    function modificaProp(propriedade) {
        if (String(self.efeito).startsWith('x'))
          jogador[propriedade] *= parseInt(self.efeito.replace('x', ''));
        else
          jogador[propriedade] += parseInt(self.efeito);
    }

    switch (this.tipoEfeito) {
      case '$':
        modificaProp('dinheiro');
        break;
      case ':)':
        if (this.mensagem.includes('morreu'))
          this.probabilidade = [0, 0];
        modificaProp('felicidade');
        break;
      case '@':
        modificaProp('inteligencia');
        break;
      case 's2':
        modificaProp('amor');
        break;
      case 'Situacao':
        jogador.Situacao = this.efeito;
        break;
      case 'x_x':
        jogador.faseVida = FasesDaVida.MORTO;
        $('#fim-de-jogo').fadeIn(300);
        let $auxEl = $('#aux');
        $auxEl.show();
        $auxEl.addClass('escuro');
        Item.atualizaItens(jogador);
        break;
    }

  }

}

// Classe Ficha, usada para as situações aleatórias que surgem durante a vida do jogador.
class Ficha extends EfeitoJogador {

  constructor(mensagem, tipoAcontecimento = '', tipoEfeito,
    efeito, probabilidade = [], fase = '') {

    super(mensagem, tipoEfeito, efeito);

    this.tipoAcontecimento = tipoAcontecimento;
    this.probabilidade = probabilidade;
    this.fase = fase;

  }

  testaProbabilidade() {

    let minimo = this.probabilidade[0],
        maximo = this.probabilidade[1],
        // nesse caso, tanto o mínimo quanto o máximo poderão ser o número aleatório
        numAleatorio = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo),
        numAux = minimo;

    // o número auxiliar muda de valor e é comparado com o número aleatório 'minimo' vezes:
    for (let i = 0; i < minimo && numAux <= maximo; i++, numAux++)
      if (numAux === numAleatorio)
        return true;

    return false;

  }

  exibir() {

    let $fichaEl = $('<div></div>'),
        $tituloEl = $('<h2></h2>').text(this.tipoAcontecimento),
        $mensagemEl = $('<p></p>').text(this.mensagem),
        $efeitoEl = $('<p></p>'),
        $botaoOkEl = $('<button></button>').text('OK'),
        $auxEl = $('#aux'),
        cor = (this.tipoAcontecimento === 'Azar')
          ? 'rgb(255, 68, 68)' : 'rgb(12, 199, 14)';

    $tituloEl.css('color', cor);
    $efeitoEl.css('color', cor);
    $efeitoEl.text(((this.efeito > 0) ? '+' : '') + this.efeito + this.tipoEfeito);
    $botaoOkEl.on('click', function() {
      $('.ficha').remove();
      $auxEl.trigger('click');
    });

    $fichaEl.append($tituloEl);
    $fichaEl.append($mensagemEl);
    $fichaEl.append($efeitoEl);
    $fichaEl.append($botaoOkEl);
    $fichaEl.addClass('ficha');

    $auxEl.show();
    $auxEl.addClass('escuro');

    $('body').append($fichaEl);

  }

}
// Classe Upgrade, a qual será implementada caso haja tempo suficiente:
class Upgrade extends EfeitoJogador {

  constructor(imagemId = '', mensagem, tipoEfeito, efeito, preco = 0) {
    super(mensagem, tipoEfeito, efeito);

    this.imagemId = imagemId;
    this.preco = preco;
  }

  aplicaEfeito(jogador) {

    super.aplicaEfeito(jogador);

    switch (this.imagemId) {
      case 'escola':
        jogador.incrementoDinheiro += 1;
        jogador.situacao = Situacao.ESTUDANTE;
        break;
      case 'ensino-medio':
        jogador.incrementoDinheiro += 2;
        break;
      case 'faculdade':
          jogador.incrementoDinheiro += 10;
          jogador.situacao = Situacao.ESTUDANTE;
        break;
      case 'emprego':
        jogador.incrementoDinheiro += 200;
        jogador.situacao = Situacao.EMPREGADO;
        break;
      case 'profissional':
          jogador.incrementoDinheiro += 200;
        break;
      case 'casamento':
          jogador.situacao += 'e ' + Situacao.CASADO;
        break;
    }

  }

  static atualizaUpgrades(jogador) {

    let $upgradesEl = $('#upgrades-container');
    $upgradesEl.empty();

    Object.entries(todosOsUpgrades).forEach(function(parUpgrade) {

      let nomeUpgrade = parUpgrade[0];
      let upgrade = parUpgrade[1];
      let $imgUpgradeEl = $('<img>');

      $imgUpgradeEl.addClass('upgrade');
      $imgUpgradeEl.attr('src', `imgs/${nomeUpgrade}.png`);
      // handlers para os upgrades:
      $imgUpgradeEl.on('click', function() {
        if (jogador.dinheiro >= upgrade.preco) {
          upgrade.aplicaEfeito(jogador);
          jogador.dinheiro -= upgrade.preco;
          jogador.adicionaUpgrade(upgrade);
          jogador.atualizaSpansComAtributos();
          playSfx('comprado.wav');
          $imgUpgradeEl.fadeOut(400);
          setTimeout(() => $imgUpgradeEl.remove(), 500);
        }
      });
      let $descricaoEl = $('#descricao-upgrade');
      $imgUpgradeEl.on('mousemove', function(evt) {
        $descricaoEl.css({
          left: evt.pageX + 20, // um pouco à direita...
          // fica um pouco acima do ponteiro do mouse:
          top: evt.pageY - parseInt($descricaoEl.css('height')) * 1.2
        });
      });
      $imgUpgradeEl.on('mouseenter', function() {
        $descricaoEl.find('p').text(upgrade.mensagem);
        /* É muito mais fácil alterar o texto do título não considerando espaços,
          mas, visando não ter problemas no futuro, fiz da seguinte forma: */
        let $tituloEl = $descricaoEl.find('h2');
        let textoTitulo = '';
        for (let palavra of nomeUpgrade.split('-')) {
          palavra = palavra.replace(palavra[0], palavra[0].toUpperCase());
          if (palavra === 'Medio') // coloca acento
            palavra = palavra.replace('e', 'é');
          textoTitulo += palavra + ' ';
        }
        $tituloEl.text(textoTitulo);
        $descricaoEl.find('.preco-upgrade').text(`R$${upgrade.preco}`);
        $descricaoEl.show();
      });
      $imgUpgradeEl.on('mouseleave', () => $descricaoEl.hide());

      // se o jogador já tiver comprado o upgrade, este não é incluído na section:
      if (!jogador.upgrades.find((jogUp) => jogUp.imagemId === upgrade.imagemId ))
        $upgradesEl.append($imgUpgradeEl);

    });

  }

  // ...

}

/* Outras declarações: */

// criação dos itens:
var todosOsItens = {};
$.getJSON('json/itens.json', function(dados) {
  /* Em vez de atribuir dados a todosOsItens, optei por criar vários objetos Item
  para facilitar, caso precise, a adição de métodos */
  for (let k in dados)
    todosOsItens[k] = new Item(dados[k].nome, dados[k].preco, dados[k].tipo);
});

// criação das fichas:
var fichasCrianca = [],
    fichasAdolescente = [],
    fichasAdulto = [],
    fichasIdoso = [];

$.getJSON('json/fichas.json', function(dados) {

  let todasAsFichas = [],
      fichas = dados.fichas;
  for (let ficha of fichas) {
    if (ficha.fase instanceof Array)
      for (let i = 0; i < ficha.fase.length; i++)
        todasAsFichas.push(new Ficha(
          ficha.mensagem,
          ficha.tipoAcontecimento,
          ficha.tipoEfeito,
          ficha.efeito[i],
          ficha.probabilidade[i],
          ficha.fase[i]
        ));
    else
      todasAsFichas.push(new Ficha(
        ficha.mensagem,
        ficha.tipoAcontecimento,
        ficha.tipoEfeito,
        ficha.efeito,
        ficha.probabilidade,
        ficha.fase
      ));

  }

  for (let ficha of todasAsFichas) {
    switch (ficha.fase) {
      case FasesDaVida.CRIANCA:
        fichasCrianca.push(ficha);
      break;
      case FasesDaVida.ADOLESCENTE:
        fichasAdolescente.push(ficha);
      break;
      case FasesDaVida.ADULTO:
      case FasesDaVida.IDOSO:
        fichasAdulto.push(ficha);
      break;
    }
  }

});

// criação dos upgrades:
var todosOsUpgrades = {};
$.getJSON('json/upgrades.json', function(dados) {

  for (let nomeUpgrade in dados)
    todosOsUpgrades[nomeUpgrade] = new Upgrade(
      nomeUpgrade,
      dados[nomeUpgrade].mensagem,
      dados[nomeUpgrade].tipoEfeito,
      dados[nomeUpgrade].efeito,
      dados[nomeUpgrade].preco
    );

});
