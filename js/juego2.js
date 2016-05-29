cto="";
cvo="";
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
		// Se establece la funci�n (callback) a la que llamar cuando cambie el estado en este caso procesar_cambios que sera personalizado
		if(a_donde == "empezar")//funcionamiento correcto
		{
			datos = new FormData();
			obj_ajax.onreadystatechange= empezar;
			obj_ajax.onreadystatechange= procesar_cambios_de_clasificacion; // funci�n callback: procesarCambio para comentarios	
			url = "rest/juego/empezar/";
			datos.append("login",use);
		}
		else if(a_donde == "disparar")
		{
			obj_ajax.onreadystatechange= entrando; // funci�n callback: procesarCambio para comentarios	
			url = "rest/login/";
			use = document.getElementById("userlogin").value;
			pas = document.getElementById("password").value;
			datos = new FormData();
			datos.append("login",use);
			datos.append("pwd",pas);
		}
		else if(a_donde == "disparo_enemigo")
		{
			obj_ajax.onreadystatechange= comprobaciondeusuario; // funci�n callback: procesarCambio para comentarios	
			url = "rest/login/";
			use = document.getElementById("userregis").value;
			if(use.length <= 3)
			{
				return false;
			}
			parametros_extras=use;
		}
		else if(a_donde == "registrarse")
		{
			url = "rest/usuario/";
			obj_ajax.onreadystatechange = registrocomp;
			datos = new FormData();//formdata agrupa los datos segun clave/valor y los interpreta en el php como las variables de siempre [clave]
			usu = document.getElementById("userregis").value;
			pwd = document.getElementById("password").value;
			pw2 = document.getElementById("password2").value;
			nombre = document.getElementById("nombre_user").value;
			email = document.getElementById("email").value;
			foto =  document.querySelector('input[type=file]').files[0];
			datos.append("login",usu);//asi agregamos el valor y el nombre de la variable
			datos.append("pwd",pwd);
			datos.append("pwd2",pw2);
			datos.append("nombre",nombre);
			datos.append("email",email);
			if(foto != undefined)
			{
				datos.append("foto",foto);
			}			
		}
		
		else if(a_donde == "")
		{
			console.log("no se ha puesto a donde");
		}
		
		obj_ajax.open(tipo_de_llamada,url+parametros_extras, false); // Se crea petici�n GET a url, as�ncrona ("true")
		obj_ajax.send(datos); // Se env�a la petici�n	
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
	nodo2.innerHTML ='<canvas id="enemigo" style="text-align:center;" width="220" height="220">Tu navegador no soporta HTML5 Canvas :(</canvas>';
	document.getElementById("botonjugar").style.display = "none";
	document.getElementById("botonrotar").style.display = "none";
	desabilitar_tablero();
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
	cvo.style.width="60%";
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

	//dibujar_coordenadas_tya();
	
}

function inicializarcvo()
{
	cvo.onmousedown = function(e)
	{
			coordenadas = getPosition2(e);
			colorearcuadro2(coordenadas["x"],coordenadas["y"]);
	};
	
	cvo.onmousemove = function(e)
	{
		coordenadas = getPosition2(e);
		document.body.style.cursor = 'crosshair';
		colorearcuadro2(coordenadas["x"],coordenadas["y"]);
		coordenadas_jue=cuadrar_a_juwego(coordenadas["x"],coordenadas["y"]);
		document.getElementById("coordenadax").innerHTML=coordenadas_jue["x"].toFixed(2);
		document.getElementById("coordenaday").innerHTML=coordenadas_jue["y"].toFixed(2);
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


			cto.fillStyle = "#FF0000";
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

