document.querySelectorAll(".btn-operacion").forEach(btn => {
  btn.addEventListener("click", () => {
    const operacion = btn.dataset.op;
    localStorage.setItem("operacionSeleccionada", operacion);
    window.location.href = "/juego.html"; // redirige al juego
  });
});