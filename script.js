// script.js

// Função para carregar os dados do JSON e exibir na página
async function carregarDados() {
    try {
        const resposta = await fetch('dados.json'); // Caminho para seu arquivo JSON
        const dados = await resposta.json();

        let htmlContent = '';

        // Exibindo o valor de G14 com texto incorporado
        const g14DisplayValue = (dados.g14 === null || dados.g14 === undefined || dados.g14 === "")
            ? 'N/A (Dado Ausente)'
            : `${dados.g14} trocas programadas para hoje`;

        htmlContent += `<p><strong>${g14DisplayValue}</strong></p>`;

        // Exibe o conteúdo final na div
        document.getElementById('conteudo-json').innerHTML = htmlContent;

    } catch (erro) {
        document.getElementById('conteudo-json').innerHTML = `<p>Erro ao carregar os dados.</p>`;
        console.error('Erro ao carregar dados:', erro);
    }
}

// Chama a função quando a página é carregada
window.onload = carregarDados;
