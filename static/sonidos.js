function reproducirSonido(id) {
  if (localStorage.getItem('modoTranquilo') !== 'true') {
    const sonido = document.getElementById(id);
    if (sonido) {
      sonido.currentTime = 0;
      sonido.play();
    }
  }
}

// Ejemplos:
// reproducirSonido('sonido-click');
// reproducirSonido('sonido-correcto');
