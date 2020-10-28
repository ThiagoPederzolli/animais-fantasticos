// eslint-disable-next-line import/no-named-as-default-member
import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  // cria a  div contendo informações
  // com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  function animaAnimaisNumeros() {
    const animanumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animanumeros.init();
  }

  // puxa os animais através de um arquivo json
  // e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();
      // após a transformação em JSON ativa as funções:
      animaisJSON.forEach(animal => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
