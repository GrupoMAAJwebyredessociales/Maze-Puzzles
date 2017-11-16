// función que permite poner visible o no una sección div, asi conseguimos que
// la tabla se oculte cuando inciamos partida
var victoria;
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
                
				})
        $("#Blvl1").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl1"), true);
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

    
})
function play1(scene){
    load(scene);
    victoria = false;
    
}

function load(scene){
    var text, parser, xmlDoc;
    
    
    
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txt1,"text/xml");
    
    text = xmlDoc.getElementsByTagName("scene").item(scene);
    //console.log(text);
    
    var img = text.getElementsByTagName("img")[0].innerHTML;
    var back = text.getElementsByTagName("back")[0].innerHTML;
    var left = text.getElementsByTagName("left")[0].innerHTML;
    var front = text.getElementsByTagName("front")[0].innerHTML;
    var right = text.getElementsByTagName("right")[0].innerHTML;
    console.log(img);
    document.getElementById("background").src = "assets/lvl1/"+img;
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
    
    
}

var txt1 = "<maze> <scene id='000'> <id>000</id> <back>null</back> <front>002</front> <left>001</left> <right>003</right> <img>000.png</img> <puzzle>null</puzzle> </scene> <scene id='001'> <id>001</id> <back>000</back> <front>null</front> <left>null</left> <right>null</right> <img>001.png</img> <puzzle>null</puzzle> </scene> <scene id='002'> <id>002</id> <back>000</back> <front>null</front> <left>null</left> <right>null</right> <img>002.png</img> <puzzle>null</puzzle> </scene> <scene id='003'> <id>003</id> <back>000</back> <front>null</front> <left>null</left> <right>null</right> <img>003.png</img> <puzzle>null</puzzle> </scene> </maze>";

  