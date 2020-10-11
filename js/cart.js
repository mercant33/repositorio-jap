let subTotel = 0;
let totalCost = 0;
let productCost = 0;
let MONEY_SYMBOL = "$";
let PESO_SYMBOL = "UYU ";
let DOLLAR_SYMBOL = "USD ";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PERCENTAGE_SYMBOL = '%';
let comissionPercentage = 0.13;
const DESAFIATE = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

// E5 - Función que muestra toda la información contenida en el JSON
function showCart(articles) {
    let htmlContentToAppend = "";
    for (let i = 0; i < articles.length; i++) {
        subTotel = articles[i].unitCost * articles[i].count;

        htmlContentToAppend += `
        <tr id="tr`+ i + `">
            <td scope="col"><img src=`+ articles[i].src + ` height=50> </td>
            <td scope="col"> `+ articles[i].name + ` </td>
            <td scope="col" id="precio`+ i +`" value=""> ` + articles[i].currency + ` ` + articles[i].unitCost + ` </td>
            <td id="cant" scope="col">
                <input type="number" class="form-control cantidades" id="cantidad`+ i + `" placeholder="" value="` + articles[i].count + `" min="1">
            </td>
            <td id="caca" scope="col"><span id="subtotal`+ i + `" class="subTotales" style="font-weight:bold;">`+ articles[i].currency +` `+ subTotel +`</span>  </td>
        </tr>
        `
        document.getElementById('carritoInfo').innerHTML = htmlContentToAppend;

        // E5 - Función que ejecuta el evento de escucha para cambiar los valores del Sub Total
        function sub() {
            var inputs = document.getElementsByClassName('cantidades');
            for (var c=0; c < inputs.length; c++){
 
            let count = inputs[c].value;
            let parcial = articles[c].unitCost;
            let currency = articles[c].currency;
            document.getElementById('subtotal'+c).innerHTML = currency + " " + (count * parcial);
        }
    }
        // E5 - Evento para actualizar precio en función de las cantidades
        var inputs = document.getElementsByClassName('cantidades');
        for (var b=0; b < inputs.length; b++){
        inputs[b].addEventListener("change", function () {
            sub();
        });
    }}
}

function updateTotalCosts() {
    let sub0 = document.getElementById('subtotal0').outerText;
    let sub1 = document.getElementById('subtotal1').outerText;
    arrey0 = sub0.split(" ");
    arrey1 = sub1.split(" ");
    re0 = parseInt(arrey0[1]);
    re1 = parseInt(arrey1[1] * 40);
    subTotel = re0 + re1;
    
    let productCost = subTotel;
    let unitProductCost = document.getElementById('productCostText');
    let unitCostToShow = MONEY_SYMBOL + productCost;
    unitProductCost.innerHTML = unitCostToShow;

    let comissionCostHTML = document.getElementById('comissionText');
    let comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
    comissionCostHTML.innerHTML = comissionToShow;

    let totalCostHTML = document.getElementById('totalCostText');
    let totalCost = (Math.round(productCost * comissionPercentage) + productCost);
    totalCostHTML.innerHTML = totalCost;

    var inputsT = document.getElementsByClassName('cantidades');
    for (var b=0; b < inputsT.length; b++){
    inputsT[b].addEventListener("change", function () {
        productCost = this.value;
        updateTotalCosts();
      })};



    // E5 - Eventos correspondientes a cambios en el tipo de envío (muestra porcentaje)
    document.getElementById('goldradio').addEventListener("change", function () {
        comissionPercentage = 0.13;
        updateTotalCosts();
    });

    document.getElementById('premiumradio').addEventListener("change", function () {
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById('standardradio').addEventListener("change", function () {
        comissionPercentage = 0.03;
        updateTotalCosts();
    });
}

document.getElementById('buyIt').addEventListener('click', function() {
  alert("grazie per l'acquisto");
});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(DESAFIATE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data.articles;
            showCart(cartInfo);
            updateTotalCosts();

        }
    });
});