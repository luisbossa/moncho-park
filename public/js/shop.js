const decks = document.querySelectorAll(".deck-img");
const popup = document.getElementById("shopPopup");
const popupImage = document.getElementById("popupImage");

const title = document.querySelector(".popup-title");
const price = document.querySelector(".popup-price");
const desc = document.querySelector(".popup-desc");

let currentIndex = 0;

// ===== UPDATE DATA =====
function updatePopup(index) {
  const deck = decks[index];

  popupImage.src = deck.src;

  title.textContent = deck.dataset.name || "Deck Pro";
  price.textContent = deck.dataset.price || "₡24,900";
  desc.textContent = deck.dataset.desc || "Tabla profesional";
}

// ===== ABRIR =====
decks.forEach((deck, index) => {
  deck.addEventListener("click", () => {
    currentIndex = index;
    updatePopup(index);
    popup.classList.add("active");
  });
});

// ===== CERRAR =====
document.querySelectorAll("#closePopup").forEach((btn) => {
  btn.onclick = () => popup.classList.remove("active");
});

// ===== NAVEGACIÓN =====
document.getElementById("nextDeck").onclick = () => {
  currentIndex = (currentIndex + 1) % decks.length;
  updatePopup(currentIndex);
};

document.getElementById("prevDeck").onclick = () => {
  currentIndex = (currentIndex - 1 + decks.length) % decks.length;
  updatePopup(currentIndex);
};

// ===== 3D EFECTO =====
const deckContainer = document.querySelector(".popup-deck");
const deck3D = document.querySelector(".popup-deck img");

deckContainer.addEventListener("mousemove", (e) => {
  const rect = deckContainer.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateY = ((x - centerX) / centerX) * 15;
  const rotateX = ((centerY - y) / centerY) * 15;

  deck3D.style.transform = `
    rotateY(${rotateY}deg)
    rotateX(${rotateX}deg)
    scale(1.05)
  `;
});

// RESET
deckContainer.addEventListener("mouseleave", () => {
  deck3D.style.transform = "rotateY(0deg) rotateX(0deg)";
});
