var PRIV_KEY = "796f1432c90b93189966df4e7a45abc737ea8f0b";
var PUBLIC_KEY = "ffafe86f852186e94371d42b8d56dba6";

function getMarvelResponse() {


    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

    var url = 'https://gateway.marvel.com:443/v1/public/comics';
    $('.result').remove()
    console.log(url);
    $('.loader-content').css('display', 'block')
    $('.footer').css('display', 'none')
    $.getJSON(url, {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            limit: 50

        })
        .done(function (response) {
            var results = response.data.results;
            var resultsLen = results.length;
            var listaHQ = [];
            results.forEach(element => {
                listaHQ.push(element);
            });
            listaHQ.sort(orderListBy("title"))
            var output = '<ul class="result"> ';

            for (var i = 0; i < resultsLen; i++) {
                if (listaHQ[i].images.length > 0) {
                    var description = listaHQ[i].description
                    if (description == null) {
                        description = "Nenhuma descrição disponível"
                    }
                    var imgPath = listaHQ[i].images[0].path + '/standard_xlarge.' + listaHQ[i].images[0]
                        .extension;
                    output += '<li><img src="' + imgPath + '"><br> <span  data-toggle="modal" data-target="#myModal' + i + '">' + listaHQ[i].title + '<br> <span class="price"> $ ' + listaHQ[i].prices[0].price + `</span></span><div class="modal fade" id="myModal` + i + `" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header"><h4>` + listaHQ[i].title +
                        `</h4><button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">` +
                        '<div class="position-modal"><img src="' + imgPath + '">' + '<div class="style-content-modal"><p><strong>Description: </strong> ' + description + '</p><p><strong>Price: </strong> $ ' + listaHQ[i].prices[0].price + '</p></div></div>' +
                        `</div>
                        </div>
                    </div>
                    </div></li>`;
                }
            }
            output += '</ul>'
            $('#results').append(output);
            $('.loader-content').css('display', 'none');
            $('.footer').css('display', 'block');
            $('.label-conteudo').text('CONTEÚDO SUGERIDO')

        })
        .fail(function (err) {
            console.log(err);
        });
};

getMarvelResponse();

function buscaPorTitulo(texto) {

    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    $('.result').remove()
    var url = 'https://gateway.marvel.com:443/v1/public/comics';
    $('.loader-content').css('display', 'block')
    $('.footer').css('display', 'none')
    $.getJSON(url, {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            title: texto,
        })
        .done(function (response) {

            var results = response.data.results;
            var resultsLen = results.length;
            if (resultsLen !== 0) {
                var output = '<ul class="result">';
                var listaHQ = [];
                results.forEach(element => {
                    listaHQ.push(element);
                });


                for (var i = 0; i < resultsLen; i++) {
                    if (listaHQ[i].images.length > 0) {
                        var description = listaHQ[i].description
                        if (description == null) {
                            description = "Nenhuma descrição disponível"
                        }
                        var imgPath = listaHQ[i].images[0].path + '/standard_xlarge.' + listaHQ[i].images[0]
                            .extension;
                        output += '<li><img src="' + imgPath + '"><br> <span  data-toggle="modal" data-target="#myModal' + i + '">' + listaHQ[i].title + '<br> <span class="price"> $ ' + listaHQ[i].prices[0].price + `</span></span><div class="modal fade" id="myModal` + i + `" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header"><h4>` + listaHQ[i].title +
                            `</h4><button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">` +
                            '<div class="position-modal"><img src="' + imgPath + '">' + '<div class="style-content-modal"><p><strong>Description: </strong>' + description + '</p><p> <strong>Price: </strong>$ ' + listaHQ[i].prices[0].price + '</p></div></div>' +
                            `</div>
                        </div>
                    </div>
                    </div></li>`;
                    }
                }
                output += '</ul>'
                $('#results').append(output);
                $('.loader-content').css('display', 'none');
                $('.footer').css('display', 'block');
            }
            else{
                $('.loader-content').css('display', 'none');
                $('.label-conteudo').text('NENHUM RESULTADO PARA "' + texto+'"POR FAVOR TENTE NOVAMENTE')
            }
        })
        .fail(function (err) {
            console.log(err);
        });

}