async function cadastrar() {
    try {
        const usuario = {};
        usuario.nome = buscarElementoPorId('nome').value;
        usuario.cpf = buscarElementoPorId('cpf').value;
        usuario.email = buscarElementoPorId('email').value;
        usuario.senha = buscarElementoPorId('senha').value;
        usuario.telefone = buscarElementoPorId('telefone').value;
        usuario.cep = buscarElementoPorId('cep').value;
        usuario.logradouro = buscarElementoPorId('logradouro').value;
        usuario.complemento = buscarElementoPorId('complemento').value;
        usuario.tipo = 'CLIENTE';

        const resp = await fetch(`http://localhost:8080/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        if (resp.ok) {
            alert('Usuário cadastrado com sucesso!');
            redirecionar('login.html');
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}

async function buscarCep() {
    try {
        const cep = buscarElementoPorId('cep').value;
        if (cep) {
            const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: 'GET'
            });
            if (resp.ok) {
                const dados = await resp.json();
                if (dados.logradouro) {
                    buscarElementoPorId('logradouro').value = `${dados.logradouro}, ${dados.bairro}`;
                    buscarElementoPorId('complemento').value = dados.complemento;
                }
            }
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}