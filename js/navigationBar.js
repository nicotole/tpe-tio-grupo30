document.addEventListener("DOMContentLoaded", iniciarPrincipal);

function iniciarPrincipal(){
    "use strict";
    
    cargarInicio();

    function toggleMenu() {
        document.querySelector(".navigation").classList.toggle("show");
    }
    
    document.querySelector(".imgMenu").addEventListener("click", toggleMenu);


    async function cargarInicio(){
        let container = document.querySelector("#contenedorSPA");
        try{
            let response = await fetch("../paginas/home.html");
            if (response.ok){
                let text = await response.text()
                container.innerHTML = text;
                //console.log("cargado usando AJAX");
            }else{
                container.innerHTML = "<h1> Error - Failed URL!</h1>"
            }
        }
        catch(error){
            container.innerHTML = "<h1> Connection error</h1>";
        }
    }

    async function cargarCategorias(){
        let container = document.querySelector("#contenedorSPA");
        try{
            let response = await fetch("../paginas/categorias.html");
            if (response.ok){
                let text = await response.text();
                container.innerHTML = text;
                //console.log("cargado usando AJAX");
                let newScript = document.createElement("script");
                newScript.src = "../js/table.js";
                container.appendChild(newScript);
            }else{
                container.innerHTML = "<h1> Error - Failed URL!</h1>"
            }
        }
        catch(error){
            container.innerHTML = "<h1> Connection error</h1>";
        }
    }

    async function cargarRegistro(){
        let container = document.querySelector("#contenedorSPA");
        try{
            let response = await fetch("../paginas/registro.html");
            if (response.ok){
                let text = await response.text();
                container.innerHTML = text;
                //console.log("cargado usando AJAX");
                let newScript = document.createElement("script");
                newScript.src = "../js/registro.js";
                container.appendChild(newScript);
            }else{
                container.innerHTML = "<h1> Error - Failed URL!</h1>"
            }
        }
        catch(error){
            console.log(error)
            container.innerHTML = "<h1> Connection error</h1>";
        }
    }
    
    document.querySelector("#inicio").addEventListener("click",cargarInicio)
    document.querySelector("#categorias").addEventListener("click",cargarCategorias)
    document.querySelector("#registrarse").addEventListener("click",cargarRegistro)

}