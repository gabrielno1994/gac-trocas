// script.js

// A URL do seu Google Apps Script, conforme fornecida.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxOuXGU3ieQFp75G0sJMKbFqB_g5J4QqFLJGZefvV4jVp9SYsm4UK66_Pzmrfx6QMvqiA/exec';

/**
 * Função assíncrona para carregar os dados do Google Apps Script.
 * Usa a API Fetch para fazer a requisição HTTP.
 */
async function carregarDadosDoAppsScript() {
    const container = document.getElementById('conteudo-json'); // Pega o elemento para exibir mensagens
    if (!container) {
        console.error("Erro: Elemento com ID 'conteudo-json' não encontrado no HTML.");
        return;
    }

    container.innerHTML = 'Carregando dados...'; // Mensagem inicial de carregamento

    try {
        // Faz a requisição GET para a URL do Apps Script
        const response = await fetch(APPS_SCRIPT_URL);

        // Verifica se a resposta da requisição foi bem-sucedida (status 200 OK)
        if (!response.ok) {
            // Se o status não for OK, lança um erro para ser pego pelo bloco catch
            throw new Error(`Erro HTTP! Status: ${response.status} - ${response.statusText}`);
        }

        // Converte o corpo da resposta para um objeto JSON
        const dados = await response.json();

        // Exibe os dados no console do navegador para depuração
        console.log('Dados recebidos do Apps Script:', dados);

        // Chama a função para exibir esses dados na sua página HTML
        exibirDadosNaPagina(dados);

    } catch (error) {
        // Captura e loga qualquer erro que ocorra durante a requisição ou processamento
        console.error('Ocorreu um erro ao buscar os dados do Apps Script:', error);

        // Atualiza a div de conteúdo para informar o usuário sobre o erro
        container.innerHTML = '<p style="color: red;">Erro ao carregar os dados. Verifique o console para mais detalhes.</p>';
    }
}

/**
 * Função para exibir os dados JSON recebidos na div 'conteudo-json' do HTML.
 * Espera um JSON com 'g14' e 'x265_x272'.
 * @param {Object} dados - O objeto JSON retornado pelo Apps Script.
 */
function exibirDadosNaPagina(dados) {
    const container = document.getElementById('conteudo-json');

    // Verifica se o elemento container existe no HTML
    if (!container) {
        console.error("Erro: Elemento com ID 'conteudo-json' não encontrado no HTML. Verifique seu index.html.");
        return;
    }

    let htmlContent = ''; // String para construir o HTML a ser injetado

    if (dados) {
        // Verifica se 'dados' é um objeto e possui as propriedades esperadas
        if (typeof dados === 'object' && dados !== null && dados.g14 !== undefined && Array.isArray(dados.x265_x272)) {

            // Exibindo o valor de G14
            htmlContent += `<h3>Valor da Célula G14 (Aba 'Calendário'):</h3>`;
            htmlContent += `<p><strong>${dados.g14 === null || dados.g14 === undefined ? 'N/A' : dados.g14}</strong></p>`; // Exibe o valor de G14

            // Exibindo os valores de X265 a X272
            htmlContent += `<h3>Valores das Células X265-X272 (Aba 'Estatísticas'):</h3>`;
            if (dados.x265_x272.length > 0) {
                htmlContent += `<ul>`;
                dados.x265_x272.forEach((item, index) => {
                    htmlContent += `<li><strong>X${265 + index}:</strong> ${item || 'N/A'}</li>`;
                });
                htmlContent += `</ul>`;
            } else {
                htmlContent += `<p>Nenhum dado encontrado para as estatísticas.</p>`;
            }

            // Opcional: Adicionar o JSON bruto para depuração
            htmlContent += '<h4>JSON Completo Recebido:</h4>';
            htmlContent += `<pre>${JSON.stringify(dados, null, 2)}</pre>`;

        } else {
            // Caso 'dados' não seja um objeto válido ou esteja no formato inesperado
            htmlContent = '<p style="color: orange;">Formato de dados inesperado do Apps Script. Verifique o JSON retornado.</p>';
            htmlContent += '<h4>JSON Bruto (se disponível):</h4>';
            try {
                htmlContent += `<pre>${JSON.stringify(dados, null, 2)}</pre>`;
            } catch (e) {
                htmlContent += `<p>Não foi possível exibir o JSON bruto.</p>`;
            }
        }
    } else {
        htmlContent = '<p>Nenhum dado recebido do Apps Script.</p>';
    }

    // Define o conteúdo HTML na div
    container.innerHTML = htmlContent;
}

// Garante que a função 'carregarDadosDoAppsScript' seja chamada
// assim que todo o conteúdo do DOM (HTML) for carregado.
document.addEventListener('DOMContentLoaded', carregarDadosDoAppsScript);
