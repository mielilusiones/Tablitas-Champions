document.addEventListener('DOMContentLoaded', () => {
  const logrosContainer = document.querySelector('.logros-container');
  const sonidoLogro = document.getElementById('sonido-logro');

  const logros = [
    { id: 'logro1', nombre: '¡Primer acierto!', img: 'trofeo1.png', color: 'color1' },
    { id: 'logro2', nombre: '5 respuestas correctas', img: 'trofeo2.png', color: 'color2' },
    { id: 'logro3', nombre: '¡Racha de 3!', img: 'trofeo3.png', color: 'color3' },
    { id: 'logro4', nombre: '10 respuestas correctas', img: 'trofeo4.png', color: 'color4' },
    { id: 'logro5', nombre: 'Juego sin errores', img: 'trofeo5.png', color: 'color5' },
    { id: 'logro6', nombre: 'Usó todos los personajes', img: 'trofeo6.png', color: 'color6' },
    { id: 'logro7', nombre: 'Jugó todos los modos', img: 'trofeo7.png', color: 'color7' },
    { id: 'logro8', nombre: 'Superó nivel difícil', img: 'trofeo8.png', color: 'color8' },
    { id: 'logro9', nombre: '20 respuestas correctas', img: 'trofeo9.png', color: 'color9' },
    { id: 'logro10', nombre: '¡Desbloqueó todos los logros!', img: 'trofeo10.png', color: 'color10' },
  ];

  logros.forEach(logro => {
    const desbloqueado = localStorage.getItem(logro.id) === 'true';
    const div = document.createElement('div');
    div.classList.add('logro');

    if (desbloqueado) {
      div.classList.add('desbloqueado');
      setTimeout(() => {
        sonidoLogro.play();
        lanzarConfeti();
        mostrarPopup(logro.nombre);
        if (logro.id === 'logro10') {
          setTimeout(() => mostrarPantallaFinal(), 800);
        }
      }, 500);
    }

    div.innerHTML = `
      <img src="/static/assets/img/trofeos/${logro.img}" alt="${logro.nombre}">
      <p class="texto-logro ${logro.color}">${logro.nombre}</p>
    `;
    logrosContainer.appendChild(div);
  });

  function mostrarPopup(texto) {
    const popup = document.createElement('div');
    popup.className = 'popup-logro';
    popup.innerText = texto;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.classList.add('mostrar');
    }, 10);

    setTimeout(() => {
      popup.classList.remove('mostrar');
      setTimeout(() => popup.remove(), 500);
    }, 3000);
  }

  function lanzarConfeti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  function mostrarPantallaFinal() {
    const modal = document.createElement('div');
    modal.className = 'pantalla-final-logros';

    modal.innerHTML = `
      <div class="contenido-final">
        <img src="/static/assets/img/trofeos/trofeo10.png" alt="Todos los logros">
        <h2>🎉 ¡Felicidades! 🎉</h2>
        <p>Has desbloqueado todos los logros</p>
        <button id="cerrar-final">Cerrar</button>
      </div>
    `;

    document.body.appendChild(modal);

    const musicaFinal = new Audio('/static/assets/sounds/victoria.mp3');
    musicaFinal.play();

    let confetiInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 500);

    setTimeout(() => clearInterval(confetiInterval), 5000);

    document.getElementById('cerrar-final').addEventListener('click', () => {
      modal.remove();
      musicaFinal.pause();
    });
  }
});
// Agregar botón para reiniciar logros
const reiniciarBtn = document.createElement('button');
reiniciarBtn.textContent = '🔄 Reiniciar logros';
reiniciarBtn.classList.add('btn', 'btn-verde');
reiniciarBtn.addEventListener('click', () => {
  logros.forEach(logro => localStorage.removeItem(logro.id));
  location.reload(); // recarga la página
});
logrosContainer.appendChild(reiniciarBtn);