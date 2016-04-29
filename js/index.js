var obj;//contiene instancia de ajax viajes
var obj2;//contiene instancia de ajax comentarios 
var viajes="nada";//contiene los viajes cargados
var comentarios="nada";//contiene los comentarios cargados 

function peticionAJAX_GET(url) //peticion para ajax de comentario
{
	obj= crearObjAjax();
	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para viajes
		obj.open("GET",url, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}

function peticionAJAX_GET2(url)//peticion para ajax de comentarios 
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


function procesarCambio()//procesar cambio para viajes
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos viajes -> devolviendo");//devolvemos mensaje por log
			viajes=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			foormatear_entradas(viajes);//mostramos la informacion en la pagina
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index-viajes");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function procesarCambio2()//procesar cambio para comentarios
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
	peticionAJAX_GET2("/practica2/rest/comentario/?u=10");//conexion para las entradas [funcional]
}

//mostrar datos en section [funcional]
function foormatear_entradas(a)
{
	nodo=document.getElementById("entradas");//nodo section de index
	//vamos a contar cuantos viajes hay
	for (var i = a.FILAS.length - 1; i >= 0; i--) 
	{
		//asignamos las datos a variables mas simples
		titulo = a.FILAS[i].NOMBRE;	
		descripcion = a.FILAS[i].DESCRIPCION;
		idp= a.FILAS[i].ID;
		usu= a.FILAS[i].LOGIN;
		valoracion = a.FILAS[i].VALORACION;
		foto = a.FILAS[i].FOTO;
		des = a.FILAS[i].DESCRIPCION_FOTO;
		feinicio = a.FILAS[i].FECHA_INICIO;
		//fin de la asignacion
		//la publicamos
		articulo=document.createElement("article");
		valor4="";
		valor4=valor4+"<header><h4>"+titulo+"</h4></header><div class = 'hoveroculto'><img src='fotos/"+idp+"/"+foto+"' alt='"+des+"'/><span><p>"+descripcion+"</p><a href='viaje.html?id="+idp+"'><b>Seguir Leyendo</b>&nbsp;-></a></span></div><br/>";
		valor4=valor4+"<div class='valoracion'>";
		for(h=1;h <= 5;h++)
		{
			if(h <= valoracion)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star'></span>";
			}
		}
		valor4=valor4+"</div><br/><footer><h6>Autor:"+usu+", Fecha de edicion:<time datetime='2016'>"+feinicio+"</time></h6></footer>";
		articulo.innerHTML=valor4;
		nodo.appendChild(articulo);
		console.log("monstrando entradas");
	}
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