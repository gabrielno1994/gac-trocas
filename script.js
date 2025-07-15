async function carregarDadosDoAppsScript() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxbUzaFlTPvxYekTXAkHZxy-_HYNOjgKgcQIZbR_mg5xePvMviJcNKOf-RemsdDwgsOVw/exec');
    const json = await response.json();

    console.log('JSON RECEBIDO:', json);

    // Painel esquerdo com DUAS caixas empilhadas SEPARADAS
    document.getElementById('coluna-esquerda').innerHTML = `
      <div class="caixa-subpainel azul">
        <div class="numero">${json.g14}</div>
        <div class="texto">troca(s) programada(s) para hoje</div>
      </div>
      <div class="caixa-subpainel vermelho">
        <div class="numero">${json.g16}</div>
        <div class="texto">pendência(s) aberta(s)</div>
      </div>
    `;

    // Painel direito com lista
    document.getElementById('coluna-direita').innerHTML = `
      <ul class="coluna-direita-lista">
        ${json.x265_x272.map(item => `<li>- ${item}</li>`).join('')}
      </ul>
    `;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    alert('Erro ao carregar dados. Verifique o console.');
  }
}

// Chama automaticamente ao abrir a página
window.addEventListener('DOMContentLoaded', carregarDadosDoAppsScript);
