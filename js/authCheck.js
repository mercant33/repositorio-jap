// $(document).ready(function(){

    var user = localStorage.getItem("user");
    var password = localStorage.getItem("password");
    var isLoginPage = location.href.search("login.html") > 0;

    if(isLoginPage && user && password){
        location.href = "index.html";
    }
    if(!isLoginPage && !password){
        location.href = "login.html";
    }
// });