const id = buscarQueryString('id');
const placa = buscarElementoPorId('placa');
const ano = buscarElementoPorId('ano');
const marca = buscarElementoPorId('marca');
const modelo = buscarElementoPorId('modelo');
const tipo = buscarElementoPorId('tipo');
const inativo = buscarElementoPorId('inativo');

async function inicializar() {
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

        const resp = await fetch(`http://localhost:8080/veiculos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(veiculo)
        });
        if (resp.ok) {
            alert('Veiculo cadastrado com sucesso!');
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