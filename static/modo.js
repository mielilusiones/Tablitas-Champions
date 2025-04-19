function seleccionarOperacion(modo) {
  localStorage.setItem('modoOperacion', modo);
  window.location.href = '/juego.html'; // o usa la ruta correspondiente si es Flask
}
