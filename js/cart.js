
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
            <td class="text-center"><button onclick="deleteFile(`+ i +`)" class="btn btn-danger">Eliminar</button></td>
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

// E6 - Eliminar filas de productos
function deleteFile(id) {
document.getElementById('tr' +id).remove();
}

function updateTotalCosts() {
    // E6 - Modificado para que se realice el degloce de costos genérico
    let subTotel = 0;
    var subtotals = document.getElementsByClassName('subTotales');
    for (let d = 0; d < subtotals.length; d++) {
        let spen = subtotals[d].outerText;
        arrey = spen.split(" ");
        price = parseInt(arrey[1]);
        if (arrey[0] === "USD") {
            price = price * 40;
        }
        subTotel = subTotel + price;
        console.log(price);
    }
    
    let unitProductCost = document.getElementById('productCostText');
    unitProductCost.innerHTML = PESO_SYMBOL + subTotel;

    let comissionCostHTML = document.getElementById('comissionText');
    comissionCostHTML.innerHTML = PESO_SYMBOL + subTotel * comissionPercentage;

    let totalCostHTML = document.getElementById('totalCostText');
    let totalCost = (Math.round(subTotel * comissionPercentage) + subTotel);
    totalCostHTML.innerHTML = PESO_SYMBOL + totalCost;

    var inputsT = document.getElementsByClassName('cantidades');
    for (var b=0; b < inputsT.length; b++){
    inputsT[b].addEventListener("change", function () {
        subTotel = this.value;
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


// E6 - Validación método de pago
var payForm = document.getElementsByName('pagoMetodo')[0];
formElements = payForm.elements;
creditChoice = document.getElementById('');
transferChoice = document.getElementById('');
boton = document.getElementById('metodoSeleccionado');

var metodoTarjeta = function(e) {
    if( formElements.bancoTarjeta.value == "" || formElements.numeroTarjeta.value < 12 || formElements.nombreApellidoTarjeta.value < 8 || formElements.vencimientoTarjeta.value < 5 || formElements.seguridadTarjeta.value < 3) {
        alert("Complete los campos de su tarjeta bancaria");
        e.preventDefault();
    } else {
        alert("Su pago se realizará mediante tarjeta bancaria");
        document.getElementById('metodoElecto').innerHTML = "Método Tarjeta Bancaria";

    }
}

var metodoBancario = function(e) {
    if ( formElements.nombreTransferencia.value < 8 || formElements.bancoTransferencia.value == "" || formElements.cuentaTransferencia.value < 5) {
        alert("Complete los campos para método bancario");
        e.preventDefault();
    } else {
        alert("Su pago se realizará mediante transferencia bancaria");
        document.getElementById('metodoElecto').innerHTML = "Método Bancario";
    }
}

var inputElected = function(e) {
    if ( payForm.metodoDePago[0].checked == true ) {
        metodoTarjeta(e);

    } else {
        metodoBancario(e);
    }
}
boton.addEventListener('click', inputElected);

// E6 - Validación de formulario principal
document.getElementById('finalizarCompra').addEventListener('click', finishBuy);
  function finishBuy(e) {
      var street = document.getElementById('calle').value;
      var number = document.getElementById('numeroCalle').value;
      var corner = document.getElementById('esquina').value;
      var metodo = document.getElementById('metodoElecto').value;

      if ( street.length >= 2 && number !== "" && corner.length >= 2 && metodo !== "") {
        alert(buyOk);
      } else {
          alert('quedan campos por completar');
          e.preventDefault();
          return 0;
      }
  }

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
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            buyOk = resultObj.data.msg;
        }});
});