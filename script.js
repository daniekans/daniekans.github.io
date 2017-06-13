/* - Menu Lateral de Desenhos - */

let bodyEl = document.querySelector('body');

function menuLateral() { bodyEl.classList.toggle('menu-ativo'); }

let botaomenuEl = document.querySelector('#btmenu');
botaomenuEl.addEventListener('click', menuLateral);

  // Adapta??o de "position: sticky;"

let menuEl = document.querySelector('#menu-de-navegacao');
let origOffsetY = menuEl.offsetTop;
document.addEventListener('scroll', function(evt) {
  window.scrollY >= origOffsetY ? menuEl.classList.add('fixo') :
                                  menuEl.classList.remove('fixo');
});

/*

  Este c贸digo muda a cor de fundo das sections do menu lateral

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

function rolar() {
  if(bodyEl.classList.toggle('rolando'))
    botaoRolarEl.innerHTML = 'Parar Execução';
  else
    botaoRolarEl.innerHTML = 'Do a Barrel Roll!';
}

let botaoRolarEl = document.querySelector('#barrel-roll');
botaoRolarEl.addEventListener('click', rolar);

/*  */
