(() => {
  const galleryInner = document.getElementById("product-gallery-inner");
  if (!galleryInner) return;

  const gallery = galleryInner.parentElement;
  const cards = [...galleryInner.querySelectorAll(".product-card")];
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const textEl = document.getElementById("product-text");
  const titleEl = document.getElementById("product-title");
  const descEl = document.getElementById("product-description");
  const counterEl = document.getElementById("product-counter");
  const progressEl = document.getElementById("product-progress-bar");
  const SWIPE_THRESHOLD = 40;

  let currentIndex = 0;
  let textTimer;

  const pad = (n) => String(n).padStart(2, "0");

  function updateSlider(animate = true) {
    // La posición la calcula el CSS a partir de --index
    galleryInner.style.setProperty("--index", currentIndex);

    cards.forEach((card, index) => {
      const active = index === currentIndex;
      card.classList.toggle("active", active);
      card.setAttribute("aria-current", active);
      card.tabIndex = active ? -1 : 0;
    });

    counterEl.textContent = pad(currentIndex + 1);
    progressEl.style.width = `${((currentIndex + 1) / cards.length) * 100}%`;

    // Transición suave del texto
    const { name, description } = cards[currentIndex].dataset;
    if (!animate) {
      titleEl.textContent = name;
      descEl.textContent = description;
    } else {
      textEl.classList.add("is-changing");
      clearTimeout(textTimer);
      textTimer = setTimeout(() => {
        titleEl.textContent = name;
        descEl.textContent = description;
        textEl.classList.remove("is-changing");
      }, 200);
    }

    const atStart = currentIndex === 0;
    const atEnd = currentIndex === cards.length - 1;
    prevBtn.classList.toggle("disabled", atStart);
    nextBtn.classList.toggle("disabled", atEnd);
    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
  }

  function goTo(index) {
    if (index < 0 || index >= cards.length || index === currentIndex) return;
    currentIndex = index;
    updateSlider();
  }

  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  // Clic en una tarjeta lateral la vuelve activa
  cards.forEach((card, index) => card.addEventListener("click", () => goTo(index)));

  // Teclado: flechas cuando el foco está dentro del slider
  gallery.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(currentIndex - 1);
    if (e.key === "ArrowRight") goTo(currentIndex + 1);
  });

  // Swipe en pantallas táctiles
  let startX = null;
  let startY = null;

  gallery.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  gallery.addEventListener(
    "touchend",
    (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        goTo(currentIndex + (dx < 0 ? 1 : -1));
      }
      startX = null;
    },
    { passive: true }
  );

  // Fija la altura del texto a la del producto más largo para que la sección
  // no cambie de tamaño al pasar de un producto a otro
  function lockTextHeight() {
    const original = [titleEl.textContent, descEl.textContent];
    textEl.style.minHeight = "";

    const max = cards.reduce((height, card) => {
      titleEl.textContent = card.dataset.name;
      descEl.textContent = card.dataset.description;
      return Math.max(height, textEl.offsetHeight);
    }, 0);

    [titleEl.textContent, descEl.textContent] = original;
    textEl.style.minHeight = `${max}px`;
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockTextHeight, 150);
  });
  document.fonts?.ready.then(lockTextHeight);

  lockTextHeight();
  updateSlider(false);
})();
