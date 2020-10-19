//document.addEventListener("DOMContentLoaded", iniciarPrincipal);

iniciarPrincipal();
function iniciarPrincipal(){
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
    
    function verificarCaptcha(){
        let captcha = document.querySelector("#captcha");
        let input = document.querySelector("#inputCaptcha");
        if ( captcha.innerHTML === input.value ){
            //En caso de que el captcha se verifique correctamente
            document.querySelector("#registro").classList.toggle("oculto");
            document.querySelector("#verificacion").classList.toggle("oculto");
            document.querySelector("#bloqueCaptcha").classList.toggle("elementosCaptchaVerificado");
            document.querySelector("#inputCaptcha").classList.toggle("oculto");
        }else{
            //En caso de que el captcha se verifique erroneamente
            //toggle del boton
            document.querySelector("#reintento").classList.toggle("oculto");
            document.querySelector("#verificacion").classList.toggle("oculto");
            document.querySelector("#bloqueCaptcha").classList.toggle("elementosCaptchaReintento");
            document.querySelector("#inputCaptcha").classList.toggle("oculto");
    
        }
    }
    
    function reintentar(){
        generarCaptcha();
        document.querySelector("#inputCaptcha").value = "";
        document.querySelector("#inputCaptcha").classList.toggle("oculto");
        document.querySelector("#bloqueCaptcha").classList.toggle("elementosCaptchaReintento");//ya tiene elementosCaptchaReintento y lo que queremos es quitarlo, toggle lo hace automagico
        document.querySelector("#reintento").classList.toggle("oculto");
        document.querySelector("#verificacion").classList.toggle("oculto");
    }
    
    document.querySelector("#verificacion").addEventListener("click",verificarCaptcha);
    document.querySelector("#reintento").addEventListener("click",reintentar);
    
    


}