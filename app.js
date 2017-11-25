// función que permite poner visible o no una sección div, asi conseguimos que
// la tabla se oculte cuando inciamos partida
var victoria;
var xmlDoc;
var parser;

var img;
var back;
var left;
var front;
var right;
var puzzle;
var lock;
function ponerVisible(div, visible) {
	let
	estado = visible ? "block" : "none"; // block para que se vea, o none
											// para que no se vea
	div.css({
		"display" : estado
	});
}

// función que cambia de estado a bloqueado y viceversa (uso de botones)
function cambioEstadoBloqueado(boton, nuevoEstado){
	if(nuevoEstado){// true para activarlo
		boton.css({"opacity":1}); // opacity 1 visible
		boton.prop("disabled", false);
	}else{
		boton.css({"opacity":0.5}); // opacity 0,5 no puede usarse
		boton.prop("disabled", true);
		}
}


// funcion que se invoca al cargar la pagina
$(function() {
    lock = false;
    // BOTONES MENUS DEL JUEGO 
    $("#Bjugar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), true);
                console.log("hola");
                
				})
        $("#Blvl1").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl1"), true);
                console.log("hola");
                    play1(000);
                
				})
        $("#Blvl2").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl2"), true);
                
				})
    $("#Binstrucciones").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuInstrucciones"), true);
				})
    
    $("#Bcontactar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuContactar"), true);
				})
  
    $("#BatrasIns").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menuInstrucciones"), false);
				})
    $("#BatrasCon").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menuContactar"), false);
				})
    $("#bBack").click(
                function() {
                        if(back!="null"){
                            load(back);
                        }
                    });
    $("#bFront").click(
                function() {
                        if(front!="null"){
                            load(front);
                        }
                    });
    $("#bLeft").click(
                function() {
                        if(left!="null"){
                            load(left);
                        }
                    else
                        {
                            
                        }
                    });
    $("#bRight").click(
                function() {
                        if(right!="null"){
                            load(right);
                        }
                    });
    $("#bA").click(
            function() {
                    if(lock){
                        check("a");
                    }
                });
    $("#bB").click(
            function() {
                    if(lock){
                        check("b");
                    }
                });
    $("#bC").click(
            function() {
                    if(lock){
                        check("c");
                    }
                });
    $("#bD").click(
            function() {
                    if(lock){
                        check("d");
                    }
                });
    
})
var maze;
var quest;
function play1(scene){
    victoria = false;
    
    
    var parsed = JSON.parse(maze1);
    maze = parsed.maze;
    var parsed2 = JSON.parse(questions1);
    quest = parsed2.xml.mazepr;
    
    load(scene);
    victoria = false;
    
}





function load(scene){
    

    
    var intscene = parseInt(scene, 10);
    console.log(intscene);
    var obj = maze.scene[intscene];
    
    //console.log(obj.img);
    //console.log(obj.right);
    img = obj.img;
    left = obj.left;
    if(left=="null")
        {
        document.getElementById("bLeft").style.display = 'none';
        }else{
        document.getElementById("bLeft").style.display = 'block';
        console.log("left"+left);
        }
    front = obj.front;
        if(front=="null")
        {
        document.getElementById("bFront").style.display = 'none';
        }else{
        document.getElementById("bFront").style.display = 'block';
        console.log("front " + front);
        }
    right = obj.right;
        if(right=="null")
        {
        document.getElementById("bRight").style.display = 'none';
        }else{
        document.getElementById("bRight").style.display = 'block';
        console.log("right " + right);
        }
    
    back = obj.back;
        if(back=="null")
        {
        document.getElementById("bBack").style.display = 'none';
        }else{
        document.getElementById("bBack").style.display = 'block';
        console.log("back " + back);
        }
    puzzle = obj.puzzle;
        if(puzzle=="null")
        {
        }else{
            puzzle = parseInt(puzzle, 10);
            lock=true;
            locked();
        }
    document.getElementById("background").src = "assets/"+img;
    
}
function locked(){
    console.log("bloqueado");
    ponerVisible($("#menu"), false);
    ponerVisible($("#menuJugar"), false);
    ponerVisible($("#menulvl1"), false);
    ponerVisible($("#menuLocked"), true);
    
    
    //recoge la pregunta del json
    console.log(puzzle);
    var obj = quest.qw[puzzle];
    console.log("pregunta : "+ obj.pregunta);
    console.log("a -> " + obj.a);
    console.log("b -> " + obj.b);
    console.log("c -> " + obj.c);
    console.log("d -> " + obj.d);
    
}
function check(ans){
    console.log("Checkeando")
    if(quest.qw[puzzle].correcta == ans){
        //respuesta correcta
        console.log("Correcto")
        lock = false;
        ponerVisible($("#menu"), false);
        ponerVisible($("#menuJugar"), false);
        ponerVisible($("#menulvl1"), true);
        ponerVisible($("#menuLocked"), false);
    }else{
        //respuesta incorrecta
        console.log("incorrecto");
        //posible penalizacion
        
        //
    }
    
}




var maze1 = '{ "maze": { "scene": [ { "back": "null", "front": "null", "left": "001", "right": "002", "img": "000BLR.png", "puzzle": "null", "_id": "000" }, { "back": "000", "front": "null", "left": "004", "right": "006", "img": "000BLR.png", "puzzle": "null", "_id": "001" }, { "back": "000", "front": "null", "left": "007", "right": "003", "img": "000BLR.png", "puzzle": "null", "_id": "002" }, { "back": "002", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "003" }, { "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "004" },{}, { "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "006" } , { "back": "002", "front": "null", "left": "0010", "right": "008", "img": "000BLR.png", "puzzle": "001", "_id": "007" }, { "back": "007", "front": "null", "left": "0011", "right": "009", "img": "001BLR.png", "puzzle": "null", "_id": "008" }, { "back": "008", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "009" }, { "back": "007", "front": "null", "left": "0016", "right": "0014", "img": "001BLR.png", "puzzle": "null", "_id": "0010" }, { "back": "008", "front": "null", "left": "0013", "right": "0012", "img": "001BLR.png", "puzzle": "null", "_id": "0011" }, { "back": "0011", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0012" }, { "back": "0011", "front": "null", "left": "0015", "right": "null", "img": "001BL.png", "puzzle": "null", "_id": "0013" }, { "back": "0010", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0014" }, { "back": "0013", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0015" }, { "back": "0010", "front": "null", "left": "0017", "right": "0018", "img": "001BLR.png", "puzzle": "002", "_id": "0016" }, { "back": "0016", "front": "null", "left": "0029", "right": "0020", "img": "002BLR.png", "puzzle": "null", "_id": "0017" }, { "back": "0016", "front": "null", "left": "0019", "right": "0021", "img": "002BLR.png", "puzzle": "null", "_id": "0018" }, { "back": "0018", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0019" }, { "back": "0017", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0020" }, { "back": "0018", "front": "null", "left": "0022", "right": "0026", "img": "002BLR.png", "puzzle": "null", "_id": "0021" }, { "back": "0021", "front": "null", "left": "0023", "right": "0024", "img": "002BLR.png", "puzzle": "003", "_id": "0022" }, { "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0023" }, { "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0024" }, { "back": "0022", "front": "null", "left": "0026", "right": "0027", "img": "002BLR.png", "puzzle": "null", "_id": "0025" }, { "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0026" }, { "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0027" }, { "back": "0017", "front": "null", "left": "0029", "right": "0030", "img": "002BLR.png", "puzzle": "null", "_id": "0028" }, { "back": "0028", "front": "null", "left": "0031", "right": "0032", "img": "002BLR.png", "puzzle": "null", "_id": "0029" }, { "back": "0028", "front": "null", "left": "0033", "right": "0034", "img": "002BLR.png", "puzzle": "null", "_id": "0030" }, { "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0031" }, { "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0032" }, { "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0033" }, { "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0034" } ] } }';
var questions1 = '{ "xml": { "mazepr": { "qw": [ { "pregunta": "¿Cuántas patas tiene un insecto?", "a": "4", "b": "8", "c": "6", "d": "depende del insecto", "correcta": "c" }, { "pregunta": "¿Cuál de estos animales es un mamífero?", "a": "tiburón", "b": "delfín", "c": "manta", "d": "caballito de mar", "correcta": "b" }, { "pregunta": "¿Qué parte de las matemáticas se encarga del estudio de los numeros y operaciones con estos?", "a": "aritmética", "b": "trigonometría", "c": "álegra", "d": "geometría", "correcta": "a" }, { "pregunta": "¿Cuál fue la primera raza humana?", "a": "homo-sapiens-sapiens", "b": "homo-sapiens", "c": "namlu´u", "d": "homo-erectus", "correcta": "c" }, { "pregunta": "¿Cuál fue el primer videojuego de la historia?", "a": "Mario-Bros", "b": "Alex Kidd in the miracle world", "c": "pong", "d": "KHY", "correcta": "c" }, { "pregunta": "¿Qué año pertenece a el año del dragón en China?", "a": "1999", "b": "2000", "c": "2001", "d": "2002", "correcta": "b" }, { "pregunta": "¿En que año se celebró la primera copa de europa de fúbol?", "a": "1955/1956", "b": "1945/1946", "c": "1845/1846", "d": "1855/1856", "correcta": "a" }, { "pregunta": "¿Cual fue la primera consola de la historia?", "a": "Magnavox Odyssey", "b": "NES", "c": "Atari Pong", "d": "TRC-1", "correcta": "a" }, { "pregunta": "¿Cuando fue la fecha de la primera guerra mundial?", "a": "1918", "b": "1917", "c": "1915", "d": "1914", "correcta": "d" }, { "pregunta": "¿Cuantos Mister Olympia tiene Arnold Schwarzenegger?", "a": "7", "b": "16", "c": "5", "d": "2", "correcta": "a" } ] } } }';