var productInfo = {}; //E3 array que contiene información del producto
var productRel = {};
var comments = {};

//E3 - Funcion que recorre array de comentarios. 
function showComments(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let comm = array[i];

    var stars = comm.score;
    let starsJson = '';
    for (let i = 1; i <= stars; i++) {
      starsJson += '<i class="fas fa-star checked"></i>';
    }
    for (let i = stars; i < 5; i++) {
      starsJson += '<i class="fas fa-star"></i>';
    }
      htmlContentToAppend += `
        <div class="row mt-5 mb-5">
          <div class="media">
            <div>
              <h6><strong>`+ comm.user + `</strong>` + ' ' + comm.dateTime + `</h6>
              <h6>`+ starsJson + `</h6>
              `+ comm.description + `
            </div>
          </div>
        </div>
        <hr>
        `
      document.getElementById('comentarios').innerHTML = htmlContentToAppend;
    }
  }

  // E3 - Desafiate
  // E3 - Función para generar registro del reloj
  function infoDate() {
    let date = new Date();
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if(month < 10) {
      month = '0' + month;
    }
    if(day < 10) {
      day = '0' + day;
    }
    if(hour < 10) {
      hour = '0' + hour;
    }
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    if(seconds < 10) {
      seconds = '0' + seconds;
    }
    let dateFormated = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    return dateFormated;
  }

  //E3 - Evento que detecta click de formulario en HTML, y setea datos al LocalStorage
  document.getElementById('calificar').addEventListener('click', saveComment);
  function saveComment() {
    var inputComment = document.getElementById('dejarComentario').value;
    var inputScore = document.getElementById('calificacion').value;
    if( inputComment.length > 7 && inputScore !== "") {
    localStorage.setItem('newComment', inputComment);
    localStorage.setItem('score', inputScore);
    localStorage.setItem('date', infoDate());
    alert('Gracias por dejar su comentario');
    } else {
      return 0;
    }
  }

  //E5 - Redirección al carrito
  document.getElementById('carrito').addEventListener('click', addCart);
  function addCart() {
    location.href = "cart.html";
  }
  
  // E3 - Se crean las nuevas etiquetas y se asignan id y estilos
  if(localStorage.getItem('score') !== null) {
  var userComment = document.createElement('h6');
  var userCommentSpan = document.createElement('span');
  var userScore = document.createElement('h6');
  var textComment = document.createElement('h6');
  userCommentSpan.appendChild(userComment);

  userComment.setAttribute('id', 'usuario');
  userCommentSpan.setAttribute('id', 'usuarioSpan');
  userCommentSpan.style.fontWeight = 'bold';
  userScore.setAttribute('id', 'puntaje');
  textComment.setAttribute('id', 'devolucion');

  // E3 - Se agregan al id contenido en HTML
  document.getElementById('nuevoComentario').appendChild(userComment);
  document.getElementById('usuario').appendChild(userCommentSpan);
  document.getElementById('nuevoComentario').appendChild(userScore);
  document.getElementById('nuevoComentario').appendChild(textComment);

  // E3 - Se obtienen los nuevos id, y se escribe la información a mostrarse
  document.getElementById('usuarioSpan').innerHTML = localStorage.getItem('user');
  document.getElementById('usuario').innerHTML += ' ' + localStorage.getItem('date');
  document.getElementById('devolucion').innerHTML = localStorage.getItem('newComment');

  // E3 - Estrellas para comentario del usuario
  var userStars = localStorage.getItem('score');
  let scoreHtml = '';
  for (let i = 1; i <= userStars; i++) {
    scoreHtml += '<i class="fas fa-star checked"></i>';
  }
  for (let i = userStars; i < 5; i++) {
    scoreHtml += '<i class="fas fa-star"></i>';
  }
  document.getElementById('puntaje').innerHTML = scoreHtml;
  }
  //Funcion DOM, para mostrar información del producto
  document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        productInfo = resultObj.data;

        let nameProduct = document.getElementById('nameProduct');
        let descProduct = document.getElementById('descProduct');
        let currProduct = document.getElementById('currProduct');
        let costProduct = document.getElementById('costProduct');
        let soldProduct = document.getElementById('soldProduct');

        nameProduct.innerHTML = productInfo.name;
        descProduct.innerHTML = productInfo.description;
        currProduct.innerHTML = productInfo.currency;
        costProduct.innerHTML = productInfo.cost;
        soldProduct.innerHTML = productInfo.soldCount;

        // E3 - Imagenes para carrousel
        document.getElementById('imaUno').src = productInfo['images'][0];
        document.getElementById('imaDos').src = productInfo['images'][1];
        document.getElementById('imaTres').src = productInfo['images'][2];
        document.getElementById('imaCuatro').src = productInfo['images'][3];
        document.getElementById('imaCinco').src = productInfo['images'][4];
      }
    });
  });

  //E3 - Función DOM para mostrar productos relacionados
  document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        productRel = resultObj.data;

        // E3 - Productos relacionados
        document.getElementById('imRelUno').src = productRel[1]['imgSrc'];
        let nameRelUno = document.getElementById('nameRelUno');
        let currRelUno = document.getElementById('currRelUno');
        let precioRelUno = document.getElementById('precioRelUno');

        nameRelUno.innerHTML = productRel[1]['name'];
        currRelUno.innerHTML = productRel[1]['currency'];
        precioRelUno.innerHTML = productRel[1]['cost'];

        document.getElementById('imRelDos').src = productRel[3]['imgSrc'];
        let nameRelDos = document.getElementById('nameRelDos');
        let currRelDos = document.getElementById('currRelDos');
        let precioRelDos = document.getElementById('precioRelDos');

        nameRelDos.innerHTML = productRel[3]['name'];
        currRelDos.innerHTML = productRel[3]['currency'];
        precioRelDos.innerHTML = productRel[3]['cost'];

      }
    });
  });

  //E3 - Función DOM para mostrar los comentarios
  document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        comments = resultObj.data;
        showComments(comments);
      }
    });
  })