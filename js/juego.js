var cv="";//almacenaremos el canvas
var ctx="";//almacenaremos el contenido del canvas en formato 2d

function arranquep()
{
	cv = document.getElementById("game");
	ctx = cv.getContext("2d");
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 500, 500);
}