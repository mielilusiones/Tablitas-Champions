document.addEventListener('DOMContentLoaded', () => {
  const personajeElegido = localStorage.getItem('personaje');
  const personajeImg = document.getElementById('personajeImagen');
  const preguntaTexto = document.getElementById('preguntaTexto');
  const opcionesContainer = document.querySelector('.opciones');
  const resultadoDiv = document.getElementById('resultado');
  const btnJugar = document.getElementById('botonJugar');

  // ✅ Leer operación guardada correctamente
  
 let modoOperacion = (localStorage.getItem("operacion") || "suma")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");
  // Mostrar personaje elegido
  if (personajeElegido && personajeImg) {
    personajeImg.src = `/static/assets/img/personaje_${personajeElegido}.png`;
  }

  // Sonidos
  const sonidoCorrecto = new Audio('/static/assets/sounds/correcto.mp3');
  const sonidoIncorrecto = new Audio('/static/assets/sounds/incorrecto.mp3');
  const sonidoClic = new Audio('/static/assets/sounds/clic.mp3');
  const sonidoVictoria = new Audio('/static/assets/sounds/victoria.mp3');
  const sonidoLogro = new Audio('/static/assets/sounds/logro_desbloqueado.mp3');
  const musicaFondo = new Audio('/static/assets/sounds/fondo.mp3');
  musicaFondo.loop = true;
  musicaFondo.volume = 0.2;

  const reproducir = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };

  const iniciarMusicaFondo = () => {
    musicaFondo.play().catch(() => console.log("Esperando interacción del usuario"));
  };

  if (btnJugar) {
    btnJugar.addEventListener("click", () => {
      reproducir(sonidoClic);
      iniciarMusicaFondo();
    });
  }

  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => reproducir(sonidoClic));
  });

  // Lógica del juego
  let respuestaCorrecta = null;

  function generarPregunta() {
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    let pregunta = '';

    switch (modoOperacion) {
      case 'suma':
        respuestaCorrecta = a + b;
        pregunta = `${a} + ${b}`;
        break;
      case 'resta':
        if (a < b) [a, b] = [b, a];
        respuestaCorrecta = a - b;
        pregunta = `${a} - ${b}`;
        break;
      case 'multiplicacion':
        respuestaCorrecta = a * b;
        pregunta = `${a} × ${b}`;
        break;
      case 'division':
        respuestaCorrecta = a;
        const producto = a * b;
        pregunta = `${producto} ÷ ${b}`;
        break;
    }

    preguntaTexto.textContent = `¿${pregunta} = ?`;
    const opciones = generarOpciones(respuestaCorrecta);
    mostrarOpciones(opciones);
  }

  function generarOpciones(correcta) {
    const opciones = new Set();
    opciones.add(correcta);
    while (opciones.size < 3) {
      const aleatorio = correcta + Math.floor(Math.random() * 10) - 5;
      if (aleatorio !== correcta && aleatorio >= 0) {
        opciones.add(aleatorio);
      }
    }
    return Array.from(opciones).sort(() => Math.random() - 0.5);
  }

  function mostrarOpciones(opciones) {
    opcionesContainer.innerHTML = '';
    opciones.forEach(op => {
      const boton = document.createElement('button');
      boton.textContent = op;
      boton.classList.add('btn-opcion', 'opcion');
      boton.onclick = () => verificarRespuesta(op);
      opcionesContainer.appendChild(boton);
    });
  }

  function verificarRespuesta(seleccion) {
    resultadoDiv.style.display = 'block';
    if (seleccion === respuestaCorrecta) {
      resultadoDiv.innerHTML = '✅ ¡Muy bien!';
      reproducir(sonidoCorrecto);
      mostrarEstrellas();
      desbloquearLogro('logro1');
      setTimeout(() => {
        resultadoDiv.style.display = 'none';
        generarPregunta();
      }, 1500);
    } else {
      resultadoDiv.innerHTML = '❌ Intenta de nuevo';
      reproducir(sonidoIncorrecto);
    }
  }

  function mostrarEstrellas() {
    resultadoDiv.innerHTML += `<div class="estrella-animada">🌟</div>`;
    setTimeout(() => {
      resultadoDiv.innerHTML = '';
    }, 1200);
  }

  function guardarLogro(id) {
    const logros = JSON.parse(localStorage.getItem('logros')) || {};
    logros[id] = true;
    localStorage.setItem('logros', JSON.stringify(logros));
  }

  function desbloquearLogro(id) {
    guardarLogro(id);
    reproducir(sonidoLogro);
  }

  generarPregunta();
});
