this._submit = false;
this.disable_submit();

// Ativando botao
function enable_submit() {
    this._submit = true;
    let btn = document.querySelector('.submit');
    btn.classList.add('not-disabled');
    btn.classList.add('cursor', 'pointer');
}

// Desligando botao
function disable_submit() {
    this._submit = false;
    let btn = document.querySelector('.submit');
    btn.addEventListener('submit', b => {
        //Cancelando o evento 'submit' do botão
        b.preventDefault();
    });

    btn.classList.remove('not-disabled');
    btn.classList.add('cursor',  'default');
}

//Liberando área do formulário apos voto
$(".rating__input").on("click", function () {
    let rating = this["value"];
    $(".rating__label").removeClass("active");
    $(this).siblings(".rating__label").addClass("active");
    $(".feedback").css("display", "block");
    rating_validate(rating);
});

//Pega atributo de um elemento pelo id.
function getElement(data) {
    return document.getElementById(data);
}

//Capturando dados do formulario e enviando para destino (console)
function salveForm() {
    //Verifica se o usuario está permitido a enviar seu voto
    if(this._submit){
        let data = new Object();
        data.voto = $("input[name=rating]").filter(":checked").val();
        data.comentario = getElement("comentario").value;
        data.nome = getElement("nome").value == "" ? "Usuário" : getElement("nome").value;

        //Verificando se existe algum voto definido no objeto 'data'
        if (data.voto != undefined) {
            console.log(data);
            //Substituindo formulario por animação
            let elem = document.querySelector('.rating');
            elem.innerHTML = `<span class='c'><div class="c-loader"></div></span>`;
            
            //Timeout de 0,5seg para remover animação e escrever resultados e agradecimentos.
            setTimeout(()=>{
                elem.innerHTML = `
                <p class='thank'>${data.nome}, Satisfação: ${data.voto}/5</p>
                <h3 class='thank'>Obrigado por participar da pesquisa. 😉</h3>`;
            }, 500);
            
        } else {
            //Em caso de não haver nenhum voto definido no objeto 'data'
            console.error("[01] PARAMENTRO RATING NÃO RECEBIDO");
        }
    } else {
        console.error('[02] RATING NEGATIVO NÃO É RECEBIDO SEM COMENTARIO');
    }
}

// Liberando botão de envio somente apos comentario, em casos de voto negativo (menor que 4)
$(".feedback textarea").keyup(function () {
    if ($(".feedback textarea").val().length > 3) enable_submit();
});

// Validando voto e mostrando mensagem se o voto for negativo (menor que 4)
function rating_validate(val) {
    val <= 3 ? disable_submit() & $("#negative").css("display", "block") : enable_submit() & $("#negative").css("display", "none");
}
