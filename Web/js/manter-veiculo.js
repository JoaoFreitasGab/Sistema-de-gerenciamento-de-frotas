const usuarioLogado = buscarJsonLocalmente('usuarioLogado');


const id = buscarQueryString('id');
const placa = buscarElementoPorId('placa');
const ano = buscarElementoPorId('ano');
const marca = buscarElementoPorId('marca');
const modelo = buscarElementoPorId('modelo');
const tipo = buscarElementoPorId('tipo');
const inativo = buscarElementoPorId('inativo');

  
async function inicializar() {
     if (usuarioLogado.tipo == 'CLIENTE') {
        voltar();
    }
    if (id) {
        try {
            const resp = await fetch(`http://localhost:8080/veiculos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (resp.ok) {
                const veiculo = await resp.json();
                placa.value = veiculo.placa;
                ano.value = veiculo.ano;
                marca.value = veiculo.marca;
                modelo.value = veiculo.modelo;
                tipo.value = veiculo.tipo;
                inativo.checked = veiculo.inativo;
                imagem.value = veiculo.imagem;
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

async function salvarVeiculo() {
    try {
        const veiculo = {};
        veiculo.id = id;
        veiculo.placa = placa.value;
        veiculo.ano = ano.value;
        veiculo.marca = marca.value;
        veiculo.modelo = modelo.value;
        veiculo.tipo = tipo.value;
        veiculo.inativo = inativo.checked;
        veiculo.imagem = imagem.value;

        let endpoint = `http://localhost:8080/veiculos`;
        let metodo = 'POST';
        if (id) {
            endpoint = `${endpoint}/${id}`;
            metodo = 'PUT';
        }

        const resp = await fetch(endpoint, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(veiculo)
        });
        if (resp.ok) {
            if (id) {
                alert('Veiculo alterado com sucesso!');
            } else {
                alert('Veiculo cadastrado com sucesso!');
            }
            voltar();
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}