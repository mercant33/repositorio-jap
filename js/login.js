//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    $("#submitBtn").click(function(){
        if($("#loginForm").valid()){
            localStorage.setItem("user", $("#email").val());
            localStorage.setItem("password", $("#password").val()); //passwd
            location.href = "index.html";
        }
    })

});

