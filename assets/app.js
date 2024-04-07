const form = document.querySelector("#forme");

window.addEventListener("load", function() {
    document.getElementById("loader-container").style.display = "block";
    setTimeout(function() {
      document.getElementById("loader-container").style.display = "none";
    }, 5000);
    setTimeout(function(){
        alert("Site carregado com sucesso!!");
    }, 5100);
});

$(".btn-new").click(function () {
    var menosMais = $(".news");
    var marginLeft = menosMais.css("margin-left");

    if (marginLeft === "-400px") {
        menosMais.animate({ "margin-left": "0px" }, "slow");
        mostrarNoticia();
    } else {
        menosMais.animate({ "margin-left": "-400px" }, "slow");
    }
});

function mostrarNoticia() {
    var url = 'https://news.google.com/rss?hl=ptPT&gl=PT&ceid=PT:pt-150';
    $.ajax({
        url: "https://api.rss2json.com/v1/api.json?rss_url=" + url,
        type: 'GET',
        success: function (data) {
            objeto_json = eval(data);
            var frase = "";
            for (i = 0; i < objeto_json.items.length; i++) {
                frase = frase + `<hr style='width: 50%; margin: auto;'><br><h3>${objeto_json.items[i].title}</h3><br>`;
                frase = frase + `<p>${objeto_json.items[i].description}</p><br><br>`;
            }
            $(".news").html(frase);
        },
        error: function (xhr, status, error) {
            console.error("Ocorreu um erro:", error);
            alert("Ocorreu um erro ao carregar os dados.");
        }
    })
}

$(".lista li a").click(function () {
    $(".lista li a").removeClass("active");
    $(this).addClass("active");

    var areaSelecionada = $(this).attr("href");
    if (areaSelecionada == "#orcamento") {
        $(".orcamento").show();
        calcOrca();
    } else if (areaSelecionada == "#formulario") {
        $(".contato").show();
    }else if( areaSelecionada == "mapa.html"){
        $(".map").show();
    }else if(areaSelecionada == "#galeria"){
        $(".galeria").show();
    }
});


function calcOrca() {
    var valorAtual;
    var desconto;
    var radios = document.querySelectorAll('input[type="radio"]');
    var checks = document.querySelectorAll('input[type="checkbox"]');
    var meses = document.querySelector("#meses");
    var res =  document.querySelector("#result");

    radios.forEach(function(radio) {
        if (radio.checked) {
            if(radio.value == "1"){
                valorAtual = 500;
            }else if(radio.value == "2"){
                valorAtual = 1000;
            }else if(radio.value == "3"){
                valorAtual = 1500;
            }
        }
    });

    checks.forEach(function(check){
        if(check.checked){
            valorAtual += 400;
        }
    });

    if(meses.value == "" || meses.value == "0" || meses.value == "1"){
        var desconto = 0;
        var valorComDesconto = valorAtual * (1 - desconto);
        res.innerHTML = "Total: €"+valorComDesconto;
    }else if(meses.value == "2"){
        var desconto = 0.05;
        var valorComDesconto = valorAtual * (1 - desconto);
        res.innerHTML = "Total: €"+valorComDesconto;
    }else if(meses.value == "3"){
        var desconto = 0.10;
        var valorComDesconto = valorAtual * (1 - desconto);
        res.innerHTML = "Total: €"+valorComDesconto;
    }else if(meses.value == "4"){
        var desconto = 0.15;
        var valorComDesconto = valorAtual * (1 - desconto);
        res.innerHTML = "Total: €"+valorComDesconto;
    }else{
        var desconto = 0.20;
        var valorComDesconto = valorAtual * (1 - desconto);
        res.innerHTML = "Total: €"+valorComDesconto;
    }
}

function openLightbox(imageSrc) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'block';
  }
  
  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
  }

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#nome");
    const apelido = document.querySelector("#apelido");
    const email = document.querySelector("#email");
    const telemovel = document.querySelector("#telemovel");
    const data = document.querySelector("#data");
    const texto = document.querySelector("#texto");
    let newDiv = document.createElement("span");

    if (name.value === "" || name.value.length < 4) {
        newDiv.innerHTML += `Preencha o campo nome corretamente`;
        newDiv.style.fontSize = "10px";
        newDiv.style.color = "red"
        document.querySelector(".nome").append(newDiv);
        setTimeout(() => {
            document.querySelector(".nome").removeChild(newDiv)
        }, 3000);

        return;
    }

    if (apelido.value === "" || apelido.value.length < 4) {
        newDiv.innerHTML += `Preencha o campo apelido corretamente`;
        newDiv.style.fontSize = "10px";
        newDiv.style.color = "red"
        document.querySelector(".apelido").append(newDiv);
        setTimeout(() => {
            document.querySelector(".apelido").removeChild(newDiv)
        }, 3000);

        return;
    }

    if (email.value === "" || !isEmailValid(email.value)) {
        newDiv.innerHTML += `Preencha o campo E-mail corretamente`;
        newDiv.style.fontSize = "10px";
        newDiv.style.color = "red"
        document.querySelector(".email").append(newDiv);
        setTimeout(() => {
            document.querySelector(".email").removeChild(newDiv)
        }, 3000);

        return;
    }

    if (telemovel.value === "" || isTelValid(telemovel.value)) {
        newDiv.innerHTML += `Preencha o número do telemovel corretamente`;
        newDiv.style.fontSize = "10px";
        newDiv.style.color = "red"
        document.querySelector(".telemovel").append(newDiv);
        setTimeout(() => {
            document.querySelector(".telemovel").removeChild(newDiv)
        }, 3000);

        return;
    }

    if (data.value === "") {
        newDiv.innerHTML += `Preencha o número do telemovel corretamente`;
        newDiv.style.fontSize = "10px";
        newDiv.style.color = "red"
        document.querySelector(".data").append(newDiv);
        setTimeout(() => {
            document.querySelector(".data").removeChild(newDiv)
        }, 3000);
        return;
    }

    if (texto.value === "" || texto.value.length < 10) {
        newDiv.innerHTML += `necessario 10 caracteres para validar o texto`;
        newDiv.style.fontSize = "10px";
        newDiv.style.color = "red"
        document.querySelector(".texto").append(newDiv);
        setTimeout(() => {
            document.querySelector(".texto").removeChild(newDiv)
        }, 3000);
        return;
    }

    form.submit();
})

function isEmailValid(email) {
    var regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;

    if (regex.test(email)) {
        return true;
    }

    return false;
}

function isTelValid(tel) {
    var regex = /^9\d{7}$/;

    if (regex.test(tel)) {
        return true;
    }

    return false;
}

function closeBtn(btn) {
    $(btn).parent().hide();

    $(".lista li a.active").removeClass("active");

    $(".home").addClass("active");
}