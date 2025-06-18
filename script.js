// script.js

// A URL do seu Google Apps Script, conforme fornecida.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxOuXGU3ieQFp75G0sJMKbFqB_g5J4QqFLJGZefvV4jVp9SYsm4UK66_Pzmrfx6QMvqiA/exec';

/**
 * Função assíncrona para carregar os dados do Google Apps Script.
 * Usa a API Fetch para fazer a requisição HTTP.
 */
async function carregarDadosDoAppsScript() {
    const container = document.getElementById('conteudo-json');
    if (!container) {
        console.error("Erro: Elemento com ID 'conteudo-json' não encontrado no HTML.");
        return;
    }

    container.innerHTML = 'Carregando dados...';

    try {
        const response = await fetch(APPS_SCRIPT_URL);

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status} - ${response.statusText}`);
        }

        const dados = await response.json();

        console.log('Dados recebidos do Apps Script:', dados);

        exibirDadosNaPagina(dados);

    } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados do Apps Script:', error);
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

    if (!container) {
        console.error("Erro: Elemento com ID 'conteudo-json' não encontrado no HTML.");
        return;
    }

    let htmlContent = '';

    if (dados) {
        if (typeof dados === 'object' && dados !== null && dados.g14 !== undefined && Array.isArray(dados.x265_x272)) {

            // Exibindo o valor de G14
            const g14DisplayValue = (dados.g14 === null || dados.g14 === undefined || dados.g14 === "")
            ? 'N/A (Dado Ausente)' 
            : `${dados.g14} troca(s) programada(s) para hoje`;
            htmlContent += `<p class="destaque-trocas"><strong>${g14DisplayValue}</strong></p>`;

            // Exibindo os valores de X265 a X272 (sem o número da célula)
            if (dados.x265_x272.length > 0) {
                htmlContent += `<ul>`;
                dados.x265_x272.forEach((item, index) => {
                    const displayValue = (item === "" || item === null || item === undefined) ? ;
                    htmlContent += `<li>${displayValue}</li>`;
                });
                htmlContent += `</ul>`;
            } else {
                htmlContent += `<p>Nenhum dado encontrado para as estatísticas.</p>`;
            }

            // REMOVIDAS AS LINHAS DO JSON COMPLETO AQUI

        } else {
            htmlContent = '<p style="color: orange;">Formato de dados inesperado do Apps Script. Verifique o JSON retornado.</p>';
            try {
                htmlContent += `<h4>JSON Bruto (se disponível):</h4><pre>${JSON.stringify(dados, null, 2)}</pre>`;
            } catch (e) {
                htmlContent += `<p>Não foi possível exibir o JSON bruto.</p>`;
            }
        }
    } else {
        htmlContent = '<p>Nenhum dado recebido do Apps Script.</p>';
    }

    container.innerHTML = htmlContent;
}

document.addEventListener('DOMContentLoaded', carregarDadosDoAppsScript);
