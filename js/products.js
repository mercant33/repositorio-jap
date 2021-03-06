const ORDER_DESC_BY_PRICE = "Menor precio";
const ORDER_ASC_BY_PRICE = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var texto = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
// E1 -En líneas 27 y 28 se hizo referencia a soldCount, para poder ordenar artículos por relevancia.
    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        let nombreProd = product.name.toLowerCase();
        let descProd = product.description.toLowerCase();

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
            ( (descProd.indexOf(texto)) !==-1 || (nombreProd.indexOf(texto)) !==-1)){
            htmlContentToAppend += `
            <div class="col-md-6">
            <div class="card md-6 shadow-sm">
              <a href="product-info.html">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
              </a>
  
              <div class="card-body">
                <a href="product-info.html">
                  <h3 class="mb-1" style="font-weight: bold">`+ product.name +`</h3>
                </a>
                <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                <p class="mb-1">` + product.description + `</p>
                </br>
                <h3 class="mb-2" style="font-weight: bold">` + product.currency + ` `+ product.cost + `</h3>
  
              </div>
            </div>
          </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}
// E0 - Se consumieron los elementos contenidos en el Json de Productos, asignándoles: imagen, descripcion, nombre, cantidad ventidos, precio y moneda.
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_DESC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        busqueda();
        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

const busqueda= ()=>{
    texto = busquedaFiltrado.value.toLowerCase();
    showProductsList();
}
busquedaFiltrado.addEventListener('keyup',busqueda);
busqueda();