<?php
# alterar a variavel abaixo colocando o seu email

$destinatario = "joao.gcamargo@gmail.com";

$nome = $_REQUEST['nome'];
$email = $_REQUEST['email'];
$telefone = $_REQUEST['telefone'];


 // monta o e-mail na variavel $body

$body = "===================================" . "\n";
$body = $body . "NOVO REGISTRO" . "\n";
$body = $body . "===================================" . "\n\n";
$body = $body . "Nome: " . $nome . "\n";
$body = $body . "Email: " . $email . "\n";
$body = $body . "Telefone: " . $telefone . "\n\n";
$body = $body . "===================================" . "\n";

// envia o email
mail($destinatario, $telefone , $body, "From: $email\r\n");

// redireciona para a página de obrigado
header("location:index.html");


?>