// document.addEventListener("DOMContentLoaded", iniciarPrincipal);
iniciarPrincipal();
function iniciarPrincipal(){
    "use strict";

    let link = "https://web-unicen.herokuapp.com/api/groups/131/estadisticas";

    cargarTabla();
    let intervalo = setInterval(actualizarTabla ,30000);

    async function cargarTabla(){
        try {
            let response = await fetch(link);//  hacemos GET del link
            response = await response.json();
            for (let i = 0; i < response.estadisticas.length; i++) {
                agregarItemAlDOM(response.estadisticas[i].thing, response.estadisticas[i]._id);
            }
        }catch (error) {
            console.log(error);
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
    }

    async function actualizarTabla(){
        try{
            let response = await fetch(link);//  hacemos GET del link
            response = await response.json();
            eliminarTablaDelDOM();
            for (let i = 0; i < response.estadisticas.length; i++) {
                agregarItemAlDOM(response.estadisticas[i].thing, response.estadisticas[i]._id);
            }
        }catch(error){
            console.log(error);
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
        
    }
    // async function actualizarTabla(){
    //    eliminarTablaDelDOM();
    //    await cargarTabla();
    // }

    //test
    async function borrarFila(this_a){
        //console.log(this_a);
        await eliminarDeAPI(this_a.parentNode.parentNode.id)
        this_a.parentNode.parentNode.remove();
    }

    function modificarFila(fila, paisEditado){
        if ( /* (document.querySelector("#check").checked == false) &&*/ (paisEditado.thing.usuarios < 6000) ){
            fila.firstChild.innerHTML = paisEditado.thing.pais;
            fila.firstChild.nextElementSibling.innerHTML = paisEditado.thing.usuarios;
            fila.firstChild.nextElementSibling.nextElementSibling.innerHTML = paisEditado.thing.visualizaciones;
        }else{
            fila.firstChild.innerHTML = paisEditado.thing.pais;
            fila.firstChild.nextElementSibling.innerHTML = paisEditado.thing.usuarios;
            fila.firstChild.nextElementSibling.nextElementSibling.innerHTML = paisEditado.thing.visualizaciones;
            fila.setAttribute("class", "resaltadoTabla");
        }
    }
    async function modificarAPI(filaAEditar, paisEditado){
        let id = filaAEditar.id;
        try{
        let response = await fetch(link + "/" + id,{
            "method" : "PUT",
            "headers" : {
                'Content-Type' : 'application/json'
            },
            "body" : JSON.stringify(paisEditado)

        })
        }catch(error){
            console.log(error);
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
    }


    function editarFila(this_editar){
        let inputPais = document.createElement("input");
        inputPais.setAttribute("class", "input");
        let inputUsuario = document.createElement("input");
        inputUsuario.setAttribute("type", "number");
        inputUsuario.setAttribute("class", "input");
        let inputVisualizaciones = document.createElement("input");
        inputVisualizaciones.setAttribute("type", "number");
        inputVisualizaciones.setAttribute("class", "input");
        let fila = this_editar.parentNode.parentNode; // fila correspondiente al boton 
        /*let imprimir = this_b.parentNode.parentNode.firstChild.nextElementSibling;
        console.log(imprimir)*/
        fila.classList.remove("resaltadoTabla");
        let _id = fila.id;
        fila.firstChild.innerHTML = "";
        fila.firstChild.nextElementSibling.innerHTML = "";
        fila.firstChild.nextElementSibling.nextElementSibling.innerHTML = "";
        fila.firstChild.appendChild(inputPais); //ponemos inputPais en fila.firtchild
        fila.firstChild.nextElementSibling.appendChild(inputUsuario); //lo mismo que en el anterior pero recorriendo mas el DOM
        fila.firstChild.nextElementSibling.nextElementSibling.appendChild(inputVisualizaciones); //idem

        let botonEnviar = document.createElement("button");
        botonEnviar.setAttribute("class", "botonTabla");
        botonEnviar.innerHTML = "Enviar"
        this_editar.remove();
        fila.lastChild.appendChild(botonEnviar);
        botonEnviar.addEventListener("click", async function(){
            let filaAEditar = this.parentNode.parentNode; //tomamos la direccion de DOM que vamos a editar y ahorramos un GET
            let paisEditado = { //pedimos todo aca adentro y lo pasamos por parametro para ahorrar un GET
                "thing" : {
                    "pais" : filaAEditar.firstChild.firstChild.value,
                    "usuarios" : filaAEditar.firstChild.nextElementSibling.firstChild.value,
                    "visualizaciones" : filaAEditar.firstChild.nextElementSibling.nextElementSibling.firstChild.value,
                }
            }
            await modificarAPI(filaAEditar, paisEditado);
            modificarFila(fila, paisEditado);// fila vive hasta la ultima llave de editarFila
            let nuevoBotonEditar = document.createElement("button");
            nuevoBotonEditar.setAttribute("class", "botonTabla");
            nuevoBotonEditar.innerHTML = "Editar";
            this.remove();// this es el boton de enviar 
            fila.lastChild.appendChild(nuevoBotonEditar);
            nuevoBotonEditar.addEventListener("click", function(){
                editarFila(this);
            });
        });
    } 

    function agregarItemAlDOM(nuevoPais, _id){
        if ( /*(document.querySelector("#check").checked == false) &&*/ (nuevoPais.usuarios < 6000) ){
            let nuevo_tr = document.createElement("tr");//creo un elemento tr y lo guardo como "nuevo_tr"
            nuevo_tr.setAttribute('id', _id); // a nuevo tr le asignamos un id como atrib, este atrib es el id de la API

            let td_pais = document.createElement("td");//creo un elemento td y lo guardo como "td_pais"
            td_pais.innerHTML = nuevoPais.pais; //al td que cree le pongo algo en su innerHTML
            nuevo_tr.appendChild(td_pais); //al tr que creamos primero le ponemos adentro el td

            let td_usuarios = document.createElement("td");
            td_usuarios.innerHTML = nuevoPais.usuarios;
            nuevo_tr.appendChild(td_usuarios);

            let td_visualizaciones = document.createElement("td");
            td_visualizaciones.innerHTML = nuevoPais.visualizaciones;
            nuevo_tr.appendChild(td_visualizaciones);
            
            let td_borraryeditar = document.createElement("td"); //creamos un td
            let nuevoBotonBorrar = document.createElement("button"); //creamos un boton
            nuevoBotonBorrar.setAttribute("class", "botonTabla");
            nuevoBotonBorrar.innerHTML = "Borrar"; //escribimos adentro 
            let nuevoBotonEditar = document.createElement("button"); // creamos otro boton
            nuevoBotonEditar.innerHTML = "Editar"; // editamos adentro
            nuevoBotonEditar.setAttribute("class", "botonTabla");
            td_borraryeditar.appendChild(nuevoBotonBorrar); //al td le ponemos de hijo a nuevoBotonBorrar
            td_borraryeditar.appendChild(nuevoBotonEditar);
            nuevo_tr.appendChild(td_borraryeditar); //al tr que creamos primero le ponemos dentro el td

            nuevoBotonBorrar.addEventListener("click", function(){
                borrarFila(this);
            }); //ponemos un listener a boton que creamos
            nuevoBotonEditar.addEventListener("click", function(){
                editarFila(this);
            }); //ponemos un listener al boton que creamos



            document.querySelector("#tablaVisualizaciones").appendChild(nuevo_tr);//al elemento señalado con querySelector le ponemos adentro 
                                                                                //el nuevo_tr

                                                                                //cada elemeto que metemos en nuevo_tr se pone al lado de los anteriores que esten adentro de nuevo_tr tambien
        }else{
            let nuevo_tr = document.createElement("tr");
            //nuevo_tr = classList.add("resaltadoTabla");
            nuevo_tr.setAttribute('class','resaltadoTabla');
            nuevo_tr.setAttribute('id', _id); // a nuevo tr le asignamos un id como atrib, este atrib es el id de la API

            let td_pais = document.createElement("td");
            td_pais.innerHTML = nuevoPais.pais;
            nuevo_tr.appendChild(td_pais);

            let td_usuarios = document.createElement("td");
            td_usuarios.innerHTML = nuevoPais.usuarios;
            nuevo_tr.appendChild(td_usuarios);

            let td_visualizaciones = document.createElement("td");
            td_visualizaciones.innerHTML = nuevoPais.visualizaciones;
            nuevo_tr.appendChild(td_visualizaciones);

            let td_borraryeditar = document.createElement("td");
            let nuevoBotonBorrar = document.createElement("button");
            nuevoBotonBorrar.innerHTML = "Borrar";
            nuevoBotonBorrar.setAttribute("class", "botonTabla");
            let nuevoBotonEditar = document.createElement("button");
            nuevoBotonEditar.innerHTML = "Editar";
            nuevoBotonEditar.setAttribute("class", "botonTabla");
            td_borraryeditar.appendChild(nuevoBotonBorrar);
            td_borraryeditar.appendChild(nuevoBotonEditar);
            nuevo_tr.appendChild(td_borraryeditar);

            nuevoBotonBorrar.addEventListener("click", function(){
                borrarFila(this);
            }); //ponemos un listener a boton que creamos
            nuevoBotonEditar.addEventListener("click", function(){
                editarFila(this);
            }); //ponemos un listener al boton que creamos

            document.querySelector("#tablaVisualizaciones").appendChild(nuevo_tr);

        }
    }

    async function mostrarTresItemsEnDOM(){
        try{
            let response = await fetch(link);
            response = await response.json();
            let comienzo = (response.estadisticas.length - 3);
            for (let i = comienzo; i < response.estadisticas.length; i++) {
                agregarItemAlDOM(response.estadisticas[i].thing, response.estadisticas[i]._id);
            }
        }catch(error){
            console.log(error)
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
    }


    async function crearTresItems(){
        let nuevoPais = {//cargamos nuevo pais hardcode
            "thing" : {
                "pais": "Angola",
                "usuarios": "101" ,
                "visualizaciones": "50",
            }
        };
        await agregarItemAPI(nuevoPais);
        nuevoPais = {
            "thing" : {
                "pais": "Bombai",
                "usuarios": "6001" ,
                "visualizaciones": "220",
            }
        }
        await agregarItemAPI(nuevoPais);
        nuevoPais = {
            "thing" : {
                "pais": "Camboya",
                "usuarios": "452" ,
                "visualizaciones": "23",
            }
        }
        await agregarItemAPI(nuevoPais);
        //setTimeout(function(){
            mostrarTresItemsEnDOM();
        //}, 5000);
    }

    async function agregarItemAPI(nuevoPais){
        try {
            let response = await fetch(link,{
                "method" : "POST",
                "headers" : {
                    'Content-Type' : 'application/json'
                },
                "body" : JSON.stringify(nuevoPais)
            });
        } catch (error) {
            console.log(error);
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
    }

    async function cargarItem(){
        let pais = document.querySelector("#pais");
        let usuarios = document.querySelector("#usuarios");
        let visualizaciones = document.querySelector("#visualizaciones");
        let nuevoPais = {// creamos Json y le ponemos los valores leyendo el dom con inputs
            "thing": {
                "pais": pais.value,
                "usuarios": usuarios.value,
                "visualizaciones": visualizaciones.value
            }
        }
        try{
            agregarItemAPI(nuevoPais);
            let response = await fetch(link);
            response = await response.json();
            agregarItemAlDOM(nuevoPais.thing, response.estadisticas[response.estadisticas.length-1]._id);
            pais.value ="";
            usuarios.value = "";
            visualizaciones.value = "";
        }catch(error){
            console.log(error)
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
    }

    function eliminarTablaDelDOM(){
        let tabla = document.querySelectorAll("tr"); //agarro todos los td y se guardan en un arreglo  

        for (let i = 1; i < tabla.length; i++) {// i = 2 para no borrar lo del thead y el ejemplo
            //elemento.removeChild(child);
            tabla[i].parentNode.removeChild(tabla[i]);//agarramos el elemento de tabla[i]
        }                                             // señalamos a su nodo padre (parentNode)
                                                    //le removemos el hijo del elementotambla[i];
                                                    

    }

    async function eliminarDeAPI(_id){
        try{
            let response = await fetch(link + "/" + _id,{
                        "method": "DELETE"
                    })
        }catch(error){
            console.log(error)
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
    }

    async function eliminarTabla(){
        try {
            let response = await fetch(link)
            response = await response.json();
            for (let i = 0; i < response.estadisticas.length; i++) {
                eliminarDeAPI(response.estadisticas[i]._id)
            }
            eliminarTablaDelDOM();
        } catch (error) {
            console.log(error);
            document.querySelector("#mensajeDeError").classList.remove("oculto");
        }
    }

    function filtrarTabla(){
        let tablaPaises = document.querySelectorAll("tr");
        let busqueda = document.querySelector("#busqueda").value;
        let i = 1;
        //console.log(tablaPaises[1].firstChild.innerHTML);
        for (let i = 1; i < tablaPaises.length; i++) {
            if (tablaPaises[i].firstChild.innerHTML !== busqueda){
                tablaPaises[i].classList.add("oculto");
            }
        }
    }

    function cancelarFiltrado(){
        let tablaPaises = document.querySelectorAll("tr");
        let i = 1;
        //console.log(tablaPaises[1].firstChild.innerHTML);
        for (let i = 1; i < tablaPaises.length; i++) {
            tablaPaises[i].classList.remove("oculto");
        }
        document.querySelector("#busqueda").value = ""; //limpiamos la barra de busqueda
    }

    
    document.querySelector("#registrarse").addEventListener("click",function(){
        clearInterval(intervalo);
    })

    document.querySelector("#inicio").addEventListener("click",function(){
        clearInterval(intervalo);
    })

    document.querySelector("#cancelarBusqueda").addEventListener("click",cancelarFiltrado);
    document.querySelector("#buscar").addEventListener("click",filtrarTabla);
    document.querySelector("#eliminarTabla").addEventListener("click",eliminarTabla);
    document.querySelector("#tresItems").addEventListener("click", crearTresItems);
    document.querySelector("#cargarItem").addEventListener("click",cargarItem);


    //function para testeo
    function test(){
        console.log("test")
    }

    document.querySelector("#testear").addEventListener("click", test);
    document.querySelector("#test").addEventListener("click", test);
    document.querySelector("#consult").addEventListener("click", test);
}