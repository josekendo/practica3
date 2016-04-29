var obj; // variable global que guarda el objeto XMLHttpRequest

function procesarCambio()
{
	/**
	if(obj.readyState == 1)
	{
		document.getElementById("devuelto").innerHTML = "<progress value='25' max='100'></progress> ";
	}
	else if(obj.readyState == 2)
	{
		document.getElementById("devuelto").inne75TML = "<progress value='50' max='100'></progress> ";	
	}
	else if(obj.readyState == 3)
	{
		document.getElementById("devuelto").innerHTML = "<progress value='75' max='100'></progress> ";		
	}
	else if(obj.readyState == 4)
	{
		document.getElementById("devuelto").innerHTML = "<progress value='100' max='100'></progress> ";		
	}
	**/
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos -> devolviendo");//devolvemos mensaje por log
			usuario =JSON.parse(obj.responseText);//creamos el objeto usuario con los datos parseados
			sessionStorage.setItem("login_session",obj.responseText);//creamos la sessionstorage
			document.getElementById("devuelto").innerHTML = "Login correcto, redirecionando......";//lo escribimos por si falla el slider
			zoom_activo(2,usuario.ULTIMO_ACCESO);//activamos el slider, 2 significa que muestre el mensaje de que ha funcionado correctamente
			comprobar_check();//comprobamos si el check esta pulsado
			setTimeout("redireccion_auto()",3*1000); //cuando pasan 3 segundos se redirecciona al index
		}
		else 
		{
			console.warn("no se ha podido completar la peticion html");//devolvemos mensaje por log
			document.getElementById("devuelto").innerHTML = "Login Incorrecto revise sus datos.";//lo escribimos por si falla el slider
			zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}


function peticionAJAX_POST(url) 
{
	obj = crearObjAjax();
	if (obj) 
	{ 	
		// Si se ha creado el objeto, se completa la petición ...
		// Argumentos:
		console.log("se empieza a procesar la peticion");
		if(url == "/practica2/rest/login/")
		{
			console.log("la peticion es de caracter login");
			var login = document.getElementById("userlogin").value;
			var pass = document.getElementById("password").value;
		}
		var args = "login=" + login + "&pwd=" + pass;
		//args += "&v=" + (new Date()).getTime(); // Truco: evita utilizar la cache
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange = procesarCambio; // función callback: procesarCambio
		obj.open("POST", url, true); // Se crea petición POST a url, asíncrona("true")
		// Es necesario especificar la cabecera "Content-type" para peticiones POST
		obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		obj.send(args); // Se envía la petición
		console.log("se termina de procesar la informacion");
		return false;
	}
}

function zoom_activo(modo,fecha)
{
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		if(modo == 2)
		{
			mensaje.innerHTML = "<h2 style='color:green;'>Se ha logeado correctamente</h2><h4>Sera redireccionado automaticamente</h4><h6>Ultimo Acceso:"+fecha+"</h6>";
		}
		else
		{
			mensaje.innerHTML = "<h2 style='color:red;'>Error</h2><h4>Recuerde que puede contener mayusculas,numeros y simbolos su password.</h4><button onclick='zoom_activo();'>Vale</button>";
		}
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
	}
	else
	{
		ventana.classList.remove('zoom_visible');
		document.body.classList.remove('bloqueo');
	}
}

//nos redirecciona automaticamente cuando cargamos la pagina y estamos logeados
function arranque_personalizado()
{
		if(sessionStorage.getItem("login_session"))
		{
			//si esta logueado
			redireccion();
		}
		compro_recordar();
}
//redirecciona
function redireccion_auto()
{
	document.location.href="index.html";
}
//comprobamos si esta en check el recordar si lo esta creamos un localstorage
function comprobar_check(informacion)
{
	if(document.getElementById("recordar").checked)//si pasa esta check
	{
		console.log("si esta en check recuerdo");
		localStorage.setItem("login_local",obj.responseText);
	}
	else
	{
		console.log("No esta en check recuerdo");
		localStorage.removeItem("login_local");
	}
}
//comprobamos al principio si existe login_local si existe agregamos los datos a donde pertenezcan 
function compro_recordar()
{
	if(localStorage.getItem("login_local"))
	{
		user=JSON.parse(localStorage.getItem("login_local"));
		document.getElementById("userlogin").value=user.LOGIN;
		document.getElementById("recordar").checked=true;
		document.getElementById("password").focus();
	}
}