const usuarioLogado = buscarJsonLocalmente('usuarioLogado');
const campoTitulo = buscarElementoPorId('titulo');
const campoDescricao = buscarElementoPorId('descricao');

function inicializar() {
    
    const saudacao = buscarElementoPorId('salve');
    saudacao.innerHTML = `Bem vindo, ${usuarioLogado.nome}!`;

}