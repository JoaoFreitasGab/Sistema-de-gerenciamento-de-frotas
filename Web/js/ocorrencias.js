const usuarioLogado = buscarJsonLocalmente('usuarioLogado');
const campoTitulo = buscarElementoPorId('titulo');
const campoDescricao = buscarElementoPorId('descricao');


function inicializar() {
    if (usuarioLogado.tipo == 'CLIENTE') {
        voltar();
    } else {
        const saudacao = buscarElementoPorId('saudacao');
       

        listarOcorrencias();
    }
}


async function listarOcorrencias() {
    const gridOcorrencias = buscarElementoPorId('gridOcorrencias');
    gridOcorrencias.innerHTML = '';

    let url = 'http://localhost:8080/ocorrencias';

    const idVeiculo = buscarQueryString('idVeiculo');
    if (idVeiculo) {
        url = `${url}?idVeiculo=${idVeiculo}`;
    } else {
        url = `${url}?idFuncionario=${usuarioLogado.id}`;
    }

    try {
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {


                const linhaheader = criarElemento('div');
                linhaheader.classList.add('row');
                linhaheader.classList.add('headerheader');

                const headertitulo = criarColuna('col-2')
                headertitulo.innerHTML = '<strong>Titulo</strong>';
                const headerresponsavel = criarColuna('col-2')
                headerresponsavel.innerHTML = '<strong>Responsável</strong>';
                const headerveiculo = criarColuna('col-2')
                headerveiculo.innerHTML = '<strong>Veículo</strong>';
                const headerinicio = criarColuna('col-2')
                headerinicio.innerHTML = '<strong>Inicio</strong>';
                const headerfim = criarColuna('col-2')
                headerfim.innerHTML = '<strong>Fim</strong>';
                const headeracoes = criarColuna('col-2');
                headeracoes.innerHTML = '<strong>Ações</strong>';

                linhaheader.appendChild(headertitulo);
                linhaheader.appendChild(headerresponsavel);
                linhaheader.appendChild(headerveiculo);
                linhaheader.appendChild(headerinicio);
                linhaheader.appendChild(headerfim);
                linhaheader.appendChild(headeracoes);

                gridOcorrencias.appendChild(linhaheader);




              const ocorrencias = await resp.json();



            for(let i = 0; i < ocorrencias.length; i++) {
                const ocorrencia = ocorrencias[i];

                const linha = criarElemento('div');
                linha.classList.add('row');
                linha.classList.add(i%2 == 0 ? 'row-pair' : 'row-odd');

                const titulo = criarColuna('col-2')
                titulo.innerHTML = ocorrencia.titulo;
                const responsavel = criarColuna('col-2')
                responsavel.innerHTML = ocorrencia.usuario.nome;
                const veiculo = criarColuna('col-2')
                veiculo.innerHTML = ocorrencia.veiculo.placa;
                const inicio = criarColuna('col-2')
                inicio.innerHTML = ocorrencia.inicio;
                const fim = criarColuna('col-2')
                fim.innerHTML = ocorrencia.fim;

                const colunaBotoes = criarColuna('col-2');

                const ehEncerrada = ocorrencia.fim;
                const editar = criarIcone(`img/${ehEncerrada ? 'visualizar' : 'editar'}.svg`);
                editar.onclick = function() {
                    // Recupera os elementos da Dialog
                    const dialog = buscarElementoPorId('ocorrenciaDialog');
                    const cancelar = buscarElementoPorId('cancelar');
                    const encerrar = buscarElementoPorId('encerrar');
                    const salvar = buscarElementoPorId('salvar');

                    // Carregar os dados para edicão
                    campoTitulo.value = ocorrencia.titulo;
                    campoDescricao.value = ocorrencia.descricao;

                    // Regras de visibilidade e habilitacão de campos
                    campoTitulo.disabled = ehEncerrada ? true : false;
                    campoDescricao.disabled = ehEncerrada ? true : false;
                    encerrar.style.display = ehEncerrada ? 'none' : 'block';
                    salvar.style.display = ehEncerrada ? 'none' : 'block';
                    
                    // Abrir a Dialog
                    dialog.showModal();

                    // Criar o evento de click de Cancelar
                    cancelar.onclick = function() { 
                        dialog.close();
                    };

                    // Criar o evento de click de Encerrar
                    encerrar.onclick = function() { 
                        encerrarOcorrencia(ocorrencia, dialog);
                    };

                    // Criar o evento de click de Salvar
                    salvar.onclick = function() { 
                        editarOcorrencia(ocorrencia, dialog);
                    };
                };

                colunaBotoes.appendChild(editar);

                linha.appendChild(titulo);
                linha.appendChild(responsavel);
                linha.appendChild(veiculo);
                linha.appendChild(inicio);
                linha.appendChild(fim);
                linha.appendChild(colunaBotoes);

                gridOcorrencias.appendChild(linha);
            }
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}

async function editarOcorrencia(ocorrencia, dialog) {
    const urlEditar = `http://localhost:8080/ocorrencias/${ocorrencia.id}`;
    salvarOcorrencia(urlEditar, ocorrencia, 'Ocorrência salva com sucesso!', dialog)
}

function encerrarOcorrencia(ocorrencia, dialog) {
    const urlEncerrar = `http://localhost:8080/ocorrencias/encerrar/${ocorrencia.id}`;
    salvarOcorrencia(urlEncerrar, ocorrencia, 'Ocorrência encerrada com sucesso!', dialog)
}

async function salvarOcorrencia(url, ocorrencia, mensagemSucesso, dialog) {
    try {
        ocorrencia.titulo = campoTitulo.value;
        ocorrencia.descricao = campoDescricao.value;

        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ocorrencia)
        });
        if (resp.ok) {
            dialog.close();
            alert(mensagemSucesso);
            listarOcorrencias();
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}