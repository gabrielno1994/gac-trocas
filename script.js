async function carregarDadosDoAppsScript() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycby91ZA88Hi3R5I_Ehnd5uWo6XV6wvacouCG-eokJQ0XZbNcTVUWdQAzXrvedDUmlhyVVw/exec');
    const json = await response.json();

    console.log('JSON RECEBIDO:', json);

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
