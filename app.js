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
                    else
                        {
                            
                        }
                    });
    $("#bRight").click(
                function() {
                        if(right!=null){
                            load(right);
                        }
                    });
    
})

function play1(scene){
    victoria = false;
    
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txt2,"text/xml");
    
    load(scene);
    victoria = false;
    
}





function load(scene){
    var text;
    
    text = xmlDoc.getElementsByTagName("scene").item(scene);
    console.log(text);
    
    img = text.getElementsByTagName("img")[0].innerHTML;
    back = text.getElementsByTagName("back")[0].innerHTML;
    left = text.getElementsByTagName("left")[0].innerHTML;
    front = text.getElementsByTagName("front")[0].innerHTML;
    right = text.getElementsByTagName("right")[0].innerHTML;
    
    /*console.log(img);*/
    
    document.getElementById("background").src = "assets/lvl1/"+img;
    
    
}


var txt1 = "<maze> <scene id='000'> <id>000</id> <back>null</back> <front>002</front> <left>001</left> <right>003</right> <img>000.png</img> <puzzle>null</puzzle> </scene> <scene id='001'> <id>001</id> <back>000</back> <front>null</front> <left>003</left> <right>null</right> <img>001.png</img> <puzzle>null</puzzle> </scene> <scene id='002'> <id>002</id> <back>000</back> <front>null</front> <left>001</left> <right>null</right> <img>002.png</img> <puzzle>null</puzzle> </scene> <scene id='003'> <id>003</id> <back>000</back> <front>null</front> <left>002</left> <right>null</right> <img>003.png</img> <puzzle>null</puzzle> </scene> </maze>";

var txt2 = "<maze> <scene id='000'> <back>null</back> <front>null</front> <left>001</left> <right>002</right> <img>000LR.png</img> <puzzle>null</puzzle> </scene> <scene id='001'> <back>000</back> <front>null</front> <left>004</left> <right>005</right> <img>000BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='002'> <back>000</back> <front>null</front> <left>007</left> <right>003</right> <img>000BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='003'> <back>002</back> <front>null</front> <left>null</left> <right>null</right> <img>000B.png</img> <puzzle>null</puzzle> </scene> <scene id='004'> <back>001</back> <front>null</front> <left>null</left> <right>null</right> <img>000B.png</img> <puzzle>null</puzzle> </scene> <scene id='005'> <back>001</back> <front>null</front> <left>006</left> <right>null</right> <img>000BL.png</img> <puzzle>null</puzzle> </scene> <scene id='006'> <back>005</back> <front>null</front> <left>null</left> <right>null</right> <img>000B.png</img> <puzzle>null</puzzle> </scene> <scene id='007'> <back>002</back> <front>null</front> <left>0010</left> <right>008</right> <img>000BLR.png</img> <puzzle>001</puzzle> </scene> <scene id='008'> <back>007</back> <front>null</front> <left>0011</left> <right>009</right> <img>001BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='009'> <back>008</back> <front>null</front> <left>null</left> <right>null</right> <img>001B.png</img> <puzzle>null</puzzle> </scene> <scene id='0010'> <back>007</back> <front>null</front> <left>0016</left> <right>0014</right> <img>001BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0011'> <back>008</back> <front>null</front> <left>0013</left> <right>0012</right> <img>001BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0012'> <back>0011</back> <front>null</front> <left>null</left> <right>null</right> <img>001B.png</img> <puzzle>null</puzzle> </scene> <scene id='0013'> <back>0011</back> <front>null</front> <left>0015</left> <right>null</right> <img>001BL.png</img> <puzzle>null</puzzle> </scene> <scene id='0014'> <back>0010</back> <front>null</front> <left>null</left> <right>null</right> <img>001B.png</img> <puzzle>null</puzzle> </scene> <scene id='0015'> <back>0013</back> <front>null</front> <left>null</left> <right>null</right> <img>001B.png</img> <puzzle>null</puzzle> </scene> <scene id='0016'> <back>0010</back> <front>null</front> <left>0017</left> <right>0018</right> <img>001BLR.png</img> <puzzle>002</puzzle> </scene> <scene id='0017'> <back>0016</back> <front>null</front> <left>0029</left> <right>0020</right> <img>002BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0018'> <back>0016</back> <front>null</front> <left>0019</left> <right>0021</right> <img>002BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0019'> <back>0018</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0020'> <back>0017</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0021'> <back>0018</back> <front>null</front> <left>0022</left> <right>0026</right> <img>002BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0022'> <back>0021</back> <front>null</front> <left>0023</left> <right>0024</right> <img>002BLR.png</img> <puzzle>003</puzzle> </scene> <scene id='0023'> <back>0022</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0024'> <back>0022</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0025'> <back>0022</back> <front>null</front> <left>0026</left> <right>0027</right> <img>002BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0026'> <back>0025</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0027'> <back>0025</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0028'> <back>0017</back> <front>null</front> <left>0029</left> <right>0030</right> <img>002BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0029'> <back>0028</back> <front>null</front> <left>0031</left> <right>0032</right> <img>002BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0030'> <back>0028</back> <front>null</front> <left>0033</left> <right>0034</right> <img>002BLR.png</img> <puzzle>null</puzzle> </scene> <scene id='0031'> <back>0029</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0032'> <back>0029</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0033'> <back>0030</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> <scene id='0034'> <back>0030</back> <front>null</front> <left>null</left> <right>null</right> <img>002B.png</img> <puzzle>null</puzzle> </scene> </maze>";