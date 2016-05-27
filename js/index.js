var obj;//contiene instancia de ajax viajes
var obj2;//contiene instancia de ajax comentarios



function peticionAJAX_GET2(url)//peticion para ajax de jugadores 
{
	obj2= crearObjAjax();
	if(obj2) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj2.onreadystatechange= procesarCambio2; // función callback: procesarCambio para comentarios
		obj2.open("GET",url, true); // Se crea petición GET a url, asíncrona ("true")
		obj2.send(); // Se envía la petición
	}
}


function procesarCambio2()//procesar cambio para jugadores
{
	if(obj2.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj2.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos comentarios -> devolviendo");//devolvemos mensaje por log
			comentarios=JSON.parse(obj2.responseText);//creamos el objeto datos con los datos parseados
			foormatear_comentarios(comentarios);//mostramos la informacion en la pagina 
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-comentarios");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

//arranque para el index
function arranque_personalizado()
{
	//peticionAJAX_GET("/practica2/rest/viaje/?u=6");//conexion para los comentarios [funcional]
		if(sessionStorage.getItem("login_session"))
		{
			//si esta logueado
			document.getElementById("noregistrado").getElementsByTagName("h4")[0].innerHTML = "Usted esta logeado, puede jugar.";
			document.getElementById("noregistrado").getElementsByTagName("h4")[0].style.color = "green";
			document.getElementById("noregistrado").style.display = "";
		}
		else
		{
			document.getElementById("noregistrado").getElementsByTagName("h4")[0].style.color = "orange";
			document.getElementById("noregistrado").style.display = "";
		}
		
		llamada_ajax_generico("GET","clasificacion");
}

function registro() //cuando le das a login aparecera esta pantalla
{
	texto = "nada";
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		mensaje.innerHTML = 
		"<div style='position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);'><h2 style='color:green;'>"
		+"Registro</h2>"
		+"<form name='registro' onsubmit='return llamada_ajax_generico(&#34;POST&#34;,&#34;registrarse&#34;);' method='POST' enctype='multipart/form-data'>"
		+"<label for='userregis'>Usuario:</label><br/><input type='text' onkeyup='llamada_ajax_generico(&#34;GET&#34;,&#34;comprobacion_de_usuario&#34;)' name='userregis' id='userregis'  class='input' pattern='[a-zA-Z]{1}[a-zA-Z0-9]{0,19}' required autofocus/><span id='comprobacion'>&#9932;</span>"
		+"<br/><label  for='password'>Contraseña:</label><br/><input type='password' name='password' id='password' class='input' pattern='[_a-zA-Z0-9-]{1,20}' onkeyup='comprobacionpass2();' required /><span id='comprobacionpass2'>&#9932;</span>"
		+"<br><label  for='password2'>Repite la contraseña:</label><br/><input type='password' name='password2' id='password2' class='input' onkeyup='comparaPassword()' pattern='[_a-zA-Z0-9-]{1,20}' required /><span id='comprobacionpass'>&#9932;</span>"
		+"<br><label for='nombre_user'>Nombre completo:</label><br/><input type='text' onkeyup='nomok();' name='nombre_user' id='nombre_user'  class='input' required/><span id='nomok'>&#9932;</span>"
		+"<br><label for='email'>Email:</label><br/><input type='email' onchange='emailok();' name='email' id='email'  class='input' required /><span id='emailok'>&#9932;</span>"
		+"<br><label for='email'>Foto(Opcional):</label><br/><input type='file' onclick='fotook(this);' onkeydown='fotook(this);' onchange='fotook(this);' onmousedown='fotook(this);' onselect='fotook(this);' name='foto' id='foto' class='input'/><span id='fotook'>&#9932;</span>"
		+"</br><input type='submit'  id='env' value='Registro'/></form><div id='errores' style='width:100%;'></div><span id='errorregistro' style='width:100%;text-align:center;'></span>"
		+"<a href='#' onclick='cerrar()'>Cerrar</a></div>";
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
	}
}

function logearse()//cuando le das a login aparecera esta pantalla
{
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		mensaje.innerHTML = 
			"<div style='position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);'><h2 style='color:green;'>"
			+"Login</h2>"
			+"<form onsubmit='return llamada_ajax_generico(&#34;POST&#34;,&#34;logearse&#34;);'>"
			+"<label  for='login'>Usuario:</label><br/><input type='text' name='userlogin' id='userlogin' pattern='[a-zA-Z0-9]+' required /></br>"
			+"<label  for='password'>Contraseña:</label><br/><input type='password' name='password' id='password' pattern='[a-zA-Z0-9]+' required />"
			+"</br></br><input type='submit' id='env' value='Login'/></form><div id='errores' style='width:100%;text-align:center;color:red;margin-top:1em;'></div>"
			+"<br/><a href='#' onclick='cerrar()'>Cerrar</a></div>";
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
	}
}

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

function procesar_cambios_de_clasificacion()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos clasificacion -> devolviendo");//devolvemos mensaje por log
			clasificacion=JSON.parse(obj_ajax.responseText);//creamos el objeto datos con los datos parseados
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			foormatear(clasificacion,"clasificacion");//mostramos la informacion en la pagina 
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function entrando()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos logearse -> devolviendo");//devolvemos mensaje por log
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			foormatear(obj_ajax.responseText,"logearse");//mostramos la informacion en la pagina 
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			document.getElementById("errores").innerHTML="Alguno de los datos introducido es incorrecto.";
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function comprobaciondeusuario()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos registro-comprobacionusuario -> devolviendo");//devolvemos mensaje por log
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			resultado=JSON.parse(obj_ajax.responseText);
			result = foormatear(resultado,"comprobacion_de_usuario");
			return result;
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function registrocomp()
{
	if(obj_ajax.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj_ajax.status == 200)
		{ 
			// El valor 200 significa que ha ido todo bien en la carga
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos registro-comprobacionusuario -> devolviendo");//devolvemos mensaje por log
			console.log("informacion devuelta:"+obj_ajax.responseText);//devolvemos por consola sus valores devueltos
			resultado=JSON.parse(obj_ajax.responseText);
			if(datos.RESULTADO == "ok")
			{
				
			}
			result = foormatear(resultado,"registro");
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-clasificacion");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}	
}

function foormatear(datos,que_es)//"que_es" segun lo que sea se pone de una forma o otra
{
	if(que_es == "clasificacion")
	{
			nodo2=document.getElementById("clasificaciones");//nodo div de index
			while(nodo2.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
			{
				nodo2.removeChild(nodo2.firstChild);	
			}
			fila=document.createElement("tr");
			fila.innerHTML = 
			'<th> Usuario:&nbsp;</th>'
			+'<th> Jugadas: <span onclick="ordenar_descentemente(1);">&dArr;</span>&nbsp;</th>'
			+'<th> Ganadas: &nbsp;</th>'
			+'<th> %Victorias: <span onclick="ordenar_descentemente(2);">&dArr;</span>&nbsp;</th>'
			+'<th> %Derrotas: &nbsp;</th>';
			nodo2.appendChild(fila);
			for (var t = datos.FILAS.length - 1; t >= 0; t--) 
			{
				login=datos.FILAS[t].LOGIN;
				jugadas=datos.FILAS[t].JUGADAS;
				ganadas=datos.FILAS[t].GANADAS;
				fila=document.createElement("tr");
				fila.innerHTML = 
				'<td id="'+login+'">'+login+'</td>'
				+'<td>'+jugadas+'</td>'
				+'<td>'+ganadas+'</td>'
				+'<td>'+((100/(parseInt(jugadas))*parseInt(ganadas))).toFixed(0)+'%</td>'
				+'<td>'+((100/(parseInt(jugadas))*(parseInt(jugadas)-parseInt(ganadas)))).toFixed(0)+'%</td>';
				nodo2.appendChild(fila);
			}
			ordenar_descentemente(1);
	}
	else if(que_es == "logearse")
	{
		sessionStorage.setItem("login_session",datos);//creamos los datos
		location.reload();
	}
	else if(que_es == "comprobacion_de_usuario")
	{
		if(datos.DISPONIBLE == "true")
		{
			document.getElementById("comprobacion").style.color="green";
			document.getElementById("comprobacion").innerHTML=" &#x02713;";
			return true;
		}
		else
		{
			document.getElementById("comprobacion").style.color="red";
			document.getElementById("comprobacion").innerHTML=" &#9932;";
			return false;
		}
	}
	else if(que_es == "registro")
	{
		mensaje = document.getElementById('mensaje');
		errorregistro = document.getElementById('errorregistro');
		if(datos.RESULTADO == "ok")
		{
			datos_alfa = JSON.stringify(datos);
			sessionStorage.setItem("login_session",datos_alfa);//creamos los datos
			mensaje.innerHTML="";
			mensaje.innerHTML="<div style='position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);text-align:center;'><span>Su registro se ha realizado correctamente, presione el siguiente </span><a href='javascript:cerrar_juego()' style='padding-right:0;padding-left:0;'>enlace</a><span> para </span><a href='javascript:cerrar_juego()' style='padding-right:0;padding-left:0;'>Cerrar</a><span> la ventana</span><br/><span>Sera redireccionado despues de presionar el enlace al juego.</span>.</div>"
		}
		else
		{
			errorregistro.style.color = "red";
			errorregistro.innerHTML = " Ha ocurrido un error revise los datos.<br/>(todo menos la imagen debe tener la verificacion de que esta correcto -> &#x02713;)";
		}
	}
	else
	{
		console.log("no se sabe lo que es por lo que no se procesa la informacion");	
	}
}

function ordenar_descentemente(metodo)
{
	nodo2=document.getElementById("clasificaciones");
	listadeelementos=nodo2.getElementsByTagName("tr");
	for (var p = 1;listadeelementos.length > p; p++) 
	{
		for (var t = 1;listadeelementos.length > t; t++) 
		{
			valor1="";
			valor2="";
			if(metodo == 1) //si se ordena por ganadas
			{
				valor1 = listadeelementos[t].getElementsByTagName("td")[1].innerHTML;
				if((t+1) < listadeelementos.length)
				{
					valor2 = listadeelementos[t+1].getElementsByTagName("td")[1].innerHTML;
				}
			}
			else if(metodo == 2) //si se ordena por victorias
			{
				valor1 = listadeelementos[t].getElementsByTagName("td")[3].innerHTML.replace("%","");
				if((t+1) < listadeelementos.length)
				{
					valor2 = listadeelementos[t+1].getElementsByTagName("td")[3].innerHTML.replace("%","");
				}
			}
			
			if(valor2 != "")
			{
				if(parseInt(valor1) < parseInt(valor2))
				{
					nodo2.insertBefore(listadeelementos[t+1],listadeelementos[t]);
					console.log("valor1 es menor que valor2 "+valor1+"--"+valor2);
				}
			}
		}
	}
}

function comparaPassword()
{
	var pass=document.registro.password.value;
	var pass2=document.registro.password2.value;

	if(pass != pass2){
		document.getElementById("comprobacionpass").style.color = "red";
		document.getElementById("comprobacionpass").innerHTML = " &#9932;";
		return false;

	}
	else
	{
		document.getElementById("comprobacionpass").style.color = "green";
		document.getElementById("comprobacionpass").innerHTML = " &#x02713;";
		return true;
	}
}

function comprobacionpass2()
{
	if(document.getElementById("password").value.length < 3)
	{
		document.getElementById("comprobacionpass2").style.color = "red";
		document.getElementById("comprobacionpass2").innerHTML = " &#9932;";
	}
	else
	{
		document.getElementById("comprobacionpass2").style.color = "green";
		document.getElementById("comprobacionpass2").innerHTML = " &#x02713;";
	}		
}

function nomok()
{
	if(document.getElementById("nombre_user").value.length < 3)
	{
		document.getElementById("nomok").style.color = "red";
		document.getElementById("nomok").innerHTML = " &#9932;";
	}
	else
	{
		document.getElementById("nomok").style.color = "green";
		document.getElementById("nomok").innerHTML = " &#x02713;";
	}		
}

function emailok()
{
	if(document.getElementById("email").value.length < 3)
	{
		document.getElementById("emailok").style.color = "red";
		document.getElementById("emailok").innerHTML = " &#9932;";
	}
	else
	{
		document.getElementById("emailok").style.color = "green";
		document.getElementById("emailok").innerHTML = " &#x02713;";
	}
}

function fotook(fot)
{
	if(fot.files[0] == undefined)
	{
		document.getElementById("fotook").style.color = "red";
		document.getElementById("fotook").innerHTML = " &#9932;";
	}
	else
	{
		document.getElementById("fotook").style.color = "green";
		document.getElementById("fotook").innerHTML = " &#x02713;";
	}
}