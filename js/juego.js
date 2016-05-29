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
	cv.onclick = function(e){
			coordenadas = getPosition(e);
			borrar_barco(coordenadas["x"],coordenadas["y"]);
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
			rotar();
		}
		else if(e.keyCode == 74)
		{
			empezarjuego();
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
 	if(submarinos[0]["x"] == 0){
		cbx.fillStyle = "#00BFFF";
 		cbx.fillRect(0,0,20,20);
	}
	else{
		cbx.clearRect(0,0,90,90);
	}
 	var c=document.getElementById("sub2");
	var cbx=c.getContext("2d");

 	if(submarinos[1]["x"] == 0){
		cbx.fillStyle = "#00BFFF";
 		cbx.fillRect(0,0,20,20);
	}
	else{
		cbx.clearRect(0,0,90,90);
	}
  	var c=document.getElementById("sub3");
	var cbx=c.getContext("2d");

 	if(submarinos[2]["x"] == 0){
		cbx.fillStyle = "#00BFFF";
 		cbx.fillRect(0,0,20,20);
	}
	else{
		cbx.clearRect(0,0,90,90);
	}
  	var c=document.getElementById("sub4");
	var cbx=c.getContext("2d");

 	if(submarinos[3]["x"] == 0){
		cbx.fillStyle = "#00BFFF";
 		cbx.fillRect(0,0,20,20);
	}
	else{
		cbx.clearRect(0,0,90,90);
	}	
	if(girado == 0){
		x = 2;
	}
	else{
		y = 2;
	}

 	var c=document.getElementById("lan1");
	var cbx=c.getContext("2d");

	cbx.clearRect(0,0,90,90);
 	if(lanchas[0]["x"] == 0){

	 	cbx.fillStyle = "#FFBF00";
	 	cbx.fillRect(0,0,20*y,20*x);

	}
	else{
		cbx.clearRect(0,0,90,90);
	}
 	var c=document.getElementById("lan2");
	var cbx=c.getContext("2d");
	cbx.clearRect(0,0,90,90);
 	if(lanchas[1]["x"] == 0){

	 	cbx.fillStyle = "#FFBF00";
	 	cbx.fillRect(0,0,20*y,20*x);

	}
	else{
		cbx.clearRect(0,0,90,90);
	}

  	var c=document.getElementById("lan3");
	var cbx=c.getContext("2d");
	cbx.clearRect(0,0,90,90);
 	if(lanchas[2]["x"] == 0){

	 	cbx.fillStyle = "#FFBF00";
	 	cbx.fillRect(0,0,20*y,20*x);

	}
	else{
		cbx.clearRect(0,0,90,90);
	}

 	x=1;
 	y=1;

 	if(girado == 0){
		x = 3;
	}
	else{
		y = 3;
	}
 	var c=document.getElementById("buq1");
	var cbx=c.getContext("2d");
	cbx.clearRect(0,0,90,90);

 	if(buques[0]["x"] == 0){

	 	cbx.fillStyle = "#00EF4E";
	 	cbx.fillRect(0,0,20*y,20*x);

	}
	else{
		cbx.clearRect(0,0,90,90);
	}
 	var c=document.getElementById("buq2");
	var cbx=c.getContext("2d");
	cbx.clearRect(0,0,90,90);

 	if(buques[1]["x"] == 0){

	 	cbx.fillStyle = "#00EF4E";
	 	cbx.fillRect(0,0,20*y,20*x);

	}
	else{
		cbx.clearRect(0,0,90,90);
	}
 	var c=document.getElementById("port");
	var cbx=c.getContext("2d");
	cbx.clearRect(0,0,90,90);

 	if(girado == 0){
		x = 4;
	}
	else{
		y = 4;
	}
 	if(portaaviones["x"] == 0){

	 	cbx.fillStyle = "#FF0000";
	 	cbx.fillRect(0,0,20*y,20*x);

	}
	else{
		cbx.clearRect(0,0,90,90);
	}
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
function borrar_barco(coorx, coory){
	if(coorx > 19 && coory > 19)
	{
	var x = cuadrar(coorx);
	var y = cuadrar(coory);
	for (var i = 0; i < submarinos.length; i++){
		if( x == submarinos[i]["x"] && y== submarinos[i]["y"]){
			submarinos[i]["x"] = 0;
			submarinos[i]["y"] = 0;
		}
	}
	for (var i = 0; i < lanchas.length; i++){

		if(lanchas[i]["girado"] == 0){
			if((y == lanchas[i]["y"] || y == lanchas[i]["y"] +20) && x== lanchas[i]["x"]){
				lanchas[i]["x"] = 0;
				lanchas[i]["y"] = 0;
			}
		}
		if(lanchas[i]["girado"] == 1){
			if((x == lanchas[i]["x"] || x == lanchas[i]["x"] +20) && y== lanchas[i]["y"]){
				lanchas[i]["x"] = 0;
				lanchas[i]["y"] = 0;
			}
		}
	}
	for (var i = 0; i < buques.length; i++){

		if(buques[i]["girado"] == 0){
			if((y == buques[i]["y"] || y == buques[i]["y"] +20 || y == buques[i]["y"] +40) && x== buques[i]["x"]){
				buques[i]["x"] = 0;
				buques[i]["y"] = 0;
			}
		}
		if(buques[i]["girado"] == 1){
			if((x == buques[i]["x"] || x == buques[i]["x"] +20 || x == buques[i]["x"] +40) && y== buques[i]["y"]){
				buques[i]["x"] = 0;
				buques[i]["y"] = 0;
			}
		}
	}
if(portaaviones["girado"] == 0){
	if((y == portaaviones["y"] || y == portaaviones["y"] +20 || y == portaaviones["y"] +40 || y == portaaviones["y"] +60) && x== portaaviones["x"]){
		portaaviones["x"] = 0;
		portaaviones["y"] = 0;
	}
}
if(portaaviones["girado"] == 1){
	if((x == portaaviones["x"] || x == portaaviones["x"] +20 || x == portaaviones["x"] +40 || x == portaaviones["x"] +60) && y== portaaviones["y"]){
		portaaviones["x"] = 0;
		portaaviones["y"] = 0;
	}
}
}
	dibujar_barcos_ingame();
	hacertablero();//y creamos el tablero
	crear_barcos_disponibles();

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
	if(!(choca(cuadrar(coordenadas["x"]),cuadrar(coordenadas["y"]))[0]) && coordenadas["x"] > 19 && coordenadas["y"] >19)//esto funciona cuando no choca con nada
	{
		// ctx.fillRect(coordenadas["x"],coordenadas["y"],20,20);
		var id = ev.dataTransfer.getData("Text");

		
		if(data == "sub1" )
		{
			submarinos[0]["x"]=cuadrar(coordenadas["x"]);
			submarinos[0]["y"]=cuadrar(coordenadas["y"]);
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();


		}
		
		if(data == "sub2")
		{
			submarinos[1]["x"]=cuadrar(coordenadas["x"]);
			submarinos[1]["y"]=cuadrar(coordenadas["y"]);
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();
		}
		
		if(data == "sub3")
		{
			submarinos[2]["x"]=cuadrar(coordenadas["x"]);
			submarinos[2]["y"]=cuadrar(coordenadas["y"]);
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();
		}
		
		if(data == "sub4")
		{
			submarinos[3]["x"]=cuadrar(coordenadas["x"]);
			submarinos[3]["y"]=cuadrar(coordenadas["y"]);
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();
		}
		
		if(data == "lan1" && chocar_recursivo(2,lanchas[0]["girado"],coordenadas))
		{
				lanchas[0]["x"]=cuadrar(coordenadas["x"]);
				lanchas[0]["y"]=cuadrar(coordenadas["y"]);
				lanchas[0]["girado"] = girado;
				if(girado == 1)
				{
					//si las lanchas se salen, las centro
					if((lanchas[0]["x"]+20)>200){
						lanchas[0]["x"] = lanchas[0]["x"] -20
					}
				}
				else
				{
					if((lanchas[0]["y"]+20)>200){
						lanchas[0]["y"] = lanchas[0]["y"] -20
					}
				}
				hacertablero();		
				dibujar_barcos_ingame();
				crear_barcos_disponibles();

		}
		else if(data == "lan1")
		{
			document.getElementById("respuestas").style.color = "red";
			document.getElementById("respuestas").style.textAlign = "center";
			document.getElementById("respuestas").innerHTML="No se puede poner, solaparia un barco.";
			return false;
		}
		
		if(data == "lan2" && chocar_recursivo(2,lanchas[0]["girado"],coordenadas))
		{
			lanchas[1]["x"]=cuadrar(coordenadas["x"]);
			lanchas[1]["y"]=cuadrar(coordenadas["y"]);
			lanchas[1]["girado"] = girado;
			if(girado == 1){
				//si las lanchas se salen, las centro
				if((lanchas[1]["x"]+20)>200){
					lanchas[1]["x"] = lanchas[0]["x"] -20
				}
			}
			else{
					if((lanchas[1]["y"]+20)>200){
					lanchas[1]["y"] = lanchas[1]["y"] -20
				}
			}
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();


		}
		else if(data == "lan2")
		{
			document.getElementById("respuestas").style.color = "red";
			document.getElementById("respuestas").style.textAlign = "center";
			document.getElementById("respuestas").innerHTML="No se puede poner, solaparia un barco.";
			return false;
		}
		
		if(data == "lan3" && chocar_recursivo(2,lanchas[0]["girado"],coordenadas))
		{
			lanchas[2]["x"]=cuadrar(coordenadas["x"]);
			lanchas[2]["y"]=cuadrar(coordenadas["y"]);
			lanchas[2]["girado"] = girado;
			if(girado == 1){
				//si las lanchas se salen, las centro
				if((lanchas[2]["x"]+20)>200){
					lanchas[2]["x"] = lanchas[2]["x"] -20
				}
			}
			else{
					if((lanchas[2]["y"]+20)>200){
					lanchas[2]["y"] = lanchas[2]["y"] -20
				}
			}
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();

		}
		else if(data == "lan3")
		{
			
			document.getElementById("respuestas").style.color = "red";
			document.getElementById("respuestas").style.textAlign = "center";
			document.getElementById("respuestas").innerHTML="No se puede poner, solaparia un barco.";
			return false;
		}
		
		if(data == "buq1" && chocar_recursivo(3,lanchas[0]["girado"],coordenadas))
		{
			buques[0]["x"]=cuadrar(coordenadas["x"]);
			buques[0]["y"]=cuadrar(coordenadas["y"]);
			buques[0]["girado"] = girado;
			if(girado == 1){
				//si las buques se salen, las centro
				if((buques[0]["x"]+20)>=200){
					if((buques[0]["x"]+20) == 200){
						buques[0]["x"] = buques[0]["x"] -20;
					}
					else{
						buques[0]["x"] = buques[0]["x"] -40;

					}
				}
			}
			else{
				if((buques[0]["y"]+20)>=200){
					if((buques[0]["y"]+20) == 200){
						buques[0]["y"] = buques[0]["y"] -20;
					}
					else{
						buques[0]["y"] = buques[0]["y"] -40;

					}
				}			
			}			
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();


		}
		else if(data == "buq1")
		{
			document.getElementById("respuestas").style.color = "red";
			document.getElementById("respuestas").style.textAlign = "center";
			document.getElementById("respuestas").innerHTML="No se puede poner, solaparia un barco.";
			return false;
		}
		
		if(data == "buq2" && chocar_recursivo(3,lanchas[0]["girado"],coordenadas))
		{
			buques[1]["x"]=cuadrar(coordenadas["x"]);
			buques[1]["y"]=cuadrar(coordenadas["y"]);
			buques[1]["girado"] = girado;
			if(girado == 1){
				//si las buques se salen, las centro
				if((buques[1]["x"]+20)>=200){
					if((buques[1]["x"]+20) == 200){
						buques[1]["x"] = buques[1]["x"] -20;
					}
					else{
						buques[1]["x"] = buques[1]["x"] -40;

					}
				}
			}
			else{
				if((buques[1]["y"]+20)>=200){
					if((buques[1]["y"]+20) == 200){
						buques[1]["y"] = buques[1]["y"] -20;
					}
					else{
						buques[1]["y"] = buques[1]["y"] -40;

					}
				}			
			}
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();


		}
		else if(data == "buq2")
		{
			document.getElementById("respuestas").style.color = "red";
			document.getElementById("respuestas").style.textAlign = "center";
			document.getElementById("respuestas").innerHTML="No se puede poner, solaparia un barco.";
			return false;
		}
		
		if(data == "port" && chocar_recursivo(4,lanchas[0]["girado"],coordenadas))
		{
			portaaviones["x"]=cuadrar(coordenadas["x"]);
			portaaviones["y"]=cuadrar(coordenadas["y"]);
			portaaviones["girado"] = girado;
			if(girado == 1){
				//si las buques se salen, las centro
				if((portaaviones["x"]+80)>200){
					if((portaaviones["x"])==200){
						portaaviones["x"] = portaaviones["x"] -60
					}
					else if((portaaviones["x"]+40)==200){
						portaaviones["x"] = portaaviones["x"] -20
					}
					else if((portaaviones["x"]+20)==200){
						portaaviones["x"] = portaaviones["x"] -40
					}
				}
			}
			else{
				//si las buques se salen, las centro
				if((portaaviones["y"]+80)>200){
					if((portaaviones["y"])==200){
						portaaviones["y"] = portaaviones["y"] -60
					}
					else if((portaaviones["y"]+40)==200){
						portaaviones["y"] = portaaviones["y"] -20
					}
					else if((portaaviones["y"]+20)==200){
						portaaviones["y"] = portaaviones["y"] -40
					}
				}
			}
			hacertablero();		
			dibujar_barcos_ingame();
			crear_barcos_disponibles();


		}
		else if(data == "port")
		{
			document.getElementById("respuestas").style.color = "red";
			document.getElementById("respuestas").style.textAlign = "center";
			document.getElementById("respuestas").innerHTML="No se puede poner, solaparia un barco.";
			return false;
		}
	}
	else
	{
		document.getElementById("respuestas").style.color = "red";
		document.getElementById("respuestas").style.textAlign = "center";
		document.getElementById("respuestas").innerHTML="No puedes poner un barco ahí.";
	}
}

function dibujar_barcos_ingame(){
	for (var i = 0; i < submarinos.length; i++) 
	{
		if(submarinos[i]["x"] != 0 )
		{
			    ctx.fillStyle = "#00BFFF";
    			ctx.fillRect(submarinos[i]["x"], submarinos[i]["y"],20,20);
    	}
	}
	
	for (var i = 0; i < lanchas.length; i++) 
	{
		if(lanchas[i]["x"] != 0 )
		{
			ctx.fillStyle = "#FFBF00";
			if(lanchas[i]["girado"]==1)
			{
				ctx.fillRect(lanchas[i]["x"], lanchas[i]["y"],40,20);
			}
			else
			{
				ctx.fillRect(lanchas[i]["x"], lanchas[i]["y"],20,40);
			}
    	}

	}
	
	for (var i = 0; i < buques.length; i++)
	{
		if(buques[i]["x"] != 0 )
		{
			ctx.fillStyle = "#00EF4E";
			if(buques[i]["girado"]==1)
			{
				ctx.fillRect(buques[i]["x"], buques[i]["y"],60,20);

			}
			else
			{
				ctx.fillRect(buques[i]["x"], buques[i]["y"],20,60);
			}
    	}

	}
	
	if(portaaviones["x"] != 0)
	{
		ctx.fillStyle = "#FF0000";
		if(portaaviones["girado"] == 1)
		{
			ctx.fillRect(portaaviones["x"], portaaviones["y"],80,20);

	    }
	    else
		{
	    	ctx.fillRect(portaaviones["x"], portaaviones["y"],20,80);
	    }

	}
	
	comprobar_boton_jugar();
}
//comprobamos que exista un barco en esa posicion se nos tiene que dar la posicion
// VALORES DEVUELTOS: ARRAY de 4 posiciones (false o true,numerico,ARRAY de coordenadas(x,y),false o true)
// Explicacion de valores del array: [0] si existe true si no false; [1] numero de posiciones que ocupa; [2] Barco
function choca(x,y)
{
	acasochoca = [];
	acasochoca[0] = false;
	todos_los_barcos = [];
	todos = todos_los_barcos.concat(submarinos,buques,portaaviones,lanchas);
	tipo = 0;
	for(h = 0; todos.length > h;h++)
	{
		if(h < 4)
		{
			tipo = 1;//submarinos
			portar=false;
		}
		else if(h < 6)
		{
			tipo = 3;//lanchas
			portar=false;
		}
		else if(h < 7)
		{
			tipo = 4;//portaaviones
			portar=true;
		}
		else if(h < 9)
		{
			tipo = 2;//buques
			portar=false;
		}
		
		if(portar)//solo para submarino porque tiene un array diferente
		{
			if(portaaviones["girado"] == 0)// | vertical
			{
				cuantohayquesumar = ((20*tipo)-20);
				if(x == portaaviones["x"])
				{
					if(y >= portaaviones["y"] && y <= (portaaviones["y"]+cuantohayquesumar))
					{
						console.log("esta sobre un barco que esta en posicion vertical");
						acasochoca[0] = true;
						acasochoca[1] = tipo;
						acasochoca[2] = portaaviones;
						return acasochoca;
					}
				}			
			}
			else// - horizontal 
			{
				cuantohayquesumar = ((20*tipo)-20);
				if(y == portaaviones["y"])
				{
					if(x >= portaaviones["x"] && x <= (portaaviones["x"]+cuantohayquesumar))
					{
						console.log("esta sobre un barco que esta en posicion horizontal");
						acasochoca[0] = true;
						acasochoca[1] = tipo;
						acasochoca[2] = portaaviones;
						return acasochoca;
					}
				}			
			}
		}
		else
		{
			if(todos[h]["girado"] == undefined)//esto por si son submarinos que no tienen rotacion
			{
				if(x == todos[h]["x"] && y == todos[h]["y"])
				{
						acasochoca[0] = true;
						acasochoca[1] = tipo;
						acasochoca[2] = todos[h];
						return acasochoca;
				}
			}
			else if(todos[h]["girado"] == 0)// | vertical
			{
				cuantohayquesumar = ((20*tipo)-20);
				if(x == todos[h]["x"])
				{
					if(y >= todos[h]["y"] && y <= (todos[h]["y"]+cuantohayquesumar))
					{
						console.log("esta sobre un barco que esta en posicion vertical");
						acasochoca[0] = true;
						acasochoca[1] = tipo;
						acasochoca[2] = todos[h];
						return acasochoca;
					}
				}			
			}
			else// - horizontal 
			{
				cuantohayquesumar = ((20*tipo)-20);
				if(y == todos[h]["y"])
				{
					if(x >= todos[h]["x"] && x <= (todos[h]["x"]+cuantohayquesumar))
					{
						console.log("esta sobre un barco que esta en posicion horizontal");
						acasochoca[0] = true;
						acasochoca[1] = tipo;
						acasochoca[2] = todos[h];
						return acasochoca;
					}
				}			
			}
		}
	}
	console.log("No choca con ningun barco");
	return acasochoca;
}

function chocar_recursivo(numerodecuadros, giro, coorde)
{
	for(g = 0;numerodecuadros > g;g++)
	{
		medida= (g*20);
		if(g == 0)
		{
			medida= (g*20)+20;
		}
		
		if(giro == 0)// |
		{
			resultado = choca(cuadrar(coorde["x"]),cuadrar((coorde["y"]+medida)));
		}
		else// -
		{
			resultado = choca(cuadrar(coorde["x"]+medida),cuadrar(coorde["y"]));
		}
		
		if(resultado[0])
		{
			return false;	
		}
	}
	
	return true;
}

function barcos_estan_tablero()//retorna true si todos los barcos estan en el tablero
{
	todos_los_barcos = [];
	todos = todos_los_barcos.concat(submarinos,buques,portaaviones,lanchas);
	for(m = 0; todos.length > m; m++)
	{
		if(m < 4)
		{
			tipo2 = 1;//submarinos
			portar2=false;
		}
		else if(m < 6)
		{
			tipo2 = 3;//lanchas
			portar2=false;
		}
		else if(m < 7)
		{
			tipo2 = 4;//portaaviones
			portar2 =true;
		}
		else if(m < 9)
		{
			tipo2 = 2;//buques
			portar2 =false;
		}	

		if(portar2)
		{
			if(!(portaaviones["x"] != 0 && portaaviones["y"] != 0))
			{
				return false;
			}
		}
		else 
		{
			if(!(todos[m]["x"] != 0 && todos[m]["y"] != 0))
			{
				return false;
			}
		}
	}
	return true;
}

function comprobar_boton_jugar()//si estan todos los barcos se habilita el boton de jugar
{
	if(barcos_estan_tablero())
	{
		 document.getElementById("botonjugar").disabled = false;
	}
	else
	{
		 document.getElementById("botonjugar").disabled = true;
	}
}
//funcion que dibuja las coordenadas tocadas y agua en el tablero oponente cto cvo
function dibujar_coordenadas_tya()
{
	alert("ahora dibujamos las coordenadas tocadas y agua");
	//allevamos

	for(var i = 0; i<coordenadas_ya_utilizadas_enemigo.lenght; i++){
		if(coordenadas_ya_utilizadas_enemigo["estado"] == "tocado"){
			cbx.fillStyle = "#870202";
	 		cbx.fillRect(coordenadas_ya_utilizadas_enemigo["x"]+1,coordenadas_ya_utilizadas_enemigo["y"]+1,18,18);
		}
		if(coordenadas_ya_utilizadas_enemigo["estado"] == "agua"){
			cbx.fillStyle = "#00FFD8";
	 		cbx.fillRect(coordenadas_ya_utilizadas_enemigo["x"]+1,coordenadas_ya_utilizadas_enemigo["y"]+1,18,18);
		}

	}
	for(var i = 0; i<coordenadas_ya_utilizadas_enemigo.lenght; i++){
		if(coordenadas_ya_utilizadas_enemigo["estado"] == "tocado"){
			cbx.fillStyle = "#870202";
	 		cbx.fillRect(coordenadas_ya_utilizadas_enemigo["x"]+1,coordenadas_ya_utilizadas_enemigo["y"]+1,18,18);
		}
		if(coordenadas_ya_utilizadas_enemigo["estado"] == "agua"){
			cbx.fillStyle = "#00FFD8";
	 		cbx.fillRect(coordenadas_ya_utilizadas_enemigo["x"]+1,coordenadas_ya_utilizadas_enemigo["y"]+1,18,18);
		}

	}

}