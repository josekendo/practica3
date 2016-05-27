var cv="";//almacenaremos el canvas
var ctx="";//almacenaremos el contenido del canvas en formato 2d
var cw=0;
var ch=0;
var botonpulsado=false;
var tablero_posiciones= new Array();
var submarinos = [];
var buques= [];
var lanchas = [];
var portaaviones = [];
var dragItems = document.querySelectorAll('[draggable=true]');
var girado = 0;
//lleno las posiciones de los barcos

for (var i = 0; i <4; i++){
	submarinos[i] = [];
	submarinos[i]["x"] = 0;
	submarinos[i]["y"] = 0;

}
for (var i = 0; i <3; i++){
	lanchas[i] = [];
	lanchas[i]["x"] = 0;
	lanchas[i]["y"] = 0;
	lanchas[i]["girado"] = 0;

}
for (var i = 0; i <2; i++){
	buques[i] = [];
	buques[i]["x"] = 0;
	buques[i]["y"] = 0;
	buques[i]["girado"] = 0;

}

	portaaviones = [];
	portaaviones["x"] = 0;
	portaaviones["y"] = 0;
	portaaviones["girado"] = 0;


//codigo de adaptacion a firefox (firefox solo permite algunos objetos draggables)
for (var i = 0; i < dragItems.length; i++) {
  addEvent(dragItems[i], 'dragstart', function (event) {
    // store the ID of the element, and collect it on the drop later on
    event.dataTransfer.setData('Text', this.id);
  });
}
//fin de codigo de adaptacion a firefox

function arranquep()
{
	cv = document.getElementById("game");
	ctx = cv.getContext("2d");
	// cb = document.getElementById("barcos");
	// cbx = cb.getContext("2d");
	//ctx.fillRect(0, 0, 100, 100);
	cw = ((cv.width / 11).toFixed(1));//anchura del lienzo dividido entre 11 casillas
	ch = ((cv.height / 11).toFixed(1));//altura del lienzo dividido entre 11 casillas
	//alert(cw+" ---- "+ch+"\n"+cv.clientWidth+" ----------- "+cv.clientHeight)
	hacertablero();
	crear_barcos_disponibles();
	//con esta detectamos que el boton a sido pulsado
	cv.onmousedown = function(e){
			coordenadas = getPosition(e);
			colorearcuadro(coordenadas["x"],coordenadas["y"]);
	};

	
	//con esto que el dedo a sido levantado
	cv.onmouseup = function(e)
	{
		if(botonpulsado) mouseClick(e);
		botonpulsado = false;
	};
	
	cv.onmouseout = function(e)
	{
		document.body.style.cursor = 'default';
	}
	//con esto sabemos cuando esta pasando por encima
	cv.onmousemove = function(e)
	{
		coordenadas = getPosition(e);
		document.body.style.cursor = 'crosshair';
		colorearcuadro(coordenadas["x"],coordenadas["y"]);
		document.getElementById("coordenadax").innerHTML=coordenadas["x"].toFixed(2);
		document.getElementById("coordenaday").innerHTML=coordenadas["y"].toFixed(2);
	}
	
	document.onkeydown= function(e)
	{
		if(e.keyCode == 82)
		{
			alert("rotando barco");
			//rotar();
		}
		else if(e.keyCode == 74)
		{
			alert("empezando a jugar");
			//jugar();
		}
		else if(e.keyCode == 65)
		{
			alert("atacar");
			//atacar();
		}
	}

}
//creamos el tablero
function hacertablero()
{
	ctx.strokeStyle="#000000";
	ctx.moveTo(0,0);//x e y ((1+a)*cw)
	ctx.lineTo(0,cv.width);
	ctx.stroke();
	ctx.strokeStyle="#000000";
	for(a=0;a < 11;a++)
	{
		ctx.moveTo(cw*(a+1),0);//x e y ((1+a)*cw)
		ctx.lineTo(cw*(a+1),cv.height);
		ctx.stroke();
	}
	for(a=0;a < 11;a++)
	{
		ctx.moveTo(0,ch*(a+1));//x e y ((1+a)*cw)
		ctx.lineTo(cv.width,ch*(a+1));
		ctx.stroke();
	}
	ctx.fillText("A",6,34);
	ctx.fillText("B",6,54);
	ctx.fillText("C",6,74);
	ctx.fillText("D",6,94);
	ctx.fillText("E",6,114);
	ctx.fillText("F",6,134);
	ctx.fillText("G",6,154);
	ctx.fillText("H",6,174);
	ctx.fillText("I",8,194);
	ctx.fillText("J",6,214);
	
	ctx.fillText("1",28,12);
	ctx.fillText("2",48,12);
	ctx.fillText("3",68,12);
	ctx.fillText("4",88,12);
	ctx.fillText("5",108,12);
	ctx.fillText("6",128,12);
	ctx.fillText("7",148,12);
	ctx.fillText("8",168,12);
	ctx.fillText("9",188,12);
	ctx.fillText("10",204,12);
	

	dibujar_barcos_ingame();

}
//crear la parte de barcos 
 function crear_barcos_disponibles()
 {
 	var x = 1;
 	var y = 1;
 	var c=document.getElementById("sub1");
	var cbx=c.getContext("2d");

 	cbx.fillStyle = "#00BFFF";
 	cbx.fillRect(0,0,20,20);

 	var c=document.getElementById("sub2");
	var cbx=c.getContext("2d");

 	cbx.fillStyle = "#00BFFF";
 	cbx.fillRect(0,0,20,20);

  	var c=document.getElementById("sub3");
	var cbx=c.getContext("2d");

 	cbx.fillStyle = "#00BFFF";
 	cbx.fillRect(0,0,20,20);

  	var c=document.getElementById("sub4");
	var cbx=c.getContext("2d");

 	cbx.fillStyle = "#00BFFF";
 	cbx.fillRect(0,0,20,20);


 	var c=document.getElementById("lan1");
	var cbx=c.getContext("2d");
	if(girado == 0){
		x = 2;
	}
	else{
		y = 2;
	}
 	cbx.fillStyle = "#FFBF00";
 	cbx.fillRect(0,0,20*y,20*x);

 	var c=document.getElementById("lan2");
	var cbx=c.getContext("2d");

 	cbx.fillStyle = "#FFBF00";
 	cbx.fillRect(0,0,20*y,20*x);

  	var c=document.getElementById("lan3");
	var cbx=c.getContext("2d");

 	cbx.fillStyle = "#FFBF00";
 	cbx.fillRect(0,0,20*y,20*x);
// 	cbx.fillText("Barcos Disponibles",6,10);
// 	cbx.fillText("Portaaviones",20,30);
// 	cbx.fillText("Acorazados",20,80);
// 	cbx.fillText("Buques",20,130);
// 	cbx.fillText("Submarinos",20,180);
// 	cbx.fillStyle = "#00BFFF";
// 	cbx.fillRect(20,40,20,20);
// 	cbx.fillRect(40,40,20,20);
// 	cbx.fillRect(60,40,20,20);
// 	cbx.fillRect(80,40,20,20);
// 	cbx.fillStyle = "#FE2E2E";
// 	cbx.fillRect(20,90,20,20);
// 	cbx.fillRect(40,90,20,20);
// 	cbx.fillRect(60,90,20,20);
// 	cbx.fillRect(100,90,20,20);
// 	cbx.fillRect(120,90,20,20);
// 	cbx.fillRect(140,90,20,20);
// 	cbx.fillStyle = "#FFFF00";
// 	cbx.fillRect(20,140,20,20);
// 	cbx.fillRect(40,140,20,20);
// 	cbx.fillRect(80,140,20,20);
// 	cbx.fillRect(100,140,20,20);
// 	cbx.fillRect(140,140,20,20);
// 	cbx.fillRect(160,140,20,20);
// 	cbx.fillStyle = "#2EFE2E";
// 	cbx.fillRect(20,190,20,20);
// 	cbx.fillRect(60,190,20,20);
// 	cbx.fillRect(100,190,20,20);
// 	cbx.fillRect(140,190,20,20);
 }
//con esta funcion obtenemos la posicion convertida a canvas
function getPosition(event)
{
	var x = new Number();
	var y = new Number();
	var canvas = document.getElementById("game");

	if (event.x != undefined && event.y != undefined)//esto se realiza en todos los navegadores menos en firefox
	{
	  x = event.x;
	  y = event.y;
	}
	else //metodo para firefox
	{
	  x = event.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = event.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	
	xc=cv.clientWidth/cv.width;
	yc=cv.clientHeight/cv.height;
	
	x=x/xc;
	y=y/yc;
	
	var posiciones = new Array();
	posiciones["x"]=x;
	posiciones["y"]=y;
	
	return posiciones;
}

function colorearcuadro(coorx, coory)
{
	if(coorx > 19 && coory > 19)
	{
			cv.width=cv.width;

			hacertablero();//y creamos el tablero


			ctx.fillStyle = "#FF0000";
			//debemos cuadrar las coordenadas
			cuardrados=cuadrar(coorx,coory);
			ctx.fillRect(cuadrar(coorx),cuadrar(coory),cw,ch);
			ctx.clearRect(cuadrar(coorx),cuadrar(coory),cw-1,ch-1);

	}
}

function cuadrar(h)
{
	t = Math.round(h);
	if(t > 19 && t < 40)
	{
		t=20;
	}
	else if(t > 40  && t < 60)
	{
		t=40;
	}
	else if(t > 60  && t < 80)
	{
		t = 60;
	}
	else if(t > 80  && t < 100)
	{
		t = 80;
	}
	else if(t > 100  && t < 120)
	{
		t = 100;
	}
	else if(t > 120  && t < 140)
	{
		t = 120;
	}
	else if(t > 140  && t < 160)
	{
		t = 140;		
	}
	else if(t > 160  && t < 180)
	{
		t = 160;
	}
	else if(t > 180  && t < 200)
	{
		t = 180;
	}
	else if(t > 200  && t < 220)
	{
		t = 200;
	}
	
	return t;
}
//drag & drop stuff
function girar(){
	if(girado == 0){
		girado = 1;
	}
	else{
		girado = 0;
	}
	crear_barcos_disponibles();
}
//drag
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, tipo) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {

    ev.preventDefault();
	coordenadas = getPosition(ev);
    var data = ev.dataTransfer.getData("text");
    // ctx.fillStyle = "#00BFFF";

    // ctx.fillRect(coordenadas["x"],coordenadas["y"],20,20);
    var id = ev.dataTransfer.getData("Text");
    if(data == "sub1"){
		submarinos[0]["x"]=cuadrar(coordenadas["x"]);
		submarinos[0]["y"]=cuadrar(coordenadas["y"]);
		hacertablero();		
		dibujar_barcos_ingame();
    }
        if(data == "sub2"){
		submarinos[1]["x"]=cuadrar(coordenadas["x"]);
		submarinos[1]["y"]=cuadrar(coordenadas["y"]);
		hacertablero();		
		dibujar_barcos_ingame();

    }
        if(data == "sub3"){
		submarinos[2]["x"]=cuadrar(coordenadas["x"]);
		submarinos[2]["y"]=cuadrar(coordenadas["y"]);
		hacertablero();		
		dibujar_barcos_ingame();

    }
        if(data == "sub4"){
		submarinos[3]["x"]=cuadrar(coordenadas["x"]);
		submarinos[3]["y"]=cuadrar(coordenadas["y"]);
		hacertablero();		
		dibujar_barcos_ingame();

    }
        if(data == "lan1"){
		lanchas[0]["x"]=cuadrar(coordenadas["x"]);
		lanchas[0]["y"]=cuadrar(coordenadas["y"]);
		lanchas[0]["girado"] = girado;
		hacertablero();		
		dibujar_barcos_ingame();

    }
        if(data == "lan2"){
		lanchas[1]["x"]=cuadrar(coordenadas["x"]);
		lanchas[1]["y"]=cuadrar(coordenadas["y"]);
		lanchas[1]["girado"] = girado;
		hacertablero();		
		dibujar_barcos_ingame();

    }
        if(data == "lan3"){
		lanchas[2]["x"]=cuadrar(coordenadas["x"]);
		lanchas[2]["y"]=cuadrar(coordenadas["y"]);
		lanchas[2]["girado"] = girado;
		hacertablero();		
		dibujar_barcos_ingame();

    }

}
function dibujar_barcos_ingame(){
	for (var i = 0; i < submarinos.length; i++) {
		if(submarinos[i]["x"] != 0 ){
			    ctx.fillStyle = "#00BFFF";
    			ctx.fillRect(submarinos[i]["x"], submarinos[i]["y"],20,20);
    		}
	}
	for (var i = 0; i < lanchas.length; i++) {
		if(lanchas[i]["x"] != 0 ){
			    ctx.fillStyle = "#FFBF00";
			    	if(lanchas[i]["girado"]==1){
				 	   	if((lanchas[i]["x"]+40)<200){
	    				ctx.fillRect(lanchas[i]["x"], lanchas[i]["y"],40,20);
	    				}	
	    				else{
	    				ctx.fillRect(lanchas[i]["x"]-20, lanchas[i]["y"],40,20);
	    				}

	    			}
	    			else{
				 	   	if((lanchas[i]["y"]+40)<200){
	    				ctx.fillRect(lanchas[i]["x"], lanchas[i]["y"],20,40);
	    				}	
	    				else{
	    				ctx.fillRect(lanchas[i]["x"], lanchas[i]["y"]-20,20,40);
	    				}
	    			}
    		}

	}
}