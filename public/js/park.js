(() => {
  const status = document.querySelector(".park-status");
  if (!status) return;

  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const open = toMinutes(status.dataset.open);
  const close = toMinutes(status.dataset.close);

  // Hora local del parque, sin importar la zona horaria del visitante
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Costa_Rica",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  function update() {
    const now = toMinutes(formatter.format(new Date()));
    const isOpen = now >= open && now < close;

    status.textContent = isOpen ? "Abierto ahora" : "Cerrado";
    status.classList.toggle("is-open", isOpen);
    status.classList.toggle("is-closed", !isOpen);
    status.hidden = false;
  }

  update();
  setInterval(update, 60 * 1000);
})();
