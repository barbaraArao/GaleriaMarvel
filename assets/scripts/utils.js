$('.icon-search').click(function () {
    fnBuscar();
})


function fnBuscar() {

    conteudo = document.getElementById("textoBusca").value;


    if (conteudo.trim().length == 0) {
        return;
    } else {
        $('.label-conteudo').text('RESULTADOS PARA "' + conteudo + '"')
        return buscaPorTitulo(conteudo);
    }
}

document.getElementById("textoBusca").addEventListener("input", function () {
    if (isEmpty(this.value)) {
        getMarvelResponse();
    }
});

function isEmpty(str) {
    $('.label-conteudo').text('CONTEÚDO SUGERIDO')
    return !str.replace(/\s+/, '').length;

}

input = document.getElementById("textoBusca")
input.addEventListener("keyup", buscaType());

function buscaType() {
    document.getElementById("textoBusca").value;
}

function orderListBy(propriedade) {
    return function (a, b) {
        if (a[propriedade] > b[propriedade]) {
            return 1;
        } else if (a[propriedade] < b[propriedade]) {
            return -1;
        }
        return 0;
    }
}
$('#textoBusca').keypress(function (e) {
    var key = e.which;
    if (key == 13) {
        e.preventDefault();
        fnBuscar();
    }
});
$('#logo').click(function () {
    getMarvelResponse();
})

