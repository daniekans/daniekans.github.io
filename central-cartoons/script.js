/* Informações que aparecem quando o cursor do mouse passa pelos <li> do #menu-de-navegacao */

function AdicionaClasse(el, classe) { el.classList.add(classe) }

function RemoveClasse(el, classe) { el.classList.remove(classe); }

let menulisEl = document.querySelectorAll('#menu-de-navegacao li');
let externoEl = document.querySelector('#main_header');

externoEl.addEventListener('mouseover', function() {
  divsinfohoverEl.forEach(function(divEl) {
    RemoveClasse(divEl, 'visivel');
  });
});

menulisEl.forEach(function(el) {
  el.addEventListener('mouseover', function(evt) {
    let liEl = evt.currentTarget;
    let classe_liEl = liEl.className;

    divsinfohoverEl.forEach(function(divEl) {
      RemoveClasse(divEl, 'visivel');

      if (divEl.classList.contains(classe_liEl)) {
        AdicionaClasse(divEl, 'visivel');
        return;
      }

      divEl.addEventListener('mouseleave', function() {
        RemoveClasse(divEl, 'visivel');
      });
    });
  });
});

/* - Menu Lateral de Desenhos - */

let bodyEl = document.querySelector('body');

function menuLateral() { bodyEl.classList.toggle('menu-ativo'); }

let botaomenuEl = document.querySelector('#btmenu');
botaomenuEl.addEventListener('click', menuLateral);

  // Adapta??o de "position: sticky;"

let divsinfohoverEl = document.querySelectorAll('#info_hover > div');
let menuEl = document.querySelector('#menu-de-navegacao');
let origOffsetY = menuEl.offsetTop;
document.addEventListener('scroll', function(evt) {
  if (window.scrollY >= origOffsetY) {
    menuEl.classList.add('fixo');
    divsinfohoverEl.forEach(function(divEl) { divEl.classList.add('fixo'); });
  }
  else {
    menuEl.classList.remove('fixo');
    divsinfohoverEl.forEach(function(divEl) { divEl.classList.remove('fixo'); });
  }
});

document.addEventListener('scroll', function(evt) {
  window.scrollY >= origOffsetY ? menuEl.classList.add('fixo') :
                                  menuEl.classList.remove('fixo');
});

/*

  Este cè´¸digo muda a cor de fundo das sections do menu lateral

function SectionMouseOver(evt) {
  let sectionEl = evt.currentTarget;

  if (sectionEl.className === 'gravity-falls')
    sectionEl.classList.add('section-fundo-laranja');
  else if (sectionEl.className === 'steven-universe')
         sectionEl.classList.add('section-fundo-rosa');
       else if(sectionEl.className === 'svtfoe')
              sectionEl.classList.add('section-fundo-azul');
}

function SectionMouseOut(evt) {
  let sectionEl = evt.currentTarget;

  if (sectionEl.classList.contains('gravity-falls'))
    sectionEl.classList.remove('section-fundo-laranja');
  else if (sectionEl.classList.contains('steven-universe'))
         sectionEl.classList.remove('section-fundo-rosa');
       else if(sectionEl.classList.contains('svtfoe'))
              sectionEl.classList.remove('section-fundo-azul');
}

let menusectionEl = document.querySelectorAll('#menu-lateral section');
menusectionEl.forEach(function(el) {
  el.addEventListener('mouseover', SectionMouseOver);
  el.addEventListener('mouseout', SectionMouseOut);
});
*/

function BarrelRoll() {
  if(bodyEl.classList.toggle('rolando'))
    botaoRolarEl.innerHTML = 'Parar ExecuÃ§Ã£o';
  else
    botaoRolarEl.innerHTML = 'Do a Barrel Roll!';
}

let botaoRolarEl = document.querySelector('#barrel-roll');
botaoRolarEl.addEventListener('click', BarrelRoll);

/* Rolamento automático do menu lateral (caso seja necessário)  */

let i = -1, tempo = 1, tamanho = 1000, t, tempEl;
let menulateralEl = document.querySelector('#menu-lateral');

function RolarCima(evt) {
  if(i === -1)
    tempEl = evt.currentTarget;
  menulateralEl.scrollTop = i;
  i -= 3;
  t = setTimeout(RolarCima, tempo);
  if(i === tamanho || i < 0) i = 0;
}

function RolarBaixo(evt) {
  if(i === -1)
    tempEl = evt.currentTarget;
  menulateralEl.scrollTop = i;
  i += 3;
  t = setTimeout(RolarBaixo, tempo);
  if(i <= 0) i = 0;
}

function Parar() {
  clearTimeout(t);
}

let menusectionEl = document.querySelectorAll('#menu-lateral > div');
menusectionEl.forEach(function(el) {
  if(el.classList.contains('transp1'))
    el.addEventListener('mouseenter', RolarCima);
  else
    el.addEventListener('mouseenter', RolarBaixo);

  el.addEventListener('mouseleave', Parar);
});
