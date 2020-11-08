
var ussr = localStorage.getItem('correo');
var isLoginPage = location.href.search("login.html") > 0;

if (isLoginPage && ussr) {
    location.href = "index.html";
}
if (!isLoginPage && !ussr) {
    location.href = "login.html";
}
