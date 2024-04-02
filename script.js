let jogadorAtual = 'X';
let jogoAcabou = false;
let placarX = 0;
let placarO = 0;

const tabuleiro = document.querySelector('.tabuleiro');
const celulas = Array.from({ length: 9 });

const combinacoesVencedoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const placarXElement = document.getElementById('placarX');
const placarOElement = document.getElementById('placarO');

celulas.forEach((_, indice) => {
  const celula = document.createElement('div');
  celula.classList.add('celula');
  celula.setAttribute('data-indice', indice);
  tabuleiro.appendChild(celula);
});

function verificarVencedor() {
  for (let combinacao of combinacoesVencedoras) {
    const [a, b, c] = combinacao;
    if (celulas[a] && celulas[a] === celulas[b] && celulas[a] === celulas[c]) {
      return celulas[a];
    }
  }
  
  return null;
}

function lidarCliqueCelula(evento) {
  const celula = evento.target;
  const indice = celula.getAttribute('data-indice');

  if (celulas[indice] || jogoAcabou) return;

  celulas[indice] = jogadorAtual;
  celula.textContent = jogadorAtual;
  
  const vencedor = verificarVencedor();
  if (vencedor) {
    jogoAcabou = true;
    if (vencedor === 'X') {
      placarX++;
      placarXElement.textContent = placarX;
    } else {
      placarO++;
      placarOElement.textContent = placarO;
    }
    setTimeout(() => {
      mostrarMensagem(`O jogador ${vencedor} venceu!`, '#4CAF50'); 
      resetarJogo();
    }, 200);
    return;
  }

  if (!celulas.includes(undefined)) {
    jogoAcabou = true;
    setTimeout(() => {
      mostrarMensagem('O jogo empatou!', '#f44336'); 
      resetarJogo();
    }, 200);
    return;
  }

  jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
}

function resetarJogo() {
  celulas.fill(undefined);
  tabuleiro.querySelectorAll('.celula').forEach(celula => celula.textContent = '');
  jogoAcabou = false;
  jogadorAtual = 'X';
}

function mostrarMensagem(mensagem, cor) {
  const alerta = document.createElement('div');
  alerta.classList.add('alert-bar');
  alerta.style.backgroundColor = cor;
  alerta.textContent = mensagem;
  document.body.appendChild(alerta);
  setTimeout(() => {
    alerta.remove();
  }, 2000); 
}

tabuleiro.addEventListener('click', lidarCliqueCelula);
