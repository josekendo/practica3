var cto="";//nuevo contexto del canvas enemigo(2d)
var cvo="";//canvas enemigo
var atacar=0;// 0 no hay ataque, 1 atacas tu, 2 ataca el servidor
var msg="";//Lo utilizamos para mostrar el ultimo resultado
var colu=0;//nos servira para pasar la columna a la que se esta atacando
var fil=0;//nos servira para pasar la fila a la que se esta atacando
var coordenadas_ya_utilizadas = []; // 20 como maximo puede haber tocado 
var coordenadas_ya_utilizadas_enemigo = []; // 20 como maximo puede haber tocado 
var contador1=0;//contador nuestro
var contador2=0;//contador del enemigo

//archivo de trabajo en paralelo, cuando se termine pasar todas las funciones al otro archivo
function llamada_ajax_generico(tipo_de_llamada,a_donde)//tipo_de_llamada "POST" o "GET",a donde debe ser una ruta conocida y implementada en el codigo si no se hara una llamada generica a ese punto
{
	obj_ajax= crearObjAjax();//creamos la conexion ajax
	if(obj_ajax) //comprobamos que exista
	{ 
		parametros_extras="";
		url="";
		datos="";
		// Si se ha creado el objeto, se sigue ejecutando la peticion ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado en este caso procesar_cambios que sera personalizado
		if(a_donde == "empezar")//funcionamiento correcto
		{
			datos = new FormData();
			obj_ajax.onreadystatechange= empezar;	
			url = "rest/juego/empezar/";
			use=JSON.parse(sessionStorage.getItem("login_session")).LOGIN;
			datos.append("login",use);
		}
		else if(a_donde == "disparar")
		{
			datos = new FormData();
			obj_ajax.onreadystatechange= disparar;	
			url = "rest/juego/disparo/jugador/";
			use=JSON.parse(sessionStorage.getItem("login_session")).LOGIN;
			datos.append("login",use);
			datos.append("columna",colu);
			datos.append("fila",fil);
		}
		else if(a_donde == "disparo_enemigo")
		{
			datos = new FormData();
			obj_ajax.onreadystatechange= disparar_enemigo; // función callback: procesarCambio para comentarios	
			url = "rest/juego/disparo/enemigo/";
			use=JSON.parse(sessionStorage.getItem("login_session")).LOGIN;
			datos.append("login",use);
		}
		else if(a_donde == "prueba")//esto es para hacer trampas 
		{
			obj_ajax.onreadystatechange = trampas; // función callback: procesarCambio para comentarios	
			url = "rest/barco/";
			use=JSON.parse(sessionStorage.getItem("login_session")).LOGIN;
			parametros_extras = "?login="+use;
		}
		else if(a_donde == "")
		{
			console.log("no se ha puesto a donde");
		}	
		else if(a_donde == "vic")
		{
			datos = new FormData();
			obj_ajax.onreadystatechange= vp; // función callback: procesarCambio para comentarios	
			url = "rest/juego/ganada/";
			use=JSON.parse(sessionStorage.getItem("login_session")).LOGIN;
			datos.append("login",use);
		}
		else if(a_donde == "der")
		{
			datos = new FormData();
			obj_ajax.onreadystatechange= vp; // función callback: procesarCambio para comentarios	
			url = "rest/juego/perdida/";
			use=JSON.parse(sessionStorage.getItem("login_session")).LOGIN;
			datos.append("login",use);
		}
		
		obj_ajax.open(tipo_de_llamada,url+parametros_extras, false); // Se crea petición GET a url, asíncrona ("true")
		obj_ajax.send(datos); // Se envía la petición	
	}
	else
	{
		console.warn('No existe "obj_ajax"');
	}
	
	return false;
}

function empezarjuego()//funcion que sirve para empezar el juego
{
	nodo2=document.getElementById("zona2");//nodo div de index
	while(nodo2.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
	{
		nodo2.removeChild(nodo2.firstChild);	
	}
	nodo2.innerHTML ='<p>Tablero del contricante:</p><canvas id="enemigo" width="220" height="220">Tu navegador no soporta HTML5 Canvas :(</canvas>';
	document.getElementById("botonjugar").style.display = "none";
	document.getElementById("botonrotar").style.display = "none";
	document.getElementById("botonesacciones").innerHTML = document.getElementById("botonesacciones").innerHTML + '<br/><button type="button" id="botondisparo" style="text-align:center;" disabled onclick="llamada_ajax_generico(&#34;POST&#34;,&#34;disparo_enemigo&#34;)">Dejar que me disparen</button>';
	desabilitar_tablero();
	llamada_ajax_generico("POST","empezar");
	contador1=0;//contador nuestro
	contador2=0;//contador del enemigo
}

function desabilitar_tablero()//funcion que deshabilita las opciones de nuestro tablero
{
	cv.onmousedown = function(e)
	{
		coordenadas = getPosition(e);
	};
	
	cv.onmousemove = function(e)
	{
		coordenadas = getPosition(e);
	};
	
	hacertablero();
	hacertablero_oponente();
}

function hacertablero_oponente()
{
	cvo = document.getElementById("enemigo");
	cto = cvo.getContext("2d");
	cto.strokeStyle="#000000";
	cto.moveTo(0,0);//x e y ((1+a)*cw)
	cto.lineTo(0,cvo.width);
	cto.stroke();
	cto.strokeStyle="#000000";
	for(a=0;a < 11;a++)
	{
		cto.moveTo(cw*(a+1),0);//x e y ((1+a)*cw)
		cto.lineTo(cw*(a+1),cvo.height);
		cto.stroke();
	}
	for(a=0;a < 11;a++)
	{
		cto.moveTo(0,ch*(a+1));//x e y ((1+a)*cw)
		cto.lineTo(cvo.width,ch*(a+1));
		cto.stroke();
	}
	cto.fillText("A",6,34);
	cto.fillText("B",6,54);
	cto.fillText("C",6,74);
	cto.fillText("D",6,94);
	cto.fillText("E",6,114);
	cto.fillText("F",6,134);
	cto.fillText("G",6,154);
	cto.fillText("H",6,174);
	cto.fillText("I",8,194);
	cto.fillText("J",6,214);
	
	cto.fillText("1",28,12);
	cto.fillText("2",48,12);
	cto.fillText("3",68,12);
	cto.fillText("4",88,12);
	cto.fillText("5",108,12);
	cto.fillText("6",128,12);
	cto.fillText("7",148,12);
	cto.fillText("8",168,12);
	cto.fillText("9",188,12);
	cto.fillText("10",204,12);
	
	inicializarcvo();

	//dibutar()
	
}

function inicializarcvo()
{
	cvo.onmousedown = function(e)
	{
			coordenadas = getPosition2(e);
			colorearcuadro2(coordenadas["x"],coordenadas["y"]);
			if(atacar == 1)
			{	
				coordenadas_jue = cuadrar_a_juwego(coordenadas["x"],coordenadas["y"]);
				colu=coordenadas_jue["x"];
				fil=coordenadas_jue["y"];
				if(!(coordenadayautilizada(colu,fil,1)["ocupada"]))
				{
					llamada_ajax_generico("POST","disparar");
				}
				else
				{
					document.getElementById("respuestas").style.color = "green";
					document.getElementById("respuestas").innerHTML="Esta coordenada ya ha sido atacada su estado es "+coordenadayautilizada(colu,fil,1)["estado"]+".";
				}
			}
	};
	
	cvo.onmousemove = function(e)
	{
		coordenadas = getPosition2(e);
		document.body.style.cursor = 'crosshair';
		colorearcuadro2(coordenadas["x"],coordenadas["y"]);
		coordenadas_jue=cuadrar_a_juwego(coordenadas["x"],coordenadas["y"]);
		document.getElementById("coordenadax").innerHTML=coordenadas_jue["x"];
		document.getElementById("coordenaday").innerHTML=coordenadas_jue["y"];
		dibutar();
	}
	
	cvo.onmouseup = function(e)
	{
		if(botonpulsado) mouseClick(e);
		botonpulsado = false;
	};
	
	cvo.onmouseout = function(e)
	{
		document.body.style.cursor = 'default';
		hacertablero_oponente();
	}
}

function colorearcuadro2(coorx, coory)
{
	if(coorx > 19 && coory > 19)
	{
			cvo.width=cvo.width;

			hacertablero_oponente();//y creamos el tablero

			if(atacar == 1)
			{
				cto.fillStyle = " 	#99CCFF";
			}
			else
			{
				cto.fillStyle = "#ff0000";
			}
			//debemos cuadrar las coordenadas
			cuardrados=cuadrar(coorx,coory);
			cto.fillRect(cuadrar(coorx),cuadrar(coory),cw,ch);
			cto.clearRect(cuadrar(coorx),cuadrar(coory),cw-1,ch-1);

	}
}

//cuadramos segun el juego, devuelve x como columna , y como fila, es un array
function cuadrar_a_juwego(jx,jy)
{
	jxf = Math.round(jx);
	jyf = Math.round(jy);
	
	columna = "";//x -
	fila = "";//y |
	
	if(jxf > 19 && jxf < 40)
	{
		columna = 1;
	}
	else if(jxf > 40  && jxf < 60)
	{
		columna = 2;
	}
	else if(jxf > 60  && jxf < 80)
	{
		columna = 3;
	}
	else if(jxf > 80  && jxf < 100)
	{
		columna = 4;
	}
	else if(jxf > 100  && jxf < 120)
	{
		columna = 5;
	}
	else if(jxf > 120  && jxf < 140)
	{
		columna = 6;
	}
	else if(jxf > 140  && jxf < 160)
	{
		columna = 7;		
	}
	else if(jxf > 160  && jxf < 180)
	{
		columna = 8;
	}
	else if(jxf > 180  && jxf < 200)
	{
		columna = 9;
	}
	else if(jxf > 200  && jxf < 220)
	{
		columna = 10;
	}
	
	if(jyf > 19 && jyf < 40)
	{
		fila = 1;
	}
	else if(jyf > 40  && jyf < 60)
	{
		fila = 2;
	}
	else if(jyf > 60  && jyf < 80)
	{
		fila = 3;
	}
	else if(jyf > 80  && jyf < 100)
	{
		fila = 4;
	}
	else if(jyf > 100  && jyf < 120)
	{
		fila = 5;
	}
	else if(jyf > 120  && jyf < 140)
	{
		fila = 6;
	}
	else if(jyf > 140  && jyf < 160)
	{
		fila = 7;		
	}
	else if(jyf > 160  && jyf < 180)
	{
		fila = 8;
	}
	else if(jyf > 180  && jyf < 200)
	{
		fila = 9;
	}
	else if(jyf > 200  && jyf < 220)
	{
		fila = 10;
	}
	
	coordenadas_juego = [];
	coordenadas_juego["x"] = columna;
	coordenadas_juego["y"] = fila;
	
	return coordenadas_juego;
}

function getPosition2(event)
{
	var x = new Number();
	var y = new Number();
	var canvas = document.getElementById("enemigo");

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
	
	xc=cvo.clientWidth/cvo.width;
	yc=cvo.clientHeight/cvo.height;
	
	x=x/xc;
	y=y/yc;
	
	var posiciones = new Array();
	posiciones["x"]=x;
	posiciones["y"]=y;
	
	return posiciones;
}

function empezar()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos clasificacion -> devolviendo");//devolvemos mensaje por log
			info=JSON.parse(obj_ajax.responseText);//creamos el objeto datos con los datos parseados
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			//foormatear(clasificacion,"clasificacion");//mostramos la informacion en la pagina 
			if(info.RESULTADO == "ok")
			{
				document.getElementById("respuestas").style.color = "blue";
				document.getElementById("respuestas").innerHTML="Ya a empezado el juego, le toca atacar.";
				atacar = 1;
			}
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function disparar()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos clasificacion -> devolviendo");//devolvemos mensaje por log
			info=JSON.parse(obj_ajax.responseText);//creamos el objeto datos con los datos parseados
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			//foormatear(clasificacion,"clasificacion");//mostramos la informacion en la pagina 
			if(info.RESULTADO == "ok")
			{
				coordenadas_ya_utilizadas[contador1] = [];
				coordenadas_ya_utilizadas[contador1]["x"] = colu;
				coordenadas_ya_utilizadas[contador1]["y"] = fil;
				if(info.DISPARO == 1)//tocado
				{
						document.getElementById("respuestas").style.color = "blue";
						document.getElementById("respuestas").innerHTML="Tocado, Vuelve a disparar.";
						atacar = 1;
						coordenadas_ya_utilizadas[contador1]["estado"] = "tocado";
						//aqui se llamaria a la funcion de tocado(x,y)
						if(haterminado())//si es true se termina la partida
						{
							document.getElementById("respuestas").style.color = "Green";
							document.getElementById("respuestas").innerHTML="Has ganado enhorabuena.";
							document.getElementById("botondisparo").disabled = true;
							atacar = 0;
							dibutar()
						}								
				}
				else if(info.DISPARO == -1)//agua
				{
						document.getElementById("respuestas").style.color = "blue";
						document.getElementById("respuestas").innerHTML="Agua, le toca al servidor.";
						atacar = 2;
						document.getElementById("botondisparo").disabled = false;
						coordenadas_ya_utilizadas[contador1]["estado"] = "agua";
						dibutar()
						//aqui se llamaria a la funcion de agua(x,y)

				}
				else if(info.DISPARO == 2)//tocado y hundido
				{
						document.getElementById("respuestas").style.color = "blue";
						document.getElementById("respuestas").innerHTML="Tocado y Hundido, Vuelve a disparar.";
						atacar = 1;
						coordenadas_ya_utilizadas[contador1]["estado"] = "tocado";
						//aqui se llamaria a la funcion tocado(x,y) y hundido()
						dibutar()
						if(haterminado())//si es true se termina la partida
						{
							document.getElementById("respuestas").style.color = "Green";
							document.getElementById("respuestas").innerHTML="Has ganado enhorabuena.";
							document.getElementById("botondisparo").disabled = true;
							atacar = 0;
						}								
				}
				contador1++;				
			}
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function disparar_enemigo()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos clasificacion -> devolviendo");//devolvemos mensaje por log
			info=JSON.parse(obj_ajax.responseText);//creamos el objeto datos con los datos parseados
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			//foormatear(clasificacion,"clasificacion");//mostramos la informacion en la pagina 
			if(info.RESULTADO == "ok")
			{
				colu=info.DISPARO.COLUMNA;
				fil=info.DISPARO.FILA;
				coordenadas_ya_utilizadas_enemigo[contador2] = [];
				coordenadas_ya_utilizadas_enemigo[contador2]["x"] = colu;
				coordenadas_ya_utilizadas_enemigo[contador2]["y"] = fil;
				if(disparoanosotros(info.DISPARO.COLUMNA,info.DISPARO.FILA) == -1)//agua
				{
						document.getElementById("respuestas").style.color = "blue";
						document.getElementById("respuestas").innerHTML="Agua, te toca disparar a ti.";
						document.getElementById("botondisparo").disabled = true;
						coordenadas_ya_utilizadas_enemigo[contador2]["estado"] = "agua";
						atacar = 1;
						dibutar()
						
				}
				else if(disparoanosotros(info.DISPARO.COLUMNA,info.DISPARO.FILA) == 1)//tocado
				{
						document.getElementById("respuestas").style.color = "orange";
						document.getElementById("respuestas").innerHTML="Te han tocado, les toca disparar de nuevo.";
						atacar = 2;
						document.getElementById("botondisparo").disabled = false;
						coordenadas_ya_utilizadas_enemigo[contador2]["estado"] = "tocado";
						if(haterminado())//si es true se termina la partida
						{
							document.getElementById("respuestas").style.color = "Green";
							document.getElementById("respuestas").innerHTML="Has ganado enhorabuena.";
							document.getElementById("botondisparo").disabled = true;
							atacar = 0;
							dibutar()
						}								
				}
				else if(disparoanosotros(info.DISPARO.COLUMNA,info.DISPARO.FILA) == 2)//tocado y hundido
				{
						document.getElementById("respuestas").style.color = "orange";
						document.getElementById("respuestas").innerHTML="Tocado y Hundido, les toca disparar de nuevo.";
						atacar = 2;
						document.getElementById("botondisparo").disabled = false;	
						coordenadas_ya_utilizadas_enemigo[contador2]["estado"] = "tocado";
						if(haterminado())//si es true se termina la partida
						{
							document.getElementById("respuestas").style.color = "Green";
							document.getElementById("respuestas").innerHTML="Has perdido contra la maquina, lo sentimos.";
							document.getElementById("botondisparo").disabled = true;
							atacar = 0;
							dibutar()
						}														
				}
				contador2++;
			}
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}	
}

// -1 agua, 1 tocado, 2 tocado y hundido
function disparoanosotros(x,y)
{
	x = x * 20;
	y = y * 20;
	//por defecto daremos agua
	ret = -1;
	if(x > 19 && y > 19)
	{
		var x = cuadrar(x);
		var y = cuadrar(y);
		for (var i = 0; i < submarinos.length; i++){
			if( x == submarinos[i]["x"] && y== submarinos[i]["y"]){
				ret = 1;
						
			}
		}
		for (var i = 0; i < lanchas.length; i++){

			if(lanchas[i]["girado"] == 0){
				if((y == lanchas[i]["y"] || y == lanchas[i]["y"] +20) && x== lanchas[i]["x"]){
					ret = 1;
				
				}
			}
			if(lanchas[i]["girado"] == 1){
				if((x == lanchas[i]["x"] || x == lanchas[i]["x"] +20) && y== lanchas[i]["y"]){
					ret = 1;
				
				}
			}
		}
		for (var i = 0; i < buques.length; i++){

			if(buques[i]["girado"] == 0){
				if((y == buques[i]["y"] || y == buques[i]["y"] +20 || y == buques[i]["y"] +40) && x== buques[i]["x"]){
					ret = 1;
			
				}
			}
			if(buques[i]["girado"] == 1){
				if((x == buques[i]["x"] || x == buques[i]["x"] +20 || x == buques[i]["x"] +40) && y== buques[i]["y"]){
					ret = 1;
				}
			}
		}
		if(portaaviones["girado"] == 0){
			if((y == portaaviones["y"] || y == portaaviones["y"] +20 || y == portaaviones["y"] +40 || y == portaaviones["y"] +60) && x== portaaviones["x"]){
				ret = 1;
			}
		}
		if(portaaviones["girado"] == 1){
			if((x == portaaviones["x"] || x == portaaviones["x"] +20 || x == portaaviones["x"] +40 || x == portaaviones["x"] +60) && y== portaaviones["y"]){
				ret = 1;
					
			}
		}
	return ret;
	}
}

//si ha terminado la partida true, si no false
function haterminado()
{
	
	if(atacar == 1)//comprobamos tocados del enemigo
	{
		contador_de_tocados=0;
		console.log("comprobar si a terminado nosotros");
		for(n=0; coordenadas_ya_utilizadas.length > n; n++)
		{
			if(coordenadas_ya_utilizadas[n]["estado"] == "tocado")
			{
				contador_de_tocados++;
			}
		}
	}
	else if(atacar == 2)//comprobamos tocados del 
	{
		contador_de_tocados=0;
		console.log("comprobar si a terminado enemigos");
		for(n=0; coordenadas_ya_utilizadas_enemigo.length > n; n++)
		{
			if(coordenadas_ya_utilizadas_enemigo[n]["estado"] == "tocado")
			{
				contador_de_tocados++;
			}
		}
	}
	
	if(contador_de_tocados == 20)
	{
		if(atacar == 1)
		{
			llamada_ajax_generico("POST","vic");
			Victoria();
		}
		else
		{
			llamada_ajax_generico("POST","der");
			Derrota();
		}
		return true;
	}
	else
	{
		return false;	
	}
}
//busca en los arrays si ya ha sido utilizada la coordenada devuelve un array con dos posiciones,si esta ocupada true si no false "ocupada", y "estado" agua o tocado
function coordenadayautilizada(x,y,bando)
{
	nuevo_array = [];
	nuevo_array["ocupada"] = false;
	
	if(bando == 1)//nosotros
	{
		for(f=0; coordenadas_ya_utilizadas.length > f;f++)
		{
			if(coordenadas_ya_utilizadas[f]["x"] == x && coordenadas_ya_utilizadas[f]["y"] == y)
			{
				nuevo_array["ocupada"] = true; 
				nuevo_array["estado"] = coordenadas_ya_utilizadas[f]["estado"];
				return nuevo_array; 				
			}
		}
	}
	else if(bando == 2)//el enemigo
	{
		for(f=0; coordenadas_ya_utilizadas_enemigo.length > f;f++)
		{
			if(coordenadas_ya_utilizadas_enemigo[f]["x"] == x && coordenadas_ya_utilizadas_enemigo[f]["y"] == y)
			{
				nuevo_array["ocupada"] = true; 
				nuevo_array["estado"] = coordenadas_ya_utilizadas_enemigo[f]["estado"];
				return nuevo_array; 				
			}	
		}			
	}
	
	return nuevo_array;
}
//callback para mostrar las coordenadas de los barcos
function trampas()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos clasificacion -> devolviendo");//devolvemos mensaje por log
			info=JSON.parse(obj_ajax.responseText);//creamos el objeto datos con los datos parseados
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			//foormatear(clasificacion,"clasificacion");//mostramos la informacion en la pagina 
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function Victoria() //cuando le das a login aparecera esta pantalla
{
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		mensaje.innerHTML = 
		"<div style='position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);'><h2 style='color:green;'>"
		+"<h4>Has Ganado <span style='color:green;'>Enhorabuena</span>.</h4>"
		+"<a href='#' onclick='document.location.href=&#34;index.html&#34;'>Cerrar</a></div>";
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
	}
}

function Derrota() //cuando le das a login aparecera esta pantalla
{
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		mensaje.innerHTML = 
		"<div style='position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);'><h2 style='color:green;'>"
		+"<h4>Has Perdido <span style='color:red;'>Lo sentimos :( </span>.</h4>"
		+"<a href='#' onclick='document.location.href=&#34;index.html&#34;'>Cerrar</a></div>";
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
	}
}
//lo unico que hace es gestionar la respuesta del servidor de victoria y derrota
function vp()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos clasificacion -> devolviendo");//devolvemos mensaje por log
			info=JSON.parse(obj_ajax.responseText);//creamos el objeto datos con los datos parseados
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			//foormatear(clasificacion,"clasificacion");//mostramos la informacion en la pagina 
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

//funcion que dibuja las coordenadas tocadas y agua en el tablero oponente cto cvo
function dibutar()
{
	for(s = 0;coordenadas_ya_utilizadas_enemigo.length > s; s++)
	{
		if(coordenadas_ya_utilizadas_enemigo[s]["estado"] == "tocado")
		{
			ctx.fillStyle = "#870202";
	 		ctx.fillRect(coordenadas_ya_utilizadas_enemigo[s]["x"]*20,coordenadas_ya_utilizadas_enemigo[s]["y"]*20,18,18);
		}
		if(coordenadas_ya_utilizadas_enemigo[s]["estado"] == "agua")
		{
			ctx.fillStyle = "#00FFD8";
	 		ctx.fillRect(coordenadas_ya_utilizadas_enemigo[s]["x"]*20,coordenadas_ya_utilizadas_enemigo[s]["y"]*20,18,18);
		}

	}

	for(i = 0;coordenadas_ya_utilizadas.length > i; i++)
	{
		if(coordenadas_ya_utilizadas[i]["estado"] == "tocado")
		{
			cto.fillStyle = "#870202";
	 		cto.fillRect(coordenadas_ya_utilizadas[i]["x"]*20,coordenadas_ya_utilizadas[i]["y"]*20,18,18);
		}
		if(coordenadas_ya_utilizadas[i]["estado"] == "agua")
		{
			cto.fillStyle = "#00FFD8";
	 		cto.fillRect(coordenadas_ya_utilizadas[i]["x"]*20,coordenadas_ya_utilizadas[i]["y"]*20,18,18);
		}		
	}
	return true;
}