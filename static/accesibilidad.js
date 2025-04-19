// Aplica los modos guardados en localStorage al cargar cualquier página
window.addEventListener('DOMContentLoaded', () => {
  const contraste = localStorage.getItem('contraste') === 'true';
  const tranquilo = localStorage.getItem('modoTranquilo') === 'true';

  if (contraste) document.body.classList.add('modo-contraste');
  if (tranquilo) document.body.classList.add('modo-tranquilo');
});
