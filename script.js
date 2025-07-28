async function carregarDadosDoAppsScript() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxkLZmDsDlZn_IZ-7h6qdNBi7ISt_iltEVqFkGdULmEvpe08DVAQu_nN3CNUlnF9hA-gA/exec');
    const json = await response.json();

    console.log('JSON RECEBIDO:', json);

const totalPercent = json.totalpercent; // vem do JSON
const barra = document.getElementById('barra-progresso');
const larguraMaxima = 1518; // igual à .barra-fundo
const larguraAtual = totalPercent * larguraMaxima;
barra.style.width = `${larguraAtual}px`;
window.ultimaRespostaJson = json;

    // Preencher painel esquerdo com duas caixas separadas
    document.getElementById('coluna-esquerda').innerHTML = `
      <div class="caixa-individual">
        <div class="g14-numero">${json.g14}</div>
        <div class="g14-texto">troca(s) programada(s) para hoje</div>
      </div>
      <div class="caixa-individual">
        <div class="g16-numero">${json.g16}</div>
        <div class="g16-texto">pendência(s) aberta(s)</div>
      </div>
    `;

    // Preencher painel direito com lista
    document.getElementById('coluna-direita').innerHTML = `
      <ul class="coluna-direita-lista">
        ${json.x265_x272.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    alert('Erro ao carregar dados. Verifique o console.');
  }

}

// Chama automaticamente ao carregar a página
window.addEventListener('DOMContentLoaded', carregarDadosDoAppsScript);

document.querySelector('.logo-canto').addEventListener('click', function () {
  document.getElementById('overlay').style.display = 'block';
});

// Exibir overlay com mensagem ao clicar na imagem
document.querySelector('.logo-canto').addEventListener('click', function () {
  const overlay = document.getElementById('overlay');
  const mensagem = document.getElementById('mensagemOverlay');

  // Trocas de amanhã vindo do JSON carregado
  const trocas = ultimaRespostaJson?.trocas_amanha_json || [];

  let conteudoHTML = '';

  if (trocas.length > 0) {
    conteudoHTML += '<ul>';
    trocas.forEach(item => {
      conteudoHTML += `<li>${item}</li>`;
    });
    conteudoHTML += '</ul>';
  } else {
    conteudoHTML = '<p>Sem trocas programadas para amanhã.</p>';
  }

  conteudoHTML += '<p style="margin-top: 20px;">Pressione Esc para sair</p>';

  mensagem.innerHTML = conteudoHTML;
  overlay.style.display = 'flex';
});

// Ocultar overlay ao pressionar ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.getElementById('overlay').style.display = 'none';
  }
});
