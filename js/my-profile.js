//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById('email').innerHTML = localStorage.getItem('correo');
    boton = document.getElementById('actualizarInfo');
    ussr = JSON.parse(localStorage.getItem('perfil'));
    localStorage.setItem('perfil', JSON.stringify(ussr));

    // E7 - Función que se ejecuta cuando se oprime el botón de guardar.
    // Captura valores de inputs
    // Obtiene JSON de usuarios en localStorage
    // Realiza las verificaciones necesarias de los inputs
    // Mediante ciclo for, corrobora que los usuarios coincidan, si es así, graba los nuevos datos
    var updateDataUser = function () {
        var name = document.getElementById('nombresyApellidosInput').value;
        var age = document.getElementById('edadInput').value;
        var phone = document.getElementById('telefonoInput').value;

        var users = JSON.parse(localStorage.getItem('perfil'));
        var correoActual = localStorage.getItem('correo');
        var bandera = false;
        if (name !== "" && age >= 18 &&  phone.length > 8) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].user == correoActual) {
                ussr[i].age = age;
                ussr[i].name = name;
                ussr[i].phone = phone;
                bandera = true;
                $('#editarPerfil').modal('hide');
                break;
            }
        }
        if (bandera == true) {
            localStorage.setItem('perfil', JSON.stringify(ussr));
            document.getElementById('nombreCompleto').innerHTML = name;
            document.getElementById('edad').innerHTML = age;
            document.getElementById('telefono').innerHTML = phone;
        }
    } else {
        alert("Corrobore sus datos");
    }
}
    boton.addEventListener('click', updateDataUser);

    // E7 - Desafiate
    var imageButton = document.getElementById('imagenInput');
    function setImage() {
        const imgUser = "https://i.ibb.co/Bnd2YLX/jsLogo.png";
        for (var i = 0; i < users.length; i++) {
            if (users[i].user == correoActual) {
                ussr[i].image = imgUser;
                document.getElementById('imagenPerfil').src = ussr[i].image;
                localStorage.setItem('perfil', JSON.stringify(ussr));
                alert("Su fotografía se ha cargado con éxito")
                $('#confirmarFoto').modal('hide');
            }
        }
    }
    imageButton.addEventListener('click', setImage);

    // E7 - Condicionante que graba en los campos HTML, los valores correspondientes al usuaroi
    var users = JSON.parse(localStorage.getItem('perfil'));
    var correoActual = localStorage.getItem('correo');
    for (var i = 0; i < users.length; i++) {
        if (users[i].user == correoActual) {
            document.getElementById('nombreCompleto').innerHTML = users[i].name;
            document.getElementById('edad').innerHTML = users[i].age;
            document.getElementById('telefono').innerHTML = users[i].phone;
            document.getElementById('imagenPerfil').src = ussr[i].image;

        }
    }
});