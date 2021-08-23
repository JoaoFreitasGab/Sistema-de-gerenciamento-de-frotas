function buscarElementoPorId(id) {
    return document.getElementById(id);
}

function redirecionar(pagina) {
    window.location.href = pagina;
}

function salvarLocalmente(chave, valor) {
    localStorage.setItem(chave, valor);
}

function salvarJsonLocalmente(chave, objeto) {
    salvarLocalmente(chave, JSON.stringify(objeto));
}

function buscarLocalmente(chave) {
    return localStorage.getItem(chave);
}

function buscarJsonLocalmente(chave) {
    return JSON.parse(buscarLocalmente(chave));
}

function criarElemento(tag) {
    return document.createElement(tag);
}

function criarColuna(classeColuna) {
    const coluna = criarElemento('div');
    coluna.classList.add(classeColuna, 'center');
    return coluna;
}

function criarIcone(iconeSrc) {
    const icone = criarElemento('img');
    icone.src = iconeSrc;
    icone.classList.add('icon');
    return icone;
}

function buscarQueryString(chave) {
    // https://stackoverflow.com/a/901144/3072570
    const queryString = new URLSearchParams(window.location.search);
    return queryString.get(chave);
}

function voltar() {
    window.history.back();
}