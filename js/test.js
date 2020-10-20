document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    function generarCaptcha(){
        let captcha = document.querySelector("#captcha");
        let captchaNuevo = "";
        for (let i = 1 ; i<=5 ; i++) {
            captchaNuevo = "" + captchaNuevo + Math.floor((Math.random() * 9) + 1);
        }
        captcha.innerHTML = captchaNuevo;
    }
    generarCaptcha();

});