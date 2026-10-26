(() => {
  const popup = document.getElementById("shopPopup");
  const popupImage = document.getElementById("popupImage");
  const title = popup.querySelector(".popup-title");
  const price = popup.querySelector(".popup-price");
  const desc = popup.querySelector(".popup-desc");
  const size = document.getElementById("popupSize");
  const stock = document.getElementById("popupStock");
  const buyBtn = popup.querySelector(".btn.yes");
  const closeBtn = popup.querySelector(".popup-close");
  const moneyEl = popup.querySelector(".hud-money");
  const deckContainer = popup.querySelector(".popup-deck");
  const toast = document.querySelector(".game-msg");
  const SOLD_OUT = "Agotado";

  const formatCRC = (amount) => "₡ " + Number(amount).toLocaleString("en-US");

  // Los productos vienen renderizados desde EJS en data-attributes
  const lists = {};
  document.querySelectorAll("[data-list]").forEach((el) => {
    const list = (lists[el.dataset.list] ||= []);
    const index = list.push({ ...el.dataset, price: Number(el.dataset.price) }) - 1;
    const open = () => openPopup(el.dataset.list, index, el);

    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `Ver ${el.dataset.name}, ${formatCRC(el.dataset.price)}`);
    el.addEventListener("click", open);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  let currentList = [];
  let currentIndex = 0;
  let lastTrigger = null;
  let money = Number(moneyEl.dataset.money);

  function render() {
    const product = currentList[currentIndex];
    if (!product) return;

    popupImage.src = product.img;
    popupImage.alt = product.name;
    title.textContent = product.name;
    price.textContent = formatCRC(product.price);
    desc.textContent = product.desc;
    size.textContent = "Tamaño: " + product.size;
    stock.textContent = product.stock;
    stock.dataset.stock = product.stock;

    const soldOut = product.stock === SOLD_OUT;
    buyBtn.disabled = soldOut;
    buyBtn.textContent = soldOut ? SOLD_OUT : "Comprar";

    // Re-dispara la animación de entrada de la tabla
    deckContainer.classList.remove("is-changing");
    void deckContainer.offsetWidth;
    deckContainer.classList.add("is-changing");
  }

  function openPopup(listName, index, trigger) {
    currentList = lists[listName];
    currentIndex = index;
    lastTrigger = trigger;
    render();
    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeBtn.focus({ preventScroll: true });
  }

  function closePopup() {
    if (!popup.classList.contains("active")) return;
    popup.classList.remove("active");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lastTrigger?.focus({ preventScroll: true });
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + currentList.length) % currentList.length;
    render();
  }

  popup.querySelectorAll("[data-close-popup]").forEach((btn) => btn.addEventListener("click", closePopup));
  document.getElementById("nextDeck").addEventListener("click", () => step(1));
  document.getElementById("prevDeck").addEventListener("click", () => step(-1));

  // Clic fuera del contenido (en el fondo oscuro) cierra el popup
  popup.addEventListener("click", (e) => {
    if (e.target === popup || e.target.classList.contains("popup-wrapper")) closePopup();
  });

  document.addEventListener("keydown", (e) => {
    if (!popup.classList.contains("active")) return;

    if (e.key === "Escape") closePopup();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);

    // Mantiene el foco dentro del popup
    if (e.key === "Tab") {
      const focusables = [...popup.querySelectorAll("button:not([disabled])")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Swipe sobre la tabla para cambiar de producto
  let touchX = null;

  popup.querySelector(".popup-left").addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), {
    passive: true,
  });
  popup.querySelector(".popup-left").addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      touchX = null;
    },
    { passive: true }
  );

  // ===== HUD / COMPRA =====
  let toastTimer;
  function showToast(text, type) {
    clearTimeout(toastTimer);
    toast.textContent = text;
    toast.className = `game-msg ${type} show`;
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  function updateMoney() {
    moneyEl.textContent = formatCRC(money);
    moneyEl.classList.add("flash");
    setTimeout(() => moneyEl.classList.remove("flash"), 300);
  }

  buyBtn.addEventListener("click", () => {
    const product = currentList[currentIndex];
    if (!product || product.stock === SOLD_OUT) return;

    if (money >= product.price) {
      money -= product.price;
      updateMoney();
      showToast("Compra exitosa !", "success");
    } else {
      showToast("Fondos insuficientes", "error");
    }
  });

  // ===== EFECTO 3D (sólo con mouse) =====
  if (window.matchMedia("(hover: hover)").matches) {
    deckContainer.addEventListener("mousemove", (e) => {
      const rect = deckContainer.getBoundingClientRect();
      const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 18;
      const rotateX = ((rect.height / 2 - (e.clientY - rect.top)) / (rect.height / 2)) * 18;

      popupImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.08)`;
    });

    deckContainer.addEventListener("mouseleave", () => {
      popupImage.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }
})();
