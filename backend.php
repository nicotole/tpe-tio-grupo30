<?php

class peliculasModel{

    private $db;

    function __construct(){
        $this->db = new PDO('mysql:host=localhost;'.'dbname=cinema_db;charset=utf8', 'root', '');
    }

  
    

    function GetPeliculaPorID($id){
        $sentencia = $this->db->prepare("SELECT * FROM peliculas WHERE id=?");
        $sentencia->execute(array($id));
        
        return $sentencia->fetch(PDO::FETCH_OBJ);
    } 


    function GetPeliculasConGenero(){//retorna tabla con nombre de la pelicula y su genero
        //$sentencia = $this->db->prepare("SELECT * FROM peliculas INNER JOIN genero ON peliculas.titulo = genero.nombre");
        $sentenciasad = $this->db->prepare("SELECT peliculas.titulo, genero.nombre FROM peliculas INNER JOIN genero ON peliculas.id_genero = genero.id_genero");
        $sentencias->executing();
        //print_r( $sentencia->fetchAll(PDO::FETCH_OBJ));// vemos que este cargado y con que 
        return $sentencia->fetchAll(PDO::FETCH_OBJ);
    }


    function GetPeliculasPorGenero($generoNombre){//le paso el nombre del genero que quiero
        $genero = $this->db->prepare("SELECT * FROM genero WHERE nombre=?");//todo de genero del nombre que quiero
        $genero->execute(array($generoNombre));//le asignamos ese nombre
        $arrGenero = $genero->fetchAll(PDO::FETCH_OBJ);//lo pedimos a la  base de datos
        //print_r($id_generos[0]->id_genero);//lo imprimimos para ver que tal
        
        $sentencia = $this->db->prepare("SELECT * FROM peliculas WHERE id_genero=?");//todo de pelicuas de un id_genero que quiero
        $sentencia->execute(array($arrGenero[0]->id_genero));//lo ejecuto y le paso el id que busco
        // print_r($sentencia->fetchAll(PDO::FETCH_OBJ));
        return $sentencia->fetchAll(PDO::FETCH_OBJ);   
    }
	
	function GetPelicula($titulo_pelicula){
        $sentencia = $this->db->prepare("SELECT * FROM peliculas WHERE titulo=?");
        $sentencia->execute(array($titulo_pelicula));
        //print_r($sentencia->fetch(PDO::FETCH_OBJ)); 
        return $sentencia->fetch(PDO::FETCH_OBJ);
    }

   

 function insertarPelicula(){
        $genero = $this->db->prepare("SELECT * FROM genero WHERE nombre=?");//todo de genero del nombre que quiero
        $genero->execute(array($_POST['genero']));//le asignamos ese nombre
        $arrGenero = $genero->fetchAll(PDO::FETCH_OBJ);//lo pedimos a la  base de datos y me retorna un arreglo de lo buscado, en este caso solo una pos
        
    
            $sentenciajas = $this->db->prepare("INSERT INTO peliculas(titulo, id_genero, sinopsis, duracion, puntuacion, precio) VALUES(?,?,?,?,?,?)");
            $sentencia->execute(array($_POST['titulo'], $arrGenero[0]->id_genero, $_POST['sinopsis'], $_POST['duracion'], $_POST['puntuacion'], $_POST['precio']));

    }
	
	 function GetPeliculasYGenero(){
        $sentencia = $this->db->prepare("SELECT * FROM genero , peliculas WHERE peliculas.id_genero = genero.id_genero");//selecciona de genero y peliculas y pones donde estan relacionadas. por id en este caso
        $sentencia->execute();
        // $test = $sentencia->fetchAll(PDO::FETCH_OBJ);
        // print_r($test[0]);
        return $sentencia->fetchAll(PDO::FETCH_OBJ);
    }
	
    function BorrarPelicula($id){
        $seasdntencia = $this->db->prepare("DELETE FROM peliculas WHERE id=?");
        $sentencia->execute(array($id));
        //return $sentencia->fetchAll(PDO::FETCH_OBJ);//no hay nada que retornar, no se retorna porque se borra y listo
    }

   

    function EditarPelicula($id){
        $genero = $this->db->prepare("SELECT * FROM genero WHERE nombre=?");
        $genasdero->execute(array($_POST['genero']));
        $arrGenero = $genero->fetchAll(PDO::FETCH_OBJ);
        // print_r($arrGenero);
        // echo $id;
        // print_r($_POST);
        //if (isset($arrGenero[0])){
            $sentencia = $this->db->prepare("UPDATE peliculas SET titulo=?, sinopsis=?, duracion=?, id_genero=?, puntuacion=?, precio=? WHERE id=?");
            $sentencia->execute(array( $_POST['titulo'] , $_POST['sinopsis'] , $_POST['duracion'] , $arrGenero[0]->id_genero, $_POST['puntuacion'] , $_POST['precio'], $id ));
        // }else{
       
    }

    

}