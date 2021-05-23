// const beep = new Audio("../audio/beep.wav");
// beep.crossOrigin = "anonymous";
// const winnerPlay = new Audio("../audio/winner.wav");
// winnerPlay.crossOrigin = "anonymous";
// const dieadSound = new Audio("../audio/died.mp3");
// dieadSound.crossOrigin = "anonymous";
const lblScore = document.querySelector("#score");
const contenedor = document.querySelector("#contenedor");
const inicioX = 280;
const inicioY = 70;

function cargarSonido(fuente){
  const sonido = document.createElement('audio');
  sonido.src = fuente;
  return sonido.play();
}

//ANIMACION REQUEST ANIMATION FRAME

let frame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let canvas = document.querySelector("#lienzo");
let ctx = canvas.getContext("2d");

//PROPIEDADES DEL OBJETO JUGADOR

let jugador = {
  x: 280,
  y: 70,
  ancho: 10,
  alto: 10,
  color: "red",
  movimiento_x: 0,
  movimiento_y: 0,
  velocidad: 5,
  x1: null,
  x2: null,
  y1: null,
  y2: null,
  puntaje: 1000,
  asignarScore: (score) => {
    lblScore.textContent = score;
    if (jugador.puntaje < 500) {
      lblScore.style.color = "#e4f512";
    }
    if (jugador.puntaje < 250) {
      lblScore.style.color = "#fd2b06";
    }
    if (jugador.puntaje <= 0) {
      lblScore.textContent = 0;
      canvas.style.display = "none";
      contenedor.style.background =
        " url(https://raw.githubusercontent.com/betanzos515/laberinto-canvas/main/img/over.png) ";
      contenedor.style.backgroundRepeat = "no-repeat";
      contenedor.style.backgroundPosition = "center";
      contenedor.style.backgroundSize = "80%";
      cargarSonido('../audio/died.mp3');
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      window.cancelAnimationFrame(juegoFrame);
    }
  },
};

let ganador = {
  x: 700,
  y: 65,
  ancho: 10,
  alto: 20,
  x1: null,
  x2: null,
  y1: null,
  y2: null,
  color: "orange",
};

// PROPIEDADES DEL OBJETO BLOQUES

let bloques = [
  {
    x: 300,
    y: 50,
    ancho: 400,
    alto: 10,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
    color: "black",
  },
  {
    x: 300,
    y: 90,
    ancho: 10,
    alto: 360,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
  {
    x: 300,
    y: 440,
    ancho: 400,
    alto: 10,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
  {
    x: 690,
    y: 90,
    ancho: 10,
    alto: 360,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
  {
    x: 365,
    y: 50,
    ancho: 10,
    alto: 350,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
  {
    x: 430,
    y: 100,
    ancho: 10,
    alto: 350,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
  {
    x: 495,
    y: 50,
    ancho: 10,
    alto: 350,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
  {
    x: 560,
    y: 100,
    ancho: 10,
    alto: 350,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
  {
    x: 625,
    y: 50,
    ancho: 10,
    alto: 350,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  },
];

//PROPIEDADES DEL OBJETO DATOS

let datos = {
  izquierda: false,
  derecha: false,
  arriba: false,
  abajo: false,
};

//METODOS DEL OBJETO JUEGO

let juego = {
  teclado: function () {
    // EVENTOS TECLADO
    document.addEventListener("keydown", juego.oprimir);
    document.addEventListener("keyup", juego.soltar);
  },

  oprimir: function (tecla) {
    // OPRIMIR TECLADO
    tecla.preventDefault();
    switch (tecla.keyCode) {
      case 37:
        datos.izquierda = true;
        break;
      case 38:
        datos.arriba = true;
        break;
      case 39:
        datos.derecha = true;
        break;
      case 40:
        datos.abajo = true;
        break;
    }
  },

  soltar: function (tecla) {
    // SOLTAR TECLADO

    tecla.preventDefault();
    switch (tecla.keyCode) {
      case 37:
        datos.izquierda = false;
        break;
      case 38:
        datos.arriba = false;
        break;
      case 39:
        datos.derecha = false;
        break;
      case 40:
        datos.abajo = false;
        break;
    }
  },

  tiempo: function () {
    // MOVIMIENTO HORIZONTAL JUGADOR
    jugador.x += jugador.movimiento_x;

    if (datos.izquierda) {
      jugador.movimiento_x = -jugador.velocidad;
      jugador.movimiento_y = 0;
    }
    if (datos.derecha) {
      jugador.movimiento_x = jugador.velocidad;
      jugador.movimiento_y = 0;
    }
    if (!datos.izquierda && !datos.derecha) {
      jugador.movimiento_x = 0;
    }

    // MOVIMIENTO VERTICAL JUGADOR

    jugador.y += jugador.movimiento_y;

    if (datos.arriba) {
      jugador.movimiento_y = -jugador.velocidad;
      jugador.movimiento_x = 0;
    }
    if (datos.abajo) {
      jugador.movimiento_y = jugador.velocidad;
      jugador.movimiento_x = 0;
    }
    if (!datos.arriba && !datos.abajo) {
      jugador.movimiento_y = 0;
    }

    // COLISIONES

    for (let i = 0; i < bloques.length; i++) {
      jugador.x1 = jugador.x;
      jugador.x2 = jugador.x + jugador.ancho;
      jugador.y1 = jugador.y;
      jugador.y2 = jugador.y + jugador.alto;

      bloques[i].x1 = bloques[i].x;
      bloques[i].x2 = bloques[i].x + bloques[i].ancho;
      bloques[i].y1 = bloques[i].y;
      bloques[i].y2 = bloques[i].y + bloques[i].alto;

      ganador.x1 = ganador.x;
      ganador.x2 = ganador.x + ganador.ancho;
      ganador.y1 = ganador.y;
      ganador.y2 = ganador.y + ganador.alto;

      function colisiones() {
        //NO COLISIÓN DE IZQ A DER
        if (jugador.x2 < bloques[i].x1) {
          return false;
        }
        //NO COLISIÓN DE DER A IZQ
        if (jugador.x1 > bloques[i].x2) {
          return false;
        }
        //NO COLISIÓN DE ARRIBA HACIA ABAJO
        if (jugador.y2 < bloques[i].y1) {
          return false;
        }
        //NO COLISIÓN DE ABAJO HACIA ARRIBA
        if (jugador.y1 > bloques[i].y2) {
          return false;
        }
        return true;
      }

      function winner() {
        if (jugador.x2 < ganador.x1) {
          return false;
        }
        return true;
      }

      winner();
      colisiones();

      if (winner() && jugador.x2 < ganador.x1 + jugador.movimiento_x) {
        canvas.style.display = "none";
        contenedor.style.background =
          " url(https://raw.githubusercontent.com/betanzos515/laberinto-canvas/main/img/winner.png) ";
        contenedor.style.backgroundRepeat = "no-repeat";
        contenedor.style.backgroundSize = "60%";
        contenedor.style.backgroundPosition = "center center";
        cargarSonido('../audio/winner.wav')
        setTimeout(() => {
          window.location.reload();
        }, 6500);
        window.cancelAnimationFrame(juegoFrame);
      }

      //COLISIÓN DE IZQ A DER
      if (colisiones() && jugador.x2 < bloques[i].x1 + jugador.movimiento_x) {
        jugador.puntaje = jugador.puntaje - 50;
        jugador.movimiento_x = 0;
        cargarSonido('../audio/beep.wav');
      }

      //COLISIÓN DE DER A IZQ
      if (colisiones() && jugador.x1 - jugador.movimiento_x > bloques[i].x2) {
        jugador.puntaje = jugador.puntaje - 50;
        jugador.movimiento_x = 0;
        cargarSonido('../audio/beep.wav');
      }

      //COLISIÓN DE ARRIBA HACIA ABAJO
      if (colisiones() && jugador.y2 < bloques[i].y1 + jugador.movimiento_y) {
        jugador.puntaje = jugador.puntaje - 50;
        jugador.movimiento_y = 0;
        cargarSonido('../audio/beep.wav');
      }

      //COLISIÓN DE ABAJO HACIA ARRIBA
      if (colisiones() && jugador.y1 - jugador.movimiento_y > bloques[i].y2) {
        jugador.puntaje = jugador.puntaje - 50;
        jugador.movimiento_y = 0;
        cargarSonido('../audio/beep.wav');
      }
    }

    // CANVAS

    juego.canvas();

    // ACTIVAR LINEA DE TIEMPO PARA EL METODO TIEMPO

    jugador.asignarScore(jugador.puntaje);
    let juegoFrame = frame(juego.tiempo);
  },

  canvas: function () {
    // CANVAS
    //BORRAMOS LIENZO
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Dibujar Ganador
    ctx.fillStyle = ganador.color;
    ctx.fillRect(ganador.x, ganador.y, ganador.ancho, ganador.alto);

    //DIBUJAR JUGADOR
    ctx.fillStyle = jugador.color;
    ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);

    //DIBUJAR BLOQUES
    ctx.fillStyle = bloques[0].color;

    for (let i = 0; i < bloques.length; i++) {
      ctx.fillRect(
        bloques[i].x,
        bloques[i].y,
        bloques[i].ancho,
        bloques[i].alto
      );
    }
    // {x:690, y:90, ancho: 10, alto: 360, x1:null, x2:null, y1:null, y2:null},
  },
};

juego.teclado();
juego.tiempo();
