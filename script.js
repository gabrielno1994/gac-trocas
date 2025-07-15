async function carregarDadosDoAppsScript() {
    try {
        // Substitua pela sua URL real do Apps Script
        const response = await fetch('https://script.google.com/macros/s/AKfycbxbUzaFlTPvxYekTXAkHZxy-_HYNOjgKgcQIZbR_mg5xePvMviJcNKOf-RemsdDwgsOVw/exec');
        const json = await response.json();
        console.log('JSON RECEBIDO:', json);

        // Injetar na coluna da esquerda
        document.getElementById('coluna-esquerda').innerHTML = `
          <div class="painel-esquerdo">
            <div class="caixa-subpainel g14-caixa">
              <div class="g14-numero">${json.g14}</div>
              <div class="g14-texto">troca(s) programada(s) para hoje</div>
            </div>
            <div class="caixa-subpainel g16-caixa">
              <div class="g16-numero">${json.g16}</div>
              <div class="g16-texto">pendência(s) aberta(s)</div>
            </div>
          </div>
`;

        // Injetar na coluna da direita
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
carregarDadosDoAppsScript();
