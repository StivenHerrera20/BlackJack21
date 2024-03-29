//Ofuscar codigo
(() => {
  //Variables
  let puntosJugador = 0;
  let puntosComputadora = 0;

  //manejo del DOM
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnPedir = document.querySelector("#btnPedir");
  const btnParar = document.querySelector("#btnParar");
  const puntosHTML = document.querySelectorAll("small");
  const cartasJugador = document.querySelector("#cartasJugador");
  const cartasComputador = document.querySelector("#cartasComputador");

  //Cargamos las cartas en un arreglo
  const baraja = [
    "2C",
    "2D",
    "2H",
    "2S",
    "3C",
    "3D",
    "3H",
    "3S",
    "4C",
    "4D",
    "4H",
    "4S",
    "5C",
    "5D",
    "5H",
    "5S",
    "6C",
    "6D",
    "6H",
    "6S",
    "7C",
    "7D",
    "7H",
    "7S",
    "8C",
    "8D",
    "8H",
    "8S",
    "9C",
    "9D",
    "9H",
    "9S",
    "10C",
    "10D",
    "10H",
    "10S",
    "AC",
    "AD",
    "AH",
    "AS",
    "JC",
    "JD",
    "JH",
    "JS",
    "KC",
    "KD",
    "KH",
    "KS",
    "QC",
    "QD",
    "QH",
    "QS",
  ];
  //=============Funciones basicas del juego=================
  //hacer funcion que mezcle la baraja
  const mezclarBaraja = () => {
    baraja.sort(() => Math.random() - 0.5);
    return baraja;
  };
  mezclarBaraja();

  const pedirCarta = () => {
    if (baraja.length === 0) {
      throw "No hay mas cartas en la baraja";
    }
    const carta = baraja.pop();
    return carta;
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;
    if (isNaN(valor)) {
      puntos = valor === "A" ? 11 : 10;
    } else {
      puntos = valor * 1;
    }
    return puntos;
  };

  const jugarComputador = (puntosMinimos) => {
    do {
      const carta = pedirCarta();

      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntosHTML[1].innerText = puntosComputadora;

      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/img/${carta}.png`;
      imgCarta.classList.add("carta");
      cartasComputador.append(imgCarta);
      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador gana");
      } else {
        alert("Computadora gana");
      }
    }, 100);
  };

  //==================Eventos del juego============
  //Evento juego nuevo
  btnNuevo.addEventListener("click", () => {
    console.clear();
    mezclarBaraja();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    cartasJugador.innerHTML = "";
    cartasComputador.innerHTML = "";
    btnParar.disabled = false;
    btnPedir.disabled = false;
  });
  //Evento Pedir carta
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    //aumentar valor de la carta en el contador del jugador
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerHTML = puntosJugador;
    //Mostrar las cartas en la capa correspondiente
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/img/${carta}.png`;
    imgCarta.classList.add("carta");
    cartasJugador.append(imgCarta);
    //validamos puntos acumulados
    if (puntosJugador > 21) {
      btnParar.disabled = true;
      btnPedir.disabled = true;
      jugarComputador(puntosJugador);
    } else if (puntosJugador === 21) {
      btnParar.disabled = true;
      btnPedir.disabled = true;
      jugarComputador(puntosJugador);
    }
  });
  //Evento Plantarse
  btnParar.addEventListener("click", () => {
    btnParar.disabled = true;
    btnPedir.disabled = true;
    jugarComputador(puntosJugador);
    //Aca juega el computador
  });
})();
