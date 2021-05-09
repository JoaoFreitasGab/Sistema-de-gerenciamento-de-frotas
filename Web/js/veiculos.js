const usuarioLogado = buscarJsonLocalmente('usuarioLogado');

function inicializar() {
    

    listarVeiculos();
}

async function listarVeiculos() {
    const gridVeiculos = buscarElementoPorId('gridVeiculos');
    gridVeiculos.innerHTML = '';
    try {
        const resp = await fetch('http://localhost:8080/veiculos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            const veiculos = await resp.json();

            for(let i = 0; i < veiculos.length; i++) {
                const veiculo = veiculos[i];
                const linha = criarElemento('div');
                linha.classList.add('row');
                linha.classList.add(i%2 == 0 ? 'row-pair' : 'row-odd');

                const modelo = criarColuna('col-2');
                modelo.innerHTML = veiculo.modelo;
                const marca = criarColuna('col-2');
                marca.innerHTML = veiculo.marca;
                const placa = criarColuna('col-2');
                placa.innerHTML = veiculo.placa;
                const ano = criarColuna('col-2');
                ano.innerHTML = veiculo.ano;
                const tipo = criarColuna('col-2');
                tipo.innerHTML = veiculo.tipo;

                const colunaBotoes = criarColuna('col-1');

                const editar = criarIcone('img/editar.svg');
                editar.onclick = function() { 
                    editarVeiculo(veiculo.id);
                };

                const excluir = criarIcone('img/excluir.svg');
                excluir.onclick = function() { 
                    excluirVeiculo(veiculo.id);
                };

                const abrirOcorrencia = criarIcone('img/ocorrencia.svg');
                abrirOcorrencia.onclick = function() { 
                    // Limpar os campos da Dialos
                    buscarElementoPorId('titulo').value = '';
                    buscarElementoPorId('descricao').value = '';
                    
                    // Abrir a Dialog
                    const dialog = buscarElementoPorId('ocorrenciaDialog');
                    dialog.showModal();

                    // Criar o evento de click de Cancelar
                    const cancelar = buscarElementoPorId('cancelar');
                    cancelar.onclick = function() { 
                        dialog.close();
                    };

                    // Criar o evento de click de Salvar
                    const salvar = buscarElementoPorId('salvar');
                    salvar.onclick = function() { 
                        incluirOcorrencia(veiculo.id, usuarioLogado.id, dialog);
                    };
                };

                colunaBotoes.appendChild(editar);
                colunaBotoes.appendChild(excluir);
                colunaBotoes.appendChild(abrirOcorrencia);

                linha.appendChild(modelo);
                linha.appendChild(marca);
                linha.appendChild(placa);
                linha.appendChild(ano);
                linha.appendChild(tipo);
                linha.appendChild(colunaBotoes);

                gridVeiculos.appendChild(linha);
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

async function excluirVeiculo(id) {
    const confirmou = confirm(`Deseja excluir o veiculo de id ${id}?`);
    if (confirmou) {
        try {
            const resp = await fetch(`http://localhost:8080/veiculos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (resp.ok) {
                alert(`Veiculo ${id} excluido com sucesso!`)
                listarVeiculos();
            } else {
                const erro = await resp.json();
                alert(erro.mensagem);
            }
        } catch (erro) {
            console.log(erro);
            alert("Erro inesperado!");
        }
    }
}

function cadastrarVeiculo() {
    redirecionar('manter-veiculo.html');
}

function editarVeiculo(id) {
    redirecionar(`manter-veiculo.html?id=${id}`);
}

async function incluirOcorrencia(veiculoId, usuarioId, dialog) {
    try {
        const ocorrencia = {
            titulo: buscarElementoPorId('titulo').value,
            descricao: buscarElementoPorId('descricao').value,
            veiculo: {
                id: veiculoId
            },
            usuario: {
                id: usuarioId
            }
        };
        const resp = await fetch(`http://localhost:8080/ocorrencias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ocorrencia)
        });
        if (resp.ok) {
            dialog.close();
            alert(`Ocorrencia cadastrada com sucesso!`)
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}