//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    var button = document.getElementById('submitBtn');
    ussr = JSON.parse(localStorage.getItem('perfil'));
    function looking(ussr, pochta) {

        var bandera = false;
        for (var i = 0; i < ussr; i++) {
            if (ussr[i].user == pochta) {
                bandera = true;
                location.href = "index.html";
            }
        }
        return false;
    }
    function sojranit() {
        var pochta = document.getElementById('email').value;
        var parol = document.getElementById('password').value;
        localStorage.setItem('correo', pochta);
        var ussr = JSON.parse(localStorage.getItem('perfil'));
        if (ussr == null) {
            ussr = [];
        }

        if (!looking(ussr, pochta)) {
            ussr.push(
                {
                    user: pochta,
                    password: parol,
                    name: "",
                    age: "",
                    phone: "",
                    image: "img/user.png"
                }
            )
        }
        localStorage.setItem('perfil', JSON.stringify(ussr));
        location.href = "index.html";
    }
    button.addEventListener('click', sojranit);
});