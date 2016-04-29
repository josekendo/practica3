function comparaPassword()
{
	var pass=document.registro.password.value;
	var pass2=document.registro.password2.value;

	if(pass != pass2){
		document.getElementById("pass_no_iguales").style.display = "initial";
		return false;

	}
	else
	{
		document.getElementById("pass_no_iguales").style.display = "none";
		return true;
	}
}

function arranque_reg()
{
		if(sessionStorage.getItem("login_session"))
		{
			//si esta logueado
			//algo haremos, pero no aún
			//HA LLEGADO LA HORA
			var usuario_log=JSON.parse(sessionStorage.getItem("login_session"));
			document.getElementById("info_perfil").innerHTML="Informacion de perfil:";
			document.getElementById("titu_perfil").innerHTML="Perfil:";
			document.getElementById("info_extra").innerHTML="Puede actualizar sus datos.";
			document.getElementById("userregis").value = usuario_log.LOGIN;
			document.getElementById("userregis").disabled = true;
			document.getElementById("nombre_user").value = usuario_log.NOMBRE;
			document.getElementById("email").value = usuario_log.EMAIL;
			document.getElementById("password").required = false;
			document.getElementById("password2").required = false;
			document.getElementById("fPerfil").src="/practica2/fotos/usu/"+usuario_log.FOTO;
			document.getElementById("env").value="Actualizar Informacion";
		}
}
function peticionAJAX_POST(){//peticion ajax para crear un usuario
	url = "rest/usuario/";
	obj3 = crearObjAjax();
	if(obj3)
	{
		var fd = new FormData();//formdata agrupa los datos segun clave/valor y los interpreta en el php como las variables de siempre [clave]
		var usu = document.getElementById("userregis").value;
		var pwd = document.getElementById("password").value;
		var pw2 = document.getElementById("password2").value;
		var nombre = document.getElementById("nombre_user").value;
		var email = document.getElementById("email").value;
		var foto =  document.querySelector('input[type=file]').files[0];
		if(sessionStorage.getItem("login_session"))
		{
				fd.append("clave",JSON.parse(sessionStorage.getItem("login_session")).CLAVE);		
		}
		fd.append("login",usu);//asi agregamos el valor y el nombre de la variable
		fd.append("pwd",pwd);
		fd.append("pwd2",pw2);
		fd.append("nombre",nombre);
		fd.append("email",email);
		fd.append("foto",foto);	
		obj3.onreadystatechange = procesarCambio3;
		obj3.open("POST", url, true);
		//obj3.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); no nos hace falta con formdata
		obj3.send(fd);//enviamos el formdata
	}
}

function compruebausu(){//peticion para ajax que comprueba si el usuario está disponible 
	if(document.getElementById("userregis").value.length >= 3){
		peticionAJAX_GET2();
	}
	else{
		document.getElementById("usr_disponible").style.display = "none";
		document.getElementById("usr_no_disponible").style.display = "none";
	}
}

function peticionAJAX_GET2()//peticion para ajax de comentarios 
{
	url = "rest/login/"+ document.getElementById("userregis").value;
	obj2= crearObjAjax();
	if(obj2) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj2.onreadystatechange= procesarCambio2; // función callback: procesarCambio para viajes
		obj2.open("GET",url, true); // Se crea petición GET a url, asíncrona ("true")
		obj2.send(); // Se envía la petición
	}
}

function procesarCambio3(){ //finalmente, registramos el usuario


	if(obj3.readyState == 4){
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj3.status == 200)
		{
			ver=JSON.parse(obj3.responseText);
			
				if(ver.RESULTADO == "ok" && (!sessionStorage.getItem("login_session")))
				{
					zoom_activo("nada");
					localStorage.setItem("login_local",obj3.responseText);//lo utilizamos para almacenar el nuevo usuario
				}
				else
				{
					zoom_activo("ok");
				}
		}

	}

}

function procesarCambio2(){
	if(obj2.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj2.status == 200)
		{
			obj2.responseText;
			usu2 = JSON.parse(obj2.responseText);
			if(usu2.DISPONIBLE=="false"){
				document.getElementById("usr_no_disponible").style.display = "initial";
				document.getElementById("usr_disponible").style.display = "none";

			}
			else{
				document.getElementById("usr_disponible").style.display = "initial";
				document.getElementById("usr_no_disponible").style.display = "none";

			}
		}
	}
}
function envio()
{
	
	var file    = document.querySelector('input[type=file]').files[0];
	ok=true;
	if(!comparaPassword())
	{
		ok = false;
	}
	else
	{
		document.getElementById("pass_no_iguales").style.display = "none";
	}
	if(file)
	{
		if(file.size>500*1024)
		{
			document.getElementById("archivo_muy_grande").style.display = "initial";
			ok = false;
		}
		else
		{
			document.getElementById("archivo_muy_grande").style.display = "none";
		}
	}
	if(ok == true)//LOS IF CON DOS IGUALES O CON TRES PARA SER MAS EXACTOS
	{
		peticionAJAX_POST();
	}

	return false;//NO PONGAS UNA VARIABLE PONLO FIJO, ADEMAS AL FORMULARIO LE TIENES QUE PASAR <<<<<FALSE>>>>> NO !!!!!!TRUE!!!!!!! SI NO SE ENVIA
}

function zoom_activo(texto) //cuando te registras correctamente la ventana se oscurece y tal
{
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		if(texto == "nada")
		{
			mensaje.innerHTML = "<h2 style='color:green;'>"+"Felicidades por registrarse. Redireccionando a <a href='practica2/login.html'>login</a>"+"</h2>";
		}
		else
		{
				mensaje.innerHTML = "<h2 style='color:green;'>"+"Cambios Realizados. Redireccionando a <a href='practica2/registro.html'>Registro</a>"+"</h2>";
		}
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
		if(texto == "nada")
		{
			setTimeout("redireccion_login()",3*1000);
		}
		else
		{
			setTimeout("redireccion_registro()",3*1000);
		}
	}
}

function previsualizar() {
  var preview = document.querySelector('#fPerfil');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

//-----------conexiones ajax registro
var obj;//esta variable global almacena la conexion ajax



//sirve para procesar los cambios
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
			// Aqui se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos -> devolviendo");//devolvemos mensaje por log
			confirmacion =JSON.parse(obj.responseText);//creamos el objeto confirmacion con los datos parseados
			zoom_activo();//activamos el slider, 2 significa que muestre el mensaje de que ha funcionado correctamente
			setTimeout("redireccion_auto('login.html')",3*1000); //cuando pasan 3 segundos se redirecciona al index
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de registro");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}


//redireccionamos al login
function redireccion_login()
{
	document.location.href="login.html";
}

//redireccionamos al registro
function redireccion_registro()
{
	document.location.href="registro.html";
}

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
			// Aqui se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos -> devolviendo");//devolvemos mensaje por log
			usuario =JSON.parse(obj.responseText);//creamos el objeto usuario con los datos parseados
			zoom_activo();//activamos el slider, 2 significa que muestre el mensaje de que ha funcionado correctamente
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


/*function peticionAJAX_POST(url) 
{
	obj = crearObjAjax();
	if (obj) 
	{ 	
		// Si se ha creado el objeto, se completa la peticion ...
		// Argumentos:
		console.log("se empieza a procesar la peticion");

		console.log("la peticion es de caracter login");
		var login = document.getElementById("userlogin").value;
		var pass = document.getElementById("password").value;
	
		var args = "login=" + login + "&pwd=" + pass;

		//args += "&v=" + (new Date()).getTime(); // Truco: evita utilizar la cache
		// Se establece la funcion (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange = procesarCambio; // funcion callback: procesarCambio
		obj.open("POST", "/practica2/rest/usuario/", true); //se crea peticion post a url, asincrona ("true")
		// Es necesario especificar la cabecera "Content-type" para peticiones POST
		obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		obj.send(args); // Se envia la peticion
		console.log("se termina de procesar la informacion");;
	}
}*/