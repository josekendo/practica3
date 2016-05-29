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

function empezarjuego()
{
	alert("empezando a jugar");
}