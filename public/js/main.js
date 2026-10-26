(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ===== MENÚ MÓVIL =====
  const toggle = document.querySelector(".mobile-menu-toggle");
  const menu = document.querySelector(".mobile-menu");

  function setMenu(open) {
    menu.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("no-scroll", open);
    if (open) menu.querySelector("a")?.focus({ preventScroll: true });
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => setMenu(!menu.classList.contains("active")));
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("active")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 851px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  // ===== HEADER FIJO AL SUBIR + BOTÓN VOLVER ARRIBA =====
  const header = document.querySelector(".main-header");
  const backToTop = document.querySelector(".back-to-top");
  const MIN_DELTA = 12; // px mínimos de recorrido para cambiar el estado
  const INTENT_WINDOW = 1000; // ms en los que un scroll se considera hecho por la persona
  const SCROLL_KEYS = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];

  let lastY = window.scrollY;
  let lastIntent = 0;
  let ticking = false;

  // Sólo estas acciones cuentan como scroll del usuario. Así se ignoran los ajustes
  // automáticos del navegador (p. ej. cuando el slider cambia de altura).
  const markIntent = () => (lastIntent = performance.now());
  window.addEventListener("wheel", markIntent, { passive: true });
  window.addEventListener("touchmove", markIntent, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (SCROLL_KEYS.includes(e.key) && !e.target.closest?.("input, textarea, [role='region']")) markIntent();
  });
  // Arrastrar la barra de desplazamiento
  window.addEventListener("pointerdown", (e) => {
    if (e.target === document.documentElement) markIntent();
  });

  function onScroll() {
    const y = window.scrollY;
    const delta = y - lastY;
    const fixed = y > window.innerHeight * 0.6;
    const byUser = performance.now() - lastIntent < INTENT_WINDOW;

    if (header) {
      header.classList.toggle("is-fixed", fixed);
      if (!fixed) header.classList.remove("is-visible");
      else if (byUser && delta < -MIN_DELTA) header.classList.add("is-visible");
      else if (delta > MIN_DELTA) header.classList.remove("is-visible");
    }

    backToTop?.classList.toggle("show", y > window.innerHeight * 1.5);

    // Acumula los movimientos pequeños hasta superar el mínimo
    if (Math.abs(delta) > MIN_DELTA || !fixed) lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  backToTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  );

  // ===== APARICIÓN AL HACER SCROLL =====
  const revealSelectors = [
    ".about-content",
    ".about-image-item",
    ".park-header",
    ".park-map-frame",
    ".park-zones",
    ".shop-teaser-content",
    ".product-item",
    ".discount-container",
    ".brands-div",
    ".contact-info",
    ".contact-form-wrapper",
    ".donate-box",
    ".donate-info",
    ".events-header",
    ".event-card",
    ".history-header",
    ".history-image",
    ".history-feature",
    ".history-split",
    ".lessons-intro",
    ".lessons-pricing-card",
    ".lessons-extra-card",
    ".lessons-value-card",
    ".lessons-contact-grid",
    ".privacy-policy-block",
    ".related-card",
  ].join(",");

  const revealItems = document.querySelectorAll(revealSelectors);

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("is-visible");
          revealObserver.unobserve(el);

          // Al terminar se quita el atributo para no pisar transform/transition propios
          const delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
          setTimeout(() => {
            el.removeAttribute("data-reveal");
            el.classList.remove("is-visible");
            el.style.removeProperty("--reveal-delay");
          }, 800 + delay * 1000);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((el) => {
      // Escalonado entre hermanos de una misma grilla
      const index = [...el.parentElement.children].indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 0.08}s`);
      el.setAttribute("data-reveal", "");
      revealObserver.observe(el);
    });
  }

  // ===== LOGO DEL FOOTER =====
  const footerLogo = document.querySelector(".footer-logo img");

  if (footerLogo && "IntersectionObserver" in window) {
    const logoObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          footerLogo.classList.add("spin-on-scroll");
          logoObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    logoObserver.observe(footerLogo);
  }
})();
