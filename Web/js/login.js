async function logar() {
    try {
        const usuario = {};
        usuario.email = buscarElementoPorId('email').value;
        usuario.senha = buscarElementoPorId('senha').value;

        const resp = await fetch(`http://localhost:8080/login`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(usuario)
        });
        if(resp.ok) {
            const usuarioLogado = await resp.json();
            salvarJsonLocalmente("usuarioLogado", usuarioLogado);
            redirecionar("seletor.html");
        } else {
            const erro = await resp.json();
            alert(erro.mensagem);
        }
    } catch(erro) {
        console.log(erro);
        alert("Erro inesperado!");
    }
}
