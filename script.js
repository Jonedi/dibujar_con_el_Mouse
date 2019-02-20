document.addEventListener("mouseenter", prepararLienzo);

var cuadro = document.getElementById("area_dibujo"); //invoca el "id" de canvas en html
var papel = cuadro.getContext ("2d"); //se obtiene el contexto
var lienzoLimit = cuadro.getBoundingClientRect(); // Se obtiene el limite del canvas
var linePaint = false; // Dice si pintar o no
var posAct; //Posición actual donde se hace clic

// Prepara el cuadro para dibujar
function prepararLienzo()
{
    cuadro.addEventListener ("mousedown", cambiarEstado); // al soltar el botón del mouse realiza la funcion
    cuadro.addEventListener ("mouseup", cambiarEstado); // al oprimir el botón realiza la función
    cuadro.addEventListener ("mousemove", pintarLinea); // al mover el mouse realiza el trazo de linea
    cuadro.style.cursor = "hand";

    borrarDibujo = document.getElementById("borrar"); // activa y utiliza el botón de borrar
    borrarDibujo.addEventListener ("click", erase); // al hacer clic sobre el botón, borra el cuadro de dibujo
}

/* Realiza el cambio de estado de los eventos con el mouse, registra los condicionales de los eventos.
Si realiza un movimiento, revisa la condición y ejecuta el comando*/
function cambiarEstado()
{
    linePaint =! linePaint;
    posAct = obtCoordenadas(event);
}

// Función con la que se realizan los trazos en el trablero de dibujo
function pintarLinea(event)
{
    if(linePaint)
    {
        var coordenadas = obtCoordenadas(event);
        papel.beginPath(); //inicia dibujo
        papel.moveTo(posAct.x, posAct.y); // Ubica el cursor en la posición
        papel.lineTo(coordenadas.x, coordenadas.y); //mueve la línea
        posAct = {
            x:coordenadas.x, y:coordenadas.y
        };
        papel.strokeStyle = "black"; // color linea
        papel.stroke(); //dibuja linea
    }
}

// Función que revisa el lugar donde se encuentra el mouse y realiza la ubicación en el tablero
function obtCoordenadas(event)
{
    var posX;
    var posY;

    if (event.pageX || event.pageY) {
        posX = event.pageX- lienzoLimit.left;
        posY = event.pageY- lienzoLimit.top;
    }else{
        posX = event.clientX - lienzoLimit.left;
        posY = event.clientY - lienzoLimit.top;
    }

    return {x:posX,
        y:posY
    };
}

// Función en la que hace funcionar el borrado al oprimir el botón
function erase()
{
    papel.clearRect (0 , 0, cuadro.width, cuadro.height);
}
