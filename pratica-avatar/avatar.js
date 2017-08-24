// Exercício ''

let nomeInputEl = document.querySelector('#nome-in');

nomeInputEl.addEventListener('input', function() {
    let nomeAvatarEl = document.querySelector('#avatar-nome');

    nomeAvatarEl.innerHTML = nomeInputEl.value; // às vezes eu prefiro
    // me referir ao objeto corrente com 'this'.
});

// Exercício 2

let peleInputEl = document.querySelector('#cor-pele-in');

peleInputEl.addEventListener('change', function() {
  let corpoAvatarEl = document.querySelector('#avatar-corpo');
  let cabecaAvatarEl = document.querySelector('#avatar-cabeca');

  corpoAvatarEl.style.backgroundColor
    = cabecaAvatarEl.style.backgroundColor
    = peleInputEl.value;
});

// Exercício 3

let cabeloSelectEl = document.querySelector('#cabelo-select');

cabeloSelectEl.addEventListener('change', function() {
  let cabeloAvatarEl = document.querySelector('#avatar-cabelo');

  cabeloAvatarEl.src = cabeloSelectEl.value;
});

// Desafio 1

let checkEls = document.querySelectorAll('input[type="checkbox"]');
let acessoriosEl = document.querySelectorAll('img.avatar-acessorio');

checkEls.forEach(function(checkboxEl) {

  checkboxEl.addEventListener('change', function() {
    if (checkboxEl.checked) {
      acessoriosEl.forEach(function(imgEl) {
        if (imgEl.id.includes(checkboxEl.value))
        imgEl.classList.add('visivel');
      });
    }

    else {
      acessoriosEl.forEach(function(imgEl) {
        if (imgEl.id.includes(checkboxEl.value))
          imgEl.classList.remove('visivel');
      });
    }
  });

});

// Desafio 2

let btBaixarEl = document.querySelector('#baixar');
let avatarEl = document.querySelector('#avatar-preview');

btBaixarEl.addEventListener('click', function() {

  html2canvas(avatarEl, {
    onrendered: function(canvas) {
      let imagemCodificadaEmURL = canvas.toDataURL();
      /* Quando eu tentava baixar a imagem sem utilizar o atom
       * live server, ocorria um erro e parece que está relacionado
       * com segurança...
       */
      let linkEl = document.createElement('a');

      if (nomeInputEl.value == '')
        linkEl.download = 'avatar.png';
      else
        linkEl.download = 'avatar_' + nomeInputEl.value + '.png';

      linkEl.href = imagemCodificadaEmURL;
      document.body.appendChild(linkEl);
      linkEl.click();
    }
  });

});
