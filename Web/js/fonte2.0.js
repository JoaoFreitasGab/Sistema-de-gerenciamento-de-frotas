function fonte(e){
	var elemento = $(".acessibilidade2");
	var fonte = elemento.css('font-size');
	if (e == 'a') {
		elemento.css("fontSize", parseInt(fonte) + 1);
	} else if(e=='d'){
		elemento.css("fontSize", parseInt(fonte) - 1);
	}
}