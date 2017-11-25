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
    
    // BOTONES MENUS DEL JUEGO 
    $("#Bjugar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), true);
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
                        if(back!=null){
                            load(back);
                        }
                    });
    $("#bFront").click(
                function() {
                        if(front!=null){
                            load(front);
                        }
                    });
    $("#bLeft").click(
                function() {
                        if(left!=null){
                            load(left);
                        }
                    });
    $("#bRight").click(
                function() {
                        if(right!=null){
                            load(right);
                        }
                    });
    
})
var maze;
function play1(scene){
    victoria = false;
    
    maze = JSON.parse(txt1);
    /*
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txt1,"text/xml");
    */
    load(scene);
    victoria = false;
    
}





function load(scene){
    var obj = maze.maze.scene[scene];
    
    console.log(obj.img);
    console.log(obj.right);
    /*
    text = xmlDoc.getElementsByTagName("scene").item(scene);
    console.log(text);
    
    img = text.getElementsByTagName("img")[0].innerHTML;
    back = text.getElementsByTagName("back")[0].innerHTML;
    left = text.getElementsByTagName("left")[0].innerHTML;
    front = text.getElementsByTagName("front")[0].innerHTML;
    right = text.getElementsByTagName("right")[0].innerHTML;
    
    
    
    document.getElementById("background").src = "assets/lvl1/"+img;
    */
    
}


var txt1 = '{ "maze": { "scene": [ { "id": "000", "back": "null", "front": "002", "left": "001", "right": "003", "img": "000.png", "puzzle": "null", "_id": "000" }, { "id": "001", "back": "000", "front": "null", "left": "null", "right": "null", "img": "001.png", "puzzle": "null", "_id": "001" }, { "id": "002", "back": "000", "front": "null", "left": "null", "right": "null", "img": "002.png", "puzzle": "null", "_id": "002" }, { "id": "003", "back": "000", "front": "null", "left": "null", "right": "null", "img": "003.png", "puzzle": "null", "_id": "003" } ] } }';


  