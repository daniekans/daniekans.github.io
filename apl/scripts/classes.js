/* A Person's Life
 * Trabalho de Web – INF-1A – CEFET-MG
 * Versão 2 – Sem teste
 */

 // Tentativa de criar uma enumeração no JS...
 const FasesDaVida = { // primeira letra maiúscula por agir como uma enum
   CRIANCA: 'Criança',
   ADOLESCENTE: 'Adolescente',
   ADULTO: 'Adulto',
   IDOSO: 'Idoso',
   MORTO: 'Morto'
 };

 const Situacao = {
   ESTUDANTE: 'Estudante',
   EMPREGADO: 'Empregado',
   DESEMPREGADO: 'Desempregado'
 };

// Classe Item, usada para o que é comprado dentro do jogo.
class Item {

  constructor(nome = '', preco = 0, tipo = FasesDaVida.CRIANCA) {
    this.nome = nome;
    this.preco = preco;
    this.tipo = tipo;
  }

  static atzItens(todosOsItens, jogador) {

    // Loja e pertences:
    let $lojaEl = $('#loja');
    let $pertencesEl = $('#pertences');
    $lojaEl.empty();
    $pertencesEl.empty();

    Object.entries(todosOsItens).forEach(function(parItem) {

      let nomeProp = parItem[0];
      let item = parItem[1];
      if (item.tipo === jogador.tipoItens) {
        let $itemEl = $('<div></div>');
        let $itemImgEl = $('<img></img>');
        let $itemNomeEl = $('<h3></h3>').text(item.nome);
        let $itemPrecoEl = $('<span></span>').text('Preço: R$' + item.preco);
        let $btComprarEl = $('<button></button>').text('COMPRAR');

        $itemImgEl.attr('src', ('imgs/' + nomeProp + '.png')); // Ajustar depois
        $itemEl.addClass('item');
        // acréscimos:
        $itemEl.append($itemNomeEl);
        $itemEl.append($itemImgEl);

        // adiciona corretamente os itens:
        if (jogador.itens.includes(item)) {
          $pertencesEl.append($itemEl);
        } else {
          $itemEl.append($itemPrecoEl);
          $itemEl.append($btComprarEl);
          $itemEl.append($('<div></div>').addClass('clear'));
          $btComprarEl.on('click', function() {
            if (jogador.dinheiro >= item.preco) {
              // efeito sonoro de acordo com a disponibilidade...
              jogador.itens.push(item);
              jogador.dinheiro -= item.preco;
              Item.atzItens(todosOsItens, jogador);
              $('#dinheiro-span').text(jogador.dinheiro);
            } else {

            }
          });
          $lojaEl.append($itemEl);
        }
      }

    });

    [$pertencesEl, $lojaEl].forEach(function($containerEl) {
      if (!$containerEl.children().length)
        $pertencesEl.append($('<h3>Sem itens.<h3>').addClass('sem-itens'));
    });

  }

}

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

// Classe Jogador, representando o usuário e seus dados.
class Jogador {

  constructor(jog = 'Person') {
    if (jog instanceof Object) {
      this.nome = jog.nome;
      this.idade = jog.idade;
      this.genero = jog.genero;
      this.xp = jog.xp;
      this.limiteXPInicial = jog.limiteXPInicial;
      this.limiteXP = jog.limiteXP;
      this.incrementoXP = jog.incrementoXP;
      this.dinheiro = jog.dinheiro;
      this.incrementoDinheiro = jog.incrementoDinheiro;
      this.itens = jog.itens;
      this.faseVida = jog.faseVida;
      this.tipoItens = jog.tipoItens;
      this.situacao = jog.situacao;
    } else {
      this.nome = jog;
      this.idade = 1;
      this.genero = '';
      this.xp = 0;
      this.limiteXPInicial = 10;
      this.limiteXP = this.limiteXPInicial;
      this.incrementoXP = 1;
      this.dinheiro = 0;
      this.incrementoDinheiro = 1;
      this.itens = [];
      this.faseVida = FasesDaVida.CRIANCA;
      this.tipoItens = this.faseVida;
      this.situacao = Situacao.ESTUDANTE; // Este atributo serve para
    }
    this.imagem = $('#jogador-imagem');
  }

  aumentaIdade() {

    this.idade++;
    switch (this.idade) {
      case 12:
        this.faseVida = FasesDaVida.ADOLESCENTE;
        this.tipoItens = this.faseVida;
        this.incrementoDinheiro = 5;
        Item.atzItens(todosOsItens, this);
        break;
      case 18:
        this.faseVida = FasesDaVida.ADULTO;
        this.tipoItens = this.faseVida;
        this.incrementoDinheiro = 15;
        this.incrementoXP = 3;
        break;
      case 65:
        this.faseVida = FasesDaVida.IDOSO;
        break;
      case 100:
        this.faseVida = FasesDaVida.MORTO;
        break;
    }

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

    if (item instanceof Item) {
      this.itens.push(item);
      // this.itens.sort();
    }

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

}

// Classe Ficha, usada para as situações aleatórias que surgem durante a vida do jogador.
class Ficha {

  constructor(mensagem = '', tipo = null, efeito = 0, probabilidade = []) {
    this.mensagem = mensagem;
    this.tipo = tipo;
    // efeito é a quntidade de dinheiro retirado ou a função executada de acordo com o 'comando' da ficha:
    this.efeito = efeito;
    this.probabilidade = probabilidade;
  }

}
