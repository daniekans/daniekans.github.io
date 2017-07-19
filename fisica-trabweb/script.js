// Objeto com o valor das gravidades dos planetas

const gravidades = {
  mercurio: 3.7,
  marte: 3.7,
  venus: 8.9,
  terra: 9.8,
  jupiter: 24.7,
  saturno: 10.4,
  urano: 8.7,
  netuno: 11.15,
  plutao: 0.6,
  lua: 1.62,
  sol: 274
};

// Indicar mudança da gravidade

let botaoEl = document.querySelector('#calc-peso');
let selectEl = document.querySelector('select#planetas');

if(botaoEl && selectEl) {

  botaoEl.addEventListener('click', function() {
    let massaEl = document.querySelector('#massa');
    let pesoEl = document.querySelector('#peso');

    if(massaEl.value >= 0) {
      peso.style.color = 'initial';
      peso.value = ((massaEl.value * gravidades[selectEl.value]).toFixed(2) + ' N');
    }
    else {
      peso.style.color = 'darkred';
      peso.value = 'Massa Negativa';
    }
  })

  selectEl.addEventListener('change', function() {
    document.querySelector('#div-planetas .mostra-g').innerHTML = ('A gravidade no corpo celeste selecionado é de ' + gravidades[this.value] + ' m/s²');
  });

}

// Teste...

if((location.pathname.indexOf('exp') !== -1) && (location.pathname.length < 12)) {
  let footerEl = document.querySelector('footer');
  let btAntEl = document.createElement('BUTTON');
  let btProxEl = document.createElement('BUTTON');

  btAntEl.innerHTML = 'Experiência Anterior';
  btProxEl.innerHTML = 'Próxima Experiência';
  footerEl.appendChild(btAntEl);
  footerEl.appendChild(btProxEl);

  let x = parseInt(location.pathname.replace('/fisica-trabweb/exp', ''));
  if(x !== 16)
    btProxEl.addEventListener('click', function() {
    location.pathname = 'fisica-trabweb/exp' + String(++x) + '.html';
  });
  else
    btProxEl.style.backgroundColor = 'darkred';
  if(x !== 1)
    btAntEl.addEventListener('click', function() {
      location.pathname = 'fisica-trabweb/exp' + String(--x) + '.html';
    });
  else
    btAntEl.style.backgroundColor = 'darkred';

}
