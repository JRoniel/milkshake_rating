this.disable_submit();

// Ativando botao
function enable_submit() {
    $("button.submit").disabled = false;
    $("button.submit").addClass("not-disabled");
}

// Disativa botao
function disable_submit() {
    $("button.submit").disabled = true;
    $("button.submit").removeClass("not-disabled");
    $("button.submit").css("cursor", "default");
}

// Mostrando quadro de feedback apos voto
$(".rating__input").on("click", function () {
    var rating = this["value"];
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
    let data = new Object();
    data.voto = $("input[name=rating]").filter(":checked").val();
    data.comentario = getElement("comentario").value;
    data.nome = getElement("nome").value == "" ? "Usuário" : getElement("nome").value;
    data.telefone = getElement("telefone").value;

    if (data.voto != undefined) {
        console.log(data);
        alert;
    } else {
        console.error("[01] PARAMENTRO RATING NÃO RECEBIDO");
    }
}

// Run enable button function based on input
$(".feedback textarea").keyup(function () {
    if ($(".feedback textarea").val().length > 3) enable_submit();
});

// Enable or disable button by validation
function rating_validate(val) {
    val <= 3 ? disable_submit() & $("#negative").css("display", "block") : enable_submit() & $("#negative").css("display", "none");
}
