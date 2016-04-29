var obj;//contiene instancia de ajax viajes
var obj2;//contiene instancia de ajax comentarios 
var viajes="nada";//contiene los viajes cargados
var comentarios="nada";//contiene los comentarios cargados 



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
	peticionAJAX_GET("/practica2/rest/viaje/?u=6");//conexion para los comentarios [funcional]
}

//mostrar datos en comentarios
function foormatear_comentarios(b)
{
	nodo2=document.getElementById("come");//nodo div de index
	while(nodo2.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
	{
		nodo2.removeChild(nodo2.firstChild);	
 	}
	//vamos a contar cuantos viajes hay
	for (var t = b.FILAS.length - 1; t >= 0; t--) 
	{
		//asignamos las datos a variables mas simples
		idc=b.FILAS[t].ID;
		tituloc=b.FILAS[t].TITULO;
		texto=b.FILAS[t].TEXTO;
		fecha=b.FILAS[t].FECHAHORA;
		idv=b.FILAS[t].ID_VIAJE;
		usuc=b.FILAS[t].LOGIN;
		nv=b.FILAS[t].NOMBRE_VIAJE;
		//fin de la asignacion
		//la publicamos
		articulo2=document.createElement("p");
		articulo2.innerHTML="<span>"+usuc+" -> </span>"+texto+"<span class='fecha_comentarios'><a href='viaje.html?id="+idv+"#comentario"+idc+"'>Ir</a><time datetime='"+fecha+"'>"+fecha+"</time></span>";
		nodo2.appendChild(articulo2);
	}
	console.log("monstrando comentarios");
}