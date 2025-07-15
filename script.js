async function carregarDadosDoAppsScript() {
  try {
    const response = await fetch('SUA_URL_DO_APPS_SCRIPT');
    const json = await response.json();

    console.log('JSON RECEBIDO:', json);

    // Painel esquerdo com DUAS caixas empilhadas
    const painelEsquerdo = `
      <div class="caixa-separada">
        <div class="numero-destaque">${json.g14}</div>
        <div class="texto-destaque">troca(s) programada(s) para hoje</div>
      </div>
      <div class="caixa-separada">
        <div class="numero-destaque">${json.g16}</div>
        <div class="texto-destaque">pendência(s) aberta(s)</div>
      </div>
    `;
    document.getElementById('coluna-esquerda').innerHTML = painelEsquerdo;

    // Painel direito com lista
    const painelDireito = `
      <ul class="coluna-direita-lista">
        ${json.x265_x272.map(item => `<li>- ${item}</li>`).join('')}
      </ul>
    `;
    document.getElementById('coluna-direita').innerHTML = painelDireito;

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    alert('Erro ao carregar dados. Verifique o console.');
  }
}

// Chama automaticamente ao abrir a página
window.addEventListener('DOMContentLoaded', carregarDadosDoAppsScript);
