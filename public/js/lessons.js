lucide.createIcons();

document.querySelector(".lessons-form")?.addEventListener("submit", e => {
  e.preventDefault();

  const btn = e.target.querySelector("button");
  btn.textContent = "Enviando...";

  setTimeout(() => {
    btn.textContent = "Enviado";
  }, 1200);
});