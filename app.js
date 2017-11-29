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
var lvl2Unlock;
var intscene;
var tIni;
var tLvl1 = 100000; //100.000 ms (1min 40sg)
var pen=0;          //penalizacion acumulada
var anchura;
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
    anchura = $("#clock").width();
    lvl2Unlock=false;
    ponerVisible($("#interrogacion"), false);
    ponerVisible($("#menuMinijuego"), false);
    lock = false;
    // BOTONES MENUS DEL JUEGO 
    for(var i=0;i<16;i++){
            $("#b"+i).click(move(i));
    }
    $("#Bjugar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), true);
                console.log("hola");
                
				})
        $("#Blvl1").click(
			function() {
                    //clock management
                    tIni=Date.now();
                    console.log("tini "+tIni);
                    setInterval( "timer()", 500 );
                
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl1"), true);
                console.log("hola");
                    play1(000);
                
				})
        $("#Blvl2").click(
			function() {
                if(lvl2Unlock){
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl2"), true);
                }
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

    $("#interrogacion").click(
            function() {
                        locked();
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
    ponerVisible($("#interrogacion"), false);

    intscene = parseInt(scene, 10);
    
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
            document.getElementById("background").src = "assets/"+img;
        }else{
            puzzle = parseInt(puzzle, 10);
            if(quest.qw[puzzle].correcta!="null"){
                lock=true;
                document.getElementById("background").src = "assets/"+img;
                document.getElementById("background2").src = "assets/"+img;
                prepregunta();
                //locked();
            }else{
                console.log("Valla abierta");
                document.getElementById("background").src = "assets/"+obj.imgo;
            }
            
        }
    
}
function prepregunta(){
    console.log("prepregunta");
    ponerVisible($("#interrogacion"), true);
    ponerVisible($("#bFront"), false);
}
function locked(){
    console.log("bloqueado");
    ponerVisible($("#interrogacion"), false);
    ponerVisible($("#menu"), false);
    ponerVisible($("#menuJugar"), false);
    ponerVisible($("#menulvl1"), false);
    ponerVisible($("#menuLocked"), true);
    
    
    //recoge la pregunta del json
    console.log(puzzle);
    var obj = quest.qw[puzzle];
    //imprime por consola
    console.log("pregunta : "+ obj.pregunta);
    console.log("a -> " + obj.a);
    console.log("b -> " + obj.b);
    console.log("c -> " + obj.c);
    console.log("d -> " + obj.d);
    //imprime en textareas
    
    document.getElementById("pregunta").innerHTML = obj.pregunta;
    document.getElementById("resA").innerHTML = obj.a;
    document.getElementById("resB").innerHTML = obj.b;
    document.getElementById("resC").innerHTML = obj.c;
    document.getElementById("resD").innerHTML = obj.d;
    
}
function check(ans){
    console.log("Checkeando");
    if(quest.qw[puzzle].correcta == ans){
        //respuesta correcta
        console.log("Correcto")
        lock = false;
        quest.qw[puzzle].correcta="null";
        ponerVisible($("#menu"), false);
        ponerVisible($("#menuJugar"), false);
        ponerVisible($("#menulvl1"), true);
        ponerVisible($("#menuLocked"), false);
        ponerVisible($("#bFront"), true);
        ponerVisible($("#botones"), true);
        console.log("assets/"+maze.scene[intscene].imgo);
        document.getElementById("background").src = "assets/"+maze.scene[intscene].imgo;
    }else{
        //respuesta incorrecta
        document.getElementById("b"+ans.toUpperCase()).src = "assets/lvl1/x.png";
        pen+=10000;
        console.log("incorrecto");
        //posible penalizacion
        
        //
    }
    
}
function timer(){
    var time = pen+Date.now() - tIni;
    if(time>=tLvl1){
        derrota();
    }else{
        progress(tLvl1-time, tLvl1,$("#clock") );
        console.log("tcurrent "+time);
    }
}
function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * anchura *10 / timetotal;
    //console.log("progressBarWidth "+progressBarWidth+" /timeleft " +timeleft+" /$element.width()"+anchura+"/timetotal "+ timetotal);
    $element.animate({ width: progressBarWidth }, 500)
    
};
function move(id){
    
}
function isAdyacent(id1, id2){
    if(id1%4==id2%4){
        if($("#"+id1).source().contains("block")){
            
        }
    }
    if(id1/4==id2/4){
        
    }
}
function derrota(){
    console.log("derrota");
}
function victoria(){
    console.log("Victoria");
}
function minijuego(){
    
}


var maze1 = '{ "maze": { "scene": [ { "-id": "000", "imgo": "null", "back": "null", "front": "null", "left": "0038", "right": "002", "img": "000BLR.png", "puzzle": "null" }, { "-id": "001", "imgo": "null", "back": "0038", "front": "null", "left": "004", "right": "0039", "img": "000BLR.png", "puzzle": "null" }, { "-id": "002", "imgo": "null", "back": "000", "front": "null", "left": "0035", "right": "0041", "img": "000BLR.png", "puzzle": "null" }, { "-id": "003", "imgo": "null", "back": "0041", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "004", "imgo": "null", "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "005", "imgo": "null", "back": "0039", "front": "null", "left": "006", "right": "null", "img": "000LL.png", "puzzle": "null" }, { "-id": "006", "imgo": "null", "back": "005", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "007", "imgo": "null", "back": "0035", "front": "null", "left": "0042", "right": "008", "img": "001BLR.png", "puzzle": "null" }, { "-id": "008", "imgo": "null", "back": "007", "front": "null", "left": "0011", "right": "009", "img": "001BLR.png", "puzzle": "null" }, { "-id": "009", "imgo": "null", "back": "008", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0010", "imgo": "null", "back": "0042", "front": "null", "left": "0040", "right": "0014", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0011", "imgo": "null", "back": "008", "front": "null", "left": "0013", "right": "0012", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0012", "imgo": "null", "back": "0011", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0013", "imgo": "null", "back": "0011", "front": "null", "left": "0015", "right": "null", "img": "001LL.png", "puzzle": "null" }, { "-id": "0014", "imgo": "null", "back": "0010", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0015", "imgo": "null", "back": "0013", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0016", "imgo": "null", "back": "0036", "front": "null", "left": "0046", "right": "0018", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0017", "imgo": "null", "back": "0046", "front": "null", "left": "0029", "right": "0020", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0018", "imgo": "null", "back": "0016", "front": "null", "left": "0019", "right": "0043", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0019", "imgo": "null", "back": "0018", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0020", "imgo": "null", "back": "0017", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0021", "imgo": "null", "back": "0018", "front": "null", "left": "0037", "right": "0026", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0022", "imgo": "null", "back": "0037", "front": "null", "left": "0023", "right": "0024", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0023", "imgo": "null", "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0024", "imgo": "null", "back": "0037", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0025", "imgo": "null", "back": "0021", "front": "null", "left": "0026", "right": "0027", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0026", "imgo": "null", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0027", "imgo": "null", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0028", "imgo": "null", "back": "0017", "front": "null", "left": "0029", "right": "0045", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0029", "imgo": "null", "back": "0028", "front": "null", "left": "0031", "right": "0032", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0030", "imgo": "null", "back": "0045", "front": "null", "left": "0033", "right": "0034", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0031", "imgo": "null", "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0032", "imgo": "null", "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0033", "imgo": "null", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0034", "imgo": "null", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0035", "imgo":"000open.png", "back": "002", "front": "007", "left": "null", "right": "null", "img": "000close.png", "puzzle": "001" }, { "-id": "0036", "imgo":"001open.png", "back": "0040", "front": "0016", "left": "null", "right": "null", "img": "001close.png", "puzzle": "002" }, { "-id": "0037", "imgo": "002open.png", "back": "0021", "front": "0022", "left": "null", "right": "null", "img": "002close.png", "puzzle": "002" }, { "-id": "0038", "imgo": "null", "back": "000", "front": "null", "left": "001", "right": "null", "img": "000LL.png", "puzzle": "null" }, { "-id": "0039", "imgo": "null", "back": "001", "front": "null", "left": "005", "right": "null", "img": "000LL.png", "puzzle": "null" }, { "-id": "0040", "imgo": "null", "back": "0010", "front": "null", "left": "null", "right": "0036", "img": "001RR.png", "puzzle": "null" }, { "-id": "0041", "imgo": "null", "back": "002", "front": "003", "left": "null", "right": "null", "img": "000FF.png", "puzzle": "null" }, { "-id": "0042", "imgo": "null", "back": "007", "front": "0010", "left": "null", "right": "null", "img": "001FF.png", "puzzle": "null" }, { "-id": "0043", "imgo": "null", "back": "0018", "front": "0021", "left": "null", "right": "null", "img": "002FF.png", "puzzle": "null" }, { "-id": "0044" }, { "-id": "0045", "imgo": "null", "back": "0028", "front": "null", "left": "null", "right": "0030", "img": "002RR.png", "puzzle": "null" }, { "-id": "0046", "imgo": "null", "back": "0016", "front": "null", "left": "0017", "right": "null", "img": "002LL.png", "puzzle": "null" } ] } }';
var questions1 = '{ "xml": { "mazepr": { "qw": [ { "pregunta": "¿Cuántas patas tiene un insecto?", "a": "4", "b": "8", "c": "6", "d": "depende del insecto", "correcta": "c" }, { "pregunta": "¿Cuál de estos animales es un mamífero?", "a": "tiburón", "b": "delfín", "c": "manta", "d": "caballito de mar", "correcta": "b" }, { "pregunta": "¿Qué parte de las matemáticas se encarga del estudio de los numeros y operaciones con estos?", "a": "aritmética", "b": "trigonometría", "c": "álgebra", "d": "geometría", "correcta": "a" }, { "pregunta": "¿Cuál fue la primera raza humana?", "a": "homo-sapiens-sapiens", "b": "homo-sapiens", "c": "namlu´u", "d": "homo-erectus", "correcta": "c" }, { "pregunta": "¿Cuál fue el primer videojuego de la historia?", "a": "Mario-Bros", "b": "Alex Kidd in the miracle world", "c": "pong", "d": "KHY", "correcta": "c" }, { "pregunta": "¿Qué año pertenece a el año del dragón en China?", "a": "1999", "b": "2000", "c": "2001", "d": "2002", "correcta": "b" }, { "pregunta": "¿En que año se celebró la primera copa de europa de fúbol?", "a": "1955/1956", "b": "1945/1946", "c": "1845/1846", "d": "1855/1856", "correcta": "a" }, { "pregunta": "¿Cual fue la primera consola de la historia?", "a": "Magnavox Odyssey", "b": "NES", "c": "Atari Pong", "d": "TRC-1", "correcta": "a" }, { "pregunta": "¿Cuando fue la fecha de la primera guerra mundial?", "a": "1918", "b": "1917", "c": "1915", "d": "1914", "correcta": "d" }, { "pregunta": "¿Cuantos Mister Olympia tiene Arnold Schwarzenegger?", "a": "7", "b": "16", "c": "5", "d": "2", "correcta": "a" } ] } } }';