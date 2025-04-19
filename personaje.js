function seleccionarPersonaje(personaje) {
  // Guardar personaje seleccionado en localStorage
  localStorage.setItem("personaje", personaje); // para que coincida con juego.html

  // Redirigir a la pantalla de elegir operación
  window.location.href = "/operacion";
}
