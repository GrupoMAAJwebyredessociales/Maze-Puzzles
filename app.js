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
    
})
var maze;
function play1(scene){
    victoria = false;
    
    var parsed = JSON.parse(txt1);
    maze = parsed.maze;
    parser = new DOMParser();

    load(scene);
    victoria = false;
    
}





function load(scene){
    var intscene = parseInt(scene, 10);
    console.log(intscene);
    var obj = maze.scene[intscene];
    
    console.log(obj.img);
    console.log(obj.right);
    img = obj.img;
    back = obj.back;
    left = obj.left;
    front = obj.front;
    right = obj.right;
    document.getElementById("background").src = "assets/"+img;
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




var txt1 = '{ "maze": { "scene": [ { "back": "null", "front": "null", "left": "001", "right": "002", "img": "000BLR.png", "puzzle": "null", "_id": "000" }, { "back": "000", "front": "null", "left": "004", "right": "006", "img": "000BLR.png", "puzzle": "null", "_id": "001" }, { "back": "000", "front": "null", "left": "007", "right": "003", "img": "000BLR.png", "puzzle": "null", "_id": "002" }, { "back": "002", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "003" }, { "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "004" }, { "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null", "_id": "006" }, { "back": "002", "front": "null", "left": "0010", "right": "008", "img": "000BLR.png", "puzzle": "001", "_id": "007" }, { "back": "007", "front": "null", "left": "0011", "right": "009", "img": "001BLR.png", "puzzle": "null", "_id": "008" }, { "back": "008", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "009" }, { "back": "007", "front": "null", "left": "0016", "right": "0014", "img": "001BLR.png", "puzzle": "null", "_id": "0010" }, { "back": "008", "front": "null", "left": "0013", "right": "0012", "img": "001BLR.png", "puzzle": "null", "_id": "0011" }, { "back": "0011", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0012" }, { "back": "0011", "front": "null", "left": "0015", "right": "null", "img": "001BL.png", "puzzle": "null", "_id": "0013" }, { "back": "0010", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0014" }, { "back": "0013", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null", "_id": "0015" }, { "back": "0010", "front": "null", "left": "0017", "right": "0018", "img": "001BLR.png", "puzzle": "002", "_id": "0016" }, { "back": "0016", "front": "null", "left": "0029", "right": "0020", "img": "002BLR.png", "puzzle": "null", "_id": "0017" }, { "back": "0016", "front": "null", "left": "0019", "right": "0021", "img": "002BLR.png", "puzzle": "null", "_id": "0018" }, { "back": "0018", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0019" }, { "back": "0017", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0020" }, { "back": "0018", "front": "null", "left": "0022", "right": "0026", "img": "002BLR.png", "puzzle": "null", "_id": "0021" }, { "back": "0021", "front": "null", "left": "0023", "right": "0024", "img": "002BLR.png", "puzzle": "003", "_id": "0022" }, { "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0023" }, { "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0024" }, { "back": "0022", "front": "null", "left": "0026", "right": "0027", "img": "002BLR.png", "puzzle": "null", "_id": "0025" }, { "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0026" }, { "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0027" }, { "back": "0017", "front": "null", "left": "0029", "right": "0030", "img": "002BLR.png", "puzzle": "null", "_id": "0028" }, { "back": "0028", "front": "null", "left": "0031", "right": "0032", "img": "002BLR.png", "puzzle": "null", "_id": "0029" }, { "back": "0028", "front": "null", "left": "0033", "right": "0034", "img": "002BLR.png", "puzzle": "null", "_id": "0030" }, { "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0031" }, { "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0032" }, { "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0033" }, { "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null", "_id": "0034" } ] } }';