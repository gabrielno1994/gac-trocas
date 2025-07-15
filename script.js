async function carregarDadosDoAppsScript() {
    try {
        // Substitua pela sua URL real do Apps Script
        const response = await fetch('SUA_URL_DO_APPS_SCRIPT');
        const json = await response.json();

        // Injetar na coluna da esquerda
        document.getElementById('coluna-esquerda').innerHTML = `
          <div class="coluna-esquerda-conteudo">
            <div class="g14-numero">${json.G14}</div>
            <div class="g14-texto">troca(s) programada(s) para hoje</div>
            <div class="g16-texto">No momento estamos com</div>
            <div class="g16-numero">${json.G16} pendência(s)</div>
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
