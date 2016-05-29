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
		// Se establece la función (callback) a la que llamar cuando cambie el estado en este caso procesar_cambios que sera personalizado
		if(a_donde == "clasificacion")//funcionamiento correcto
		{
			obj_ajax.onreadystatechange= procesar_cambios_de_clasificacion; // función callback: procesarCambio para comentarios	
			url = "rest/clasificacion/";
			parametros_extras = "?c=10";
		}
		else if(a_donde == "logearse")
		{
			obj_ajax.onreadystatechange= entrando; // función callback: procesarCambio para comentarios	
			url = "rest/login/";
			use = document.getElementById("userlogin").value;
			pas = document.getElementById("password").value;
			datos = new FormData();
			datos.append("login",use);
			datos.append("pwd",pas);
		}
		else if(a_donde == "comprobacion_de_usuario")
		{
			obj_ajax.onreadystatechange= comprobaciondeusuario; // función callback: procesarCambio para comentarios	
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
	cto.lineTo(0,cv.width);
	cto.stroke();
	cto.strokeStyle="#000000";
	for(a=0;a < 11;a++)
	{
		cto.moveTo(cw*(a+1),0);//x e y ((1+a)*cw)
		cto.lineTo(cw*(a+1),cv.height);
		cto.stroke();
	}
	for(a=0;a < 11;a++)
	{
		cto.moveTo(0,ch*(a+1));//x e y ((1+a)*cw)
		cto.lineTo(cv.width,ch*(a+1));
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
	

	dibujar_coordenadas_tya();
}