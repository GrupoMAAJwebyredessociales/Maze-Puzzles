// función que permite poner visible o no una sección div, asi conseguimos que
// la tabla se oculte cuando inciamos partida
var currentMaze;
var currentTime;
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
//var tLvl1 = 100000; //100.000 ms (1min 40sg)
var pen=0;          //penalizacion acumulada
var anchura;
var refreshIntervalId;
var maze;
var quest;
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
// Carga de los diferentes botones e iniciacion de algunas variables y valores
$(function() {
    ponerVisible($("#menuHighscore"), false);
    ponerVisible($("#menuInsertHighscore"), false);
    ponerVisible($("#clock"), false);
    ponerVisible($("#10"), false);
    anchura = $("#clock").width();
    lvl2Unlock=false;
    ponerVisible($("#interrogacion"), false);
    ponerVisible($("#menuMinijuego"), false);
    lock = false;
    
    // BOTONES MENUS DEL JUEGO 
    for(var i=0; i<16; i++){
            $("#b"+i).click(
            function() {
                    console.log(getVacio());
                    isAdyacent(event.target.id.substring(1), getVacio());
            })
    }
    $("#Bjugar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), true);
                console.log("hola");
                
				})
        $("#Blvl1").click(
			function() {
                    currentMaze=1;
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl"), true);
                    //clock management
                    tIni=Date.now();
                    refreshIntervalId = setInterval( function() { timer(100000) }, 500 );
                    console.log("tini "+tIni);
                    pen=0;
                
                    ponerVisible($("#clock"), true);
                    play1(000, maze1);
                
				})
        $("#Blvl2").click(
            
			function() {
                if(lvl2Unlock==true){
                    currentMaze=2;
                    console.log("blvl2");
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl"), true);
                    tIni=Date.now();
                    refreshIntervalId = setInterval( function() { timer(150000) }, 500 );
                    console.log("tini "+tIni);
                    pen=0;
                    
                    
                    ponerVisible($("#clock"), true);
                    play1(000, maze2);
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
    $("#Blvl2").hover(
            function(){
                        if(lvl2Unlock==true){
                            document.getElementById("Blvl2").style.backgroundImage="url(assets/Boton2Hover.png)";
                        }
                      },
            function(){
                        if(lvl2Unlock==true){
                                    document.getElementById("Blvl2").style.backgroundImage="url(assets/Boton2.png)";
                                }
            })
    $("#backMenu").click(
			function() {
                if(lvl2Unlock==true){
                    
                    
                    //console.log("Cambio a desbloqueado");
                    document.getElementById("Blvl2").style.backgroundImage="url(assets/Boton2.png)";
                }
                    InsertHighscore();
                    ponerVisible($("#menulvl"), false);
                    ponerVisible($("#menuV"), false);
                
    
				})
    
    $("#ok").click(
                function() {
                       // if($("#insertHighscore").text()!=""){ }
                    console.log(currentMaze+"->"+$("#insertHighscore").val()+"->"+currentTime);
                    checkHighScores(currentMaze,$("#insertHighscore").val(),currentTime);
                    ponerVisible($("#menuInsertHighscore"), false);
                    ponerVisible($("#menu"), true);
                    });
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
                if(maze.scene[intscene].img=="002close.png"){
                    minijuego();
                }else{
                    locked();
                }
                });
    
})

function play1(scene, mazeSelect){
    
    
    var parsed = JSON.parse(mazeSelect);
    maze = parsed.maze;
    var parsed2 = JSON.parse(questions1);
    quest = parsed2.xml.mazepr;
    
    load(scene);
    
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
    asset = obj.asset;
        if(asset=="null")
        {
            
            ponerVisible($("#asset"), false);
        }else {
            ponerVisible($("#asset"), true);
            document.getElementById("asset").src = "assets/"+obj.asset+".png";
        }
    puzzle = obj.puzzle;
        if(puzzle=="null")
        {
            document.getElementById("background").src = "assets/"+img;
        }else if(maze.scene[intscene].img=="002close.png"){
            document.getElementById("background").src = "assets/"+img;
            prepregunta();
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
    //console.log("prepregunta");
    ponerVisible($("#interrogacion"), true);
    ponerVisible($("#bFront"), false);
}
function locked(){
    //console.log("bloqueado");
    ponerVisible($("#interrogacion"), false);
    ponerVisible($("#menulvl"), false);
    ponerVisible($("#menuLocked"), true);
    
    
    //se recuperan los assets de las preguntas para evitar que se repitan las X
    document.getElementById("bA").src = "assets/lvl1/A.png";
    document.getElementById("bB").src = "assets/lvl1/B.png";
    document.getElementById("bC").src = "assets/lvl1/C.png";
    document.getElementById("bD").src = "assets/lvl1/D.png";
    
    //recoge la pregunta del json
    //console.log(puzzle);
    var obj = quest.qw[puzzle];
    //imprime por consola
    //console.log("pregunta : "+ obj.pregunta);
    //console.log("a -> " + obj.a);
    //console.log("b -> " + obj.b);
    //console.log("c -> " + obj.c);
    //console.log("d -> " + obj.d);
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
        
        ponerVisible($("#menulvl"), true);
        ponerVisible($("#menuLocked"), false);
        
        if(maze.scene[intscene].front!="null"){
            ponerVisible($("#bFront"), true);
        }
        
        ponerVisible($("#botones"), true);
        console.log("assets/"+maze.scene[intscene].imgo);
        document.getElementById("background").src = "assets/"+maze.scene[intscene].imgo;

    }else{
        //respuesta incorrecta
        document.getElementById("b"+ans.toUpperCase()).src = "assets/lvl1/x.png";
        
        //ponerVisible($("#botones"), true);
        ponerVisible($("#10"), true);
        $("#10").fadeOut(800);
        
        console.log("incorrecto");
        //posible penalizacion
        pen+=10000;
        //
    }
    
}
function timer(timeFinal){
    var time = pen+Date.now() - tIni;
    currentTime = time;
    if(time>=timeFinal){
        derrota();
    }else{
        progress(timeFinal-time, timeFinal,$("#clock") );
        //console.log("tcurrent "+time);
    }
}
function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * anchura / timetotal;
    //console.log("progressBarWidth "+progressBarWidth+" /timeleft " +timeleft+" /$element.width()"+anchura+"/timetotal "+ timetotal);
    $element.animate({ width: progressBarWidth }, 500);
    
};

//Minijuego

function move(id1, id2){
            console.log(id1+" - "+id2);
            console.log(document.getElementById("b15").src);
            
            if(document.getElementById("b"+id1).src.includes("vacio")){
                document.getElementById("b"+id1).src=document.getElementById("b"+id2).src;
                document.getElementById("b"+id2).src="assets/vacio.png";
            }
            else if(document.getElementById("b"+id2).src.includes("vacio")){
                document.getElementById("b"+id2).src=document.getElementById("b"+id1).src;
                document.getElementById("b"+id1).src="assets/vacio.png";
            }
            if(document.getElementById("b15").src.includes("llave.png")){
                victoria();
                resetMinijuego();
               }
}
function isAdyacent(id1, id2){
    console.log(id1+" %4 == "+id2+" %4 -> ");
    console.log(id1%4==id2%4);
    if(id1%4==id2%4){   //coincidencia vertical
        //
        console.log("Adyacentes 0");
        if(Math.floor((id1/4)+1)==Math.floor((id2/4))||Math.floor((id2/4)+1)==Math.floor((id1/4))){
            console.log("Adyacentes 1");
            move(id1, id2);
        }
    }
    console.log(id1+" /4 == "+id2+" /4 -> ");
    console.log(id1/4==id2/4);
    if(Math.floor(id1/4)==Math.floor(id2/4)){   //coincidencia horizontal
        //
        console.log("Adyacentes 2");
        if((id1%4)+1==(id2%4)||(id2%4)+1==(id1%4)){
            console.log("Adyacentes3");
            move(id1, id2);
        }
    }
}
function getVacio(){
     for(var i=0; i<16; i++){
        if(document.getElementById("b"+i).src.includes("vacio")){
            console.log("Vacio" + document.getElementById("b"+i).src);
            return i;
        }
     }
}
function minijuego(){
        ponerVisible($("#menuMinijuego"), true);
        ponerVisible($("#interrogacion"), false);
        ponerVisible($("#menulvl"), false);
        
}
function resetMinijuego(){
    document.getElementById("b0").src = "assets/llave.png";
    document.getElementById("b15").src = "assets/vacio.png";
    for(var i=1; i<15; i++){
                document.getElementById("b"+i).src = "assets/bloque.png";
    }
}
/* Victoria / Derrota */
function derrota(){
    InsertHighscore();
    ponerVisible($("#clock"), false);
    console.log("derrota");
    clearInterval(refreshIntervalId);
}
function victoria(){
    
    ponerVisible($("#clock"), false);
    console.log("Victoria");
    lvl2Unlock=true;
    ponerVisible($("#menuMinijuego"), false);
    ponerVisible($("#menulvl"), false);
    ponerVisible($("#menuV"), true);
    
    clearInterval(refreshIntervalId);
}

//Guardado De HighScores
function InsertHighscore(){
    ponerVisible($("#menuV"), false);
    ponerVisible($("#menuInsertHighscore"), true);
}
function checkHighScores(maze, nameIn, puntIn){    
    //Comprueba si ya existe en su memoria un archivo de maximas puntuaciones
    var puntuacion = {name:nameIn, punt:puntIn};
    if(localStorage.getItem("highscores" + maze)==null){
        var vector = [puntuacion];
        localStorage.setItem("highscores" + maze, JSON.stringify(vector));
    }else{
        //console.log(localStorage.getItem("highscores" + maze));
        var obj = JSON.parse(localStorage.getItem("highscores" + maze));
        obj.push(puntuacion);
        //console.log(JSON.stringify(obj));
        obj.sort(function(a, b){return b.punt - a.punt});
        obj = obj.slice(0, 9);
        localStorage.setItem("highscores" + maze, JSON.stringify(obj));
    }
}
function getHighScores(maze){
    var obj = JSON.parse(localStorage.getItem("highscores" + maze));
    var str = "";
    var i;
    for(i in obj){
        str = str + i +  ") Nombre -> " + obj[i].name+ "/ Puntuacion -> " +obj[i].punt + "\n";
    }
    return str;
    //console.log(localStorage.getItem("highscores"));
    //Actualiza los datos de Maximas puntuaciones
}

var maze1 = '{ "maze": { "scene": [ { "imgo": "null", "asset": "null", "back": "null", "front": "null", "left": "0038", "right": "0047", "img": "000BLR.png", "puzzle": "null", "_id": "000" }, { "imgo": "null", "asset": "helado", "back": "0038", "front": "null", "left": "004", "right": "0039", "img": "000BLR.png", "puzzle": "null", "_id": "001" }, { "imgo": "null", "asset": "pelota", "back": "0047", "front": "null", "left": "0048", "right": "0041", "img": "000BLR.png", "puzzle": "null", "_id": "002" }, { "imgo": "null", "asset": "null", "back": "0041", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "003" }, { "imgo": "rana", "asset": "pesas", "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "004" }, { "imgo": "null", "asset": "null", "back": "0039", "front": "null", "left": "006", "right": "null", "img": "000LL.png", "puzzle": "null", "_id": "005" }, { "imgo": "null", "asset": "null", "back": "005", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "006" }, { "imgo": "null", "asset": "piedras", "back": "0035", "front": "null", "left": "0042", "right": "008", "img": "001BLR.png", "puzzle": "null", "_id": "007" }, { "imgo": "null", "asset": "null", "back": "007", "front": "null", "left": "0011", "right": "009", "img": "001BLR.png", "puzzle": "null", "_id": "008" }, { "imgo": "null", "asset": "null", "back": "008", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "009" }, { "imgo": "null", "asset": "null", "back": "0042", "front": "null", "left": "0040", "right": "0014", "img": "001BLR.png", "puzzle": "null", "_id": "0010" }, { "imgo": "null", "asset": "farolillo", "back": "008", "front": "null", "left": "0013", "right": "0012", "img": "001BLR.png", "puzzle": "null", "_id": "0011" }, { "imgo": "null", "asset": "null", "back": "0011", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0012" }, { "imgo": "null", "asset": "null", "back": "0011", "front": "null", "left": "0015", "right": "null", "img": "001LL.png", "puzzle": "null", "_id": "0013" }, { "imgo": "null", "asset": "null", "back": "0010", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0014" }, { "imgo": "null", "asset": "arana", "back": "0013", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0015" }, { "imgo": "null", "asset": "null", "back": "0036", "front": "null", "left": "0046", "right": "0049", "img": "002BLR.png", "puzzle": "null", "_id": "0016" }, { "imgo": "null", "asset": "null", "back": "0046", "front": "null", "left": "0029", "right": "0020", "img": "002BLR.png", "puzzle": "null", "_id": "0017" }, { "imgo": "null", "asset": "null", "back": "0049", "front": "null", "left": "0019", "right": "0043", "img": "002BLR.png", "puzzle": "null", "_id": "0018" }, { "imgo": "monedas", "asset": "caja", "back": "0018", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0019" }, { "imgo": "null", "asset": "null", "back": "0017", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0020" }, { "imgo": "null", "asset": "null", "back": "0018", "front": "null", "left": "0037", "right": "0025", "img": "002BLR.png", "puzzle": "null", "_id": "0021" }, { "imgo": "null", "asset": "null", "back": "0037", "front": "null", "left": "0023", "right": "0024", "img": "002BLR.png", "puzzle": "null", "_id": "0022" }, { "imgo": "null", "asset": "null", "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0023" }, { "imgo": "null", "asset": "", "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0024" }, { "imgo": "null", "asset": "aranazos", "back": "0021", "front": "null", "left": "0026", "right": "0027", "img": "002BLR.png", "puzzle": "null", "_id": "0025" }, { "imgo": "null", "asset": "raton", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0026" }, { "imgo": "null", "asset": "null", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0027" }, { "imgo": "null", "asset": "null", "back": "0017", "front": "null", "left": "0029", "right": "0045", "img": "002BLR.png", "puzzle": "null", "_id": "0028" }, { "imgo": "null", "asset": "null", "back": "0028", "front": "null", "left": "0031", "right": "0032", "img": "002BLR.png", "puzzle": "null", "_id": "0029" }, { "imgo": "null", "asset": "farolillo", "back": "0045", "front": "null", "left": "0033", "right": "0034", "img": "002BLR.png", "puzzle": "null", "_id": "0030" }, { "imgo": "null", "asset": "null", "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0031" }, { "imgo": "null", "asset": "null", "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0032" }, { "imgo": "null", "asset": "null", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0033" }, { "imgo": "null", "asset": "null", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0034" }, { "asset": "null", "back": "0048", "front": "007", "left": "null", "right": "null", "img": "000close.png", "imgo": "000open.png", "puzzle": "001", "_id": "0035" }, { "asset": "null", "back": "0040", "front": "0016", "left": "null", "right": "null", "img": "001close.png", "imgo": "001open.png", "puzzle": "002", "_id": "0036" }, { "asset": "null", "back": "0021", "front": "0022", "left": "null", "right": "null", "img": "002close.png", "imgo": "002open.png", "puzzle": "003", "_id": "0037" }, { "imgo": "null", "asset": "aranazos", "back": "000", "front": "null", "left": "001", "right": "null", "img": "000LL.png", "puzzle": "null", "_id": "0038" }, { "imgo": "null", "asset": "pizza", "back": "001", "front": "null", "left": "005", "right": "null", "img": "000LL.png", "puzzle": "null", "_id": "0039" }, { "imgo": "null", "asset": "null", "back": "0010", "front": "null", "left": "null", "right": "0036", "img": "001RR.png", "puzzle": "null", "_id": "0040" }, { "imgo": "null", "asset": "null", "back": "002", "front": "003", "left": "null", "right": "null", "img": "000FF.png", "puzzle": "null", "_id": "0041" }, { "imgo": "null", "asset": "pesas", "back": "007", "front": "0010", "left": "null", "right": "null", "img": "001FF.png", "puzzle": "null", "_id": "0042" }, { "imgo": "null", "asset": "null", "back": "0018", "front": "0021", "left": "null", "right": "null", "img": "002FF.png", "puzzle": "null", "_id": "0043" }, { "_id": "0044" }, { "imgo": "null", "asset": "caja", "back": "0028", "front": "null", "left": "null", "right": "0030", "img": "002RR.png", "puzzle": "null", "_id": "0045" }, { "imgo": "null", "asset": "null", "back": "0016", "front": "null", "left": "0017", "right": "null", "img": "002LL.png", "puzzle": "null", "_id": "0046" }, { "imgo": "null", "asset": "null", "back": "000", "front": "null", "left": "002", "right": "null", "img": "000LL.png", "puzzle": "null", "_id": "0047" }, { "imgo": "null", "asset": "null", "back": "002", "front": "null", "left": "null", "right": "0035", "img": "000RR.png", "puzzle": "null", "_id": "0048" }, { "imgo": "null", "asset": "null", "back": "0016", "front": "0018", "left": "null", "right": "null", "img": "002FF.png", "puzzle": "null", "_id": "0049" } ] } }';


var maze2='{ "maze": { "scene": [ { "-id": "000", "back": "null", "front": "null", "left": "008", "right": "0060", "img": "000BLR.png", "puzzle": "null" }, { "-id": "001", "back": "0060", "front": "null", "left": "0044", "right": "0061", "img": "000BLR.png", "puzzle": "null" }, { "-id": "002" }, { "-id": "003", "back": "0061", "front": "0047", "left": "0062", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "004", "back": "0062", "front": "0038", "left": "0063", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "005", "back": "0063", "front": "0036", "left": "0064", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "006", "back": "0064", "front": "null", "left": "0037", "right": "0065", "img": "000BLR.png", "puzzle": "null" }, { "-id": "007", "back": "0064", "front": "0010", "left": "null", "right": "0050", "img": "000BFR.png", "puzzle": "null" }, { "-id": "008", "back": "000", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "009" }, { "-id": "0010", "back": "007", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0011", "back": "0050", "front": "null", "left": "0052", "right": "0054", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0012", "back": "0053", "front": "0067", "left": "null", "right": "0039", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0013", "back": "0052", "front": "0066", "left": "0045", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0014", "back": "0066", "front": "0048", "left": "null", "right": "0053", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0015", "back": "0054", "front": "0016", "left": "0046", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0016", "back": "0015", "front": "0068", "left": "null", "right": "0040", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0017", "back": "0067", "front": "null", "left": "0069", "right": "0019", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0018" }, { "-id": "0019", "back": "0017", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0020", "back": "0069", "front": "0051", "left": "0041", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0021", "back": "0051", "front": "null", "left": "0056", "right": "0055", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0022", "back": "0055", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0023", "back": "0070", "front": "0071", "left": "null", "right": "0024", "img": "002BFR.png", "puzzle": "null" }, { "-id": "0024", "back": "0023", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0025", "back": "0056", "front": "null", "left": "0059", "right": "0026", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0026", "back": "0025", "front": "0070", "left": "0042", "right": "null", "img": "002BFL.png", "puzzle": "null" }, { "-id": "0027", "back": "0071", "front": "0072", "left": "0029", "right": "0057", "img": "002BFLR.png", "puzzle": "null" }, { "-id": "0028", "back": "0057", "front": "null", "left": "0030", "right": "0031", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0029", "back": "0027", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0030", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0031", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0032", "back": "0072", "front": "null", "left": "0058", "right": "0034", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0033" }, { "-id": "0034", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0035", "back": "0058", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0036", "back": "005", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0037", "back": "006", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0038", "back": "004", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0039", "back": "0012", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0040", "back": "0016", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0041", "back": "0020", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0042", "back": "0026", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0043", "back": "0026", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0044", "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0045", "back": "0013", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0046", "back": "0015", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0047", "back": "003", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0048", "back": "0014", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0049", "back": "0039", "front": "null", "left": "null", "right": "0012", "img": "001B.png", "puzzle": "null" }, { "-id": "0050", "back": "007", "front": "0011", "left": "null", "right": "null", "img": "000close.png", "imgo": "000open.png", "puzzle": "000" }, { "-id": "0051", "back": "0020", "front": "0021", "left": "null", "right": "null", "img": "001close.png", "imgo": "001open.png", "puzzle": "004" }, { "-id": "0052", "back": "0011", "front": "0013", "left": "null", "right": "null", "img": "001close2.png", "imgo": "001open2.png", "puzzle": "006" }, { "-id": "0053", "back": "0014", "front": "0012", "left": "null", "right": "null", "img": "001close2.png", "imgo": "001open2.png", "puzzle": "007" }, { "-id": "0054", "back": "0011", "front": "0015", "left": "null", "right": "null", "img": "001close2.png", "imgo": "001open2.png", "puzzle": "008" }, { "-id": "0055", "back": "0021", "front": "0022", "left": "null", "right": "null", "img": "002close2.png", "imgo": "002open2.png", "puzzle": "009" }, { "-id": "0056", "back": "0021", "front": "0025", "left": "null", "right": "null", "img": "002close2.png", "imgo": "002open2.png", "puzzle": "0010" }, { "-id": "0057", "back": "0027", "front": "0028", "left": "null", "right": "null", "img": "002close2.png", "imgo": "002open2.png", "puzzle": "0011" }, { "-id": "0058", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "002close.png", "imgo": "002open.png", "puzzle": "005" }, { "-id": "0059", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "imgo": "null", "puzzle": "null" }, { "-id": "0060", "back": "000", "front": "null", "left": "001", "right": "null", "img": "000LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0061", "back": "001", "front": "003", "left": "null", "right": "null", "img": "000FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0062", "back": "003", "front": "null", "left": "null", "right": "004", "img": "000RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0063", "back": "004", "front": "null", "left": "null", "right": "005", "img": "000RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0064", "back": "005", "front": "null", "left": "006", "right": "null", "img": "000LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0065", "back": "006", "front": "007", "left": "null", "right": "null", "img": "000FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0066", "back": "0013", "front": "null", "left": "null", "right": "0014", "img": "001RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0067", "back": "0012", "front": "null", "left": "0017", "right": "null", "img": "001LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0068", "back": "0016", "front": "null", "left": "0017", "right": "null", "img": "001LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0069", "back": "0017", "front": "0020", "left": "null", "right": "null", "img": "001FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0070", "back": "0026", "front": "null", "left": "null", "right": "0023", "img": "002RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0071", "back": "0023", "front": "null", "left": "null", "right": "0027", "img": "002RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0072", "back": "0027", "front": "0032", "left": "null", "right": "null", "img": "002FF.png", "imgo": "null", "puzzle": "null" } ] } }';

var maze3='{ "maze": { "scene": [ { "-id": "000", "back": "null", "front": "0015", "left": "001", "right": "0010", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "001", "back": "000", "front": "003", "left": "002", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "002", "back": "001", "front": "006", "left": "0052", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "003", "back": "001", "front": "null", "left": "005", "right": "004", "img": "000BLR.png", "puzzle": "null" }, { "-id": "004", "back": "003", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "005", "back": "003", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "006", "back": "002", "front": "0059", "left": "007", "right": "0058", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "007", "back": "006", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "008", "back": "0059", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "009", "back": "0058", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0010", "back": "000", "front": "null", "left": "0060", "right": "0012", "img": "000BLR.png", "puzzle": "null" }, { "-id": "0011", "back": "0060", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0012", "back": "0010", "front": "null", "left": "0013", "right": "0014", "img": "000BLR.png", "puzzle": "null" }, { "-id": "0013", "back": "0012", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0014", "back": "0012", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0015", "back": "000", "front": "0016", "left": "0055", "right": "0018", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "0016", "back": "0015", "front": "null", "left": "0053", "right": "0054", "img": "000BLR.png", "puzzle": "null" }, { "-id": "0017", "back": "0055", "front": "0030", "left": "0035", "right": "0062", "img": "001BFLR.png", "puzzle": "null" }, { "-id": "0018", "back": "0015", "front": "0028", "left": "0019", "right": "0061", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "0019", "back": "0018", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0020", "back": "0061", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0021", "back": "0028", "front": "null", "left": "0022", "right": "0023", "img": "000BLF.png", "puzzle": "null" }, { "-id": "0022", "back": "0021", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0023", "back": "0021", "front": "null", "left": "0024", "right": "0025", "img": "000BLF.png", "puzzle": "null" }, { "-id": "0024", "back": "0023", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0025", "back": "0023", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0026", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0027", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0028", "back": "0018", "front": "0026", "left": "null", "right": "0027", "img": "000BFR.png", "puzzle": "null" }, { "-id": "0029", "back": "0062", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0030", "back": "0017", "front": "0032", "left": "0031", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0031", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0032", "back": "0030", "front": "0033", "left": "0034", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0033", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0034", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0035", "back": "0017", "front": "0056", "left": "null", "right": "0036", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0036", "back": "0035", "front": "0038", "left": "0039", "right": "0063", "img": "001BFLR.png", "puzzle": "null" }, { "-id": "0037", "back": "0063", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0038", "back": "0036", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0039", "back": "0036", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0040", "back": "0056", "front": "null", "left": "0042", "right": "0045", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0041", "back": "0040", "front": "0068", "left": "0044", "right": "0043", "img": "002BFLR.png", "puzzle": "null" }, { "-id": "0042", "back": "0040", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0043", "back": "0041", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0044", "back": "0041", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0045", "back": "0040", "front": "0057", "left": "0064", "right": "0046", "img": "002BFLR.png", "puzzle": "null" }, { "-id": "0046", "back": "0045", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0047", "back": "0064", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0048", "back": "0057", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0049", "back": "0048", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0050", "back": "0048", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0051", "back": "0048", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0052", "back": "002", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0053", "back": "0016", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0054", "back": "0016", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0055", "back": "0015", "front": "0017", "left": "null", "right": "null", "img": "000close.png", "imgo": "000open.png", "puzzle": "0021" }, { "-id": "0056", "back": "0035", "front": "0040", "left": "null", "right": "null", "img": "001close.png", "imgo": "001open.png", "puzzle": "0020" }, { "-id": "0057", "back": "0045", "front": "null", "left": "null", "right": "null", "img": "002close.png", "imgo": "002open.png", "puzzle": "0012" }, { "-id": "0058", "back": "006", "front": "009", "left": "null", "right": "null", "img": "000close2.png", "imgo": "000open2.png", "puzzle": "0013" }, { "-id": "0059", "back": "006", "front": "008", "left": "null", "right": "null", "img": "000close2.png", "imgo": "000open2.png", "puzzle": "0014" }, { "-id": "0060", "back": "0010", "front": "0011", "left": "null", "right": "null", "img": "000close2.png", "imgo": "000open2.png", "puzzle": "0015" }, { "-id": "0061", "back": "0018", "front": "0020", "left": "null", "right": "null", "img": "000close2.png", "imgo": "000open2.png", "puzzle": "0016" }, { "-id": "0062", "back": "0017", "front": "0029", "left": "null", "right": "null", "img": "001close2.png", "imgo": "001open2.png", "puzzle": "0017" }, { "-id": "0063", "back": "0036", "front": "0037", "left": "null", "right": "null", "img": "001close2.png", "imgo": "001open2.png", "puzzle": "0018" }, { "-id": "0064", "back": "0045", "front": "0047", "left": "null", "right": "null", "img": "002close2.png", "imgo": "002open2.png", "puzzle": "0019" } ] } }';

var questions1 = '{ "xml": { "mazepr": { "qw": [ { "pregunta": "¿Cuántas patas tiene un insecto?", "a": "4", "b": "8", "c": "6", "d": "depende del insecto", "correcta": "c" }, { "pregunta": "¿Cuál de estos animales es un mamífero?", "a": "tiburón", "b": "delfín", "c": "manta", "d": "caballito de mar", "correcta": "b" }, { "pregunta": "¿Qué parte de las matemáticas se encarga del estudio de los numeros y operaciones con estos?", "a": "aritmética", "b": "trigonometría", "c": "álegra", "d": "geometría", "correcta": "a" }, { "pregunta": "¿Cuál fue la primera raza humana?", "a": "homo-sapiens-sapiens", "b": "homo-sapiens", "c": "namlu u", "d": "homo-erectus", "correcta": "c" }, { "pregunta": "Cuál fue el primer videojuego de la historia?", "a": "Mario-Bros", "b": "Alex Kidd in the miracle world", "c": "Pong", "d": "KHY", "correcta": "c" }, { "pregunta": "¿Qué ano pertenece al ano del dragón en China?", "a": "1999", "b": "2000", "c": "2001", "d": "2002", "correcta": "b" }, { "pregunta": "¿En qué ano se celebró la primera copa de europa de fúbol?", "a": "1955/1956", "b": "1945/1946", "c": "1845/1846", "d": "1855/1856", "correcta": "a" }, { "pregunta": "¿Cuál fue la primera consola de la historia?", "a": "Magnavox Odyssey", "b": "NES", "c": "Atari Pong", "d": "TRC-1", "correcta": "a" }, { "pregunta": "¿Cuándo fue la fecha de la primera guerra mundial?", "a": "1918", "b": "1917", "c": "1915", "d": "1914", "correcta": "d" }, { "pregunta": "¿Cuántos Mister Olympia tiene Arnold Schwarzenegger?", "a": "7", "b": "16", "c": "5", "d": "2", "correcta": "a" }, { "pregunta": "¿Cómo se llamaba el perro de Asterix y Obelix?", "a": "Milú", "b": "Niebla", "c": "Idefix", "d": "Nevado", "correcta": "c" }, { "pregunta": "¿Quién fue la primera ganadora de operación triunfo?", "a": "Chenoa", "b": "Rosa López", "c": "David Bisbal", "d": "Bustamante", "correcta": "b" }, { "pregunta": "¿En qué ano se inaguró el metro de Madrid?", "a": "1919", "b": "1818", "c": "1920", "d": "1819", "correcta": "a" }, { "pregunta": "¿En qué ano se fundó ferrari?", "a": "1909", "b": "1931", "c": "1963", "d": "1939", "correcta": "d" }, { "pregunta": "¿Qué famoso compositor se quedo sordo?", "a": "1909", "b": "1931", "c": "1963", "d": "1939", "correcta": "d" }, { "pregunta": "¿Cuál de las siguientes marcas es estadounidense?", "a": "Fortuna", "b": "Malboro", "c": "Ducados", "d": "Nobel", "correcta": "b" }, { "pregunta": "¿Cuál de las siguientes consolas fue la más vendida?", "a": "Nintendo DS", "b": "PS2", "c": "Game boy advance", "d": "Wii", "correcta": "b" }, { "pregunta": "¿Cuál fue el primer presidente de Espana?", "a": "Zapatero", "b": "Aznar", "c": "Adolfo Suarez", "d": "Aznar", "correcta": "c" }, { "pregunta": "¿En qué se mide la intensidad de corriente?", "a": "Amperios", "b": "Voltios", "c": "Grados", "d": "candelas", "correcta": "a" }, { "pregunta": "¿Cuántas champions tiene el Arsenal FC?", "a": "0", "b": "1", "c": "3", "d": "4", "correcta": "a" }, { "pregunta": "¿Cuál es el animal más fuerte del mundo?", "a": "Hormiga", "b": "Gorila", "c": "Tigre", "d": "Escarabajo Rinoceronte", "correcta": "d" }, { "pregunta": "¿Cuál es el animal más fuerte del mundo?", "a": "Hormiga", "b": "Gorila", "c": "Tigre", "d": "Escarabajo Rinoceronte", "correcta": "d" }, { "pregunta": "¿Cuál es el video mas visto en youtube", "a": "Manerasde molestar a tu vecino (Rubius)", "b": "Mejores record Guinnes", "c": "Buleria", "d": "Ganma Style", "correcta": "d" } ] } } }';

