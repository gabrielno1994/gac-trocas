const loader = document.getElementById('loader');
const container = document.getElementById('conteudo-json');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycSEULINKCORRETO/exec';

loader.style.display = 'block'; // Mostra o loader
container.innerHTML = '';       // Limpa conteúdo

// Ao final da função (dentro do try), esconda o loader:
loader.style.display = 'none';  // Esconde o loader
