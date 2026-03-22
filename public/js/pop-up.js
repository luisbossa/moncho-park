const decks = document.querySelectorAll(".deck-img");
const popup = document.getElementById("shopPopup");
const popupImage = document.getElementById("popupImage");

const title = document.querySelector(".popup-title");
const price = document.querySelector(".popup-price");
const desc = document.querySelector(".popup-desc");
const sizeEl = document.getElementById("popupSize");
const stockEl = document.getElementById("popupStock");

let currentIndex = 0;
let currentList = [];

const products = [
  {
    name: "TOY MACHINE",
    price: "₡24,900",
    desc: "Diseñada para trucos urbanos. Resistencia brutal.",
    img: "/images/shop/deck-8.png",
    size: "8.25",
    stock: "Disponible",
  },
  {
    name: "GIRL",
    price: "₡27,500",
    desc: "Colores agresivos para riders avanzados.",
    img: "/images/slider/item-2.png",
    size: "8.14",
    stock: "Últimas unidades",
  },
  {
    name: "DGK",
    price: "₡22,000",
    desc: "Estilo clásico con madera de alta calidad.",
    img: "/images/shop/deck-7.png",
    size: "8.00",
    stock: "Disponible",
  },
  {
    name: "CHOCOLATE",
    price: "₡29,900",
    desc: "Perfecta para dominar la calle sin límites.",
    img: "/images/shop/deck-14.png",
    size: "8.15",
    stock: "Disponible",
  },
  {
    name: "TOY MACHINE",
    price: "₡31,000",
    desc: "Edición limitada con diseño explosivo.",
    img: "/images/shop/deck-11.png",
    size: "8.20",
    stock: "Últimas unidades",
  },
  {
    name: "ALLIEN WORKSHOP",
    price: "₡34,900",
    desc: "Nivel profesional. Máxima estabilidad y control.",
    img: "/images/shop/deck-17.png",
    size: "8.24",
    stock: "Disponible",
  },
  {
    name: "SKATE MAFIA",
    price: "₡26,900",
    desc: "Diseño oscuro para riders agresivos.",
    img: "/images/shop/deck-9.png",
    size: "8.21",
    stock: "Disponible",
  },
  {
    name: "ZOO YORK",
    price: "₡28,500",
    desc: "Impacto visual con alto rendimiento.",
    img: "/images/shop/deck-10.png",
    size: "8.28",
    stock: "Últimas unidades",
  },
  {
    name: "FUNDATION SKATEBOARDS",
    price: "₡21,500",
    desc: "Inspirada en el skate old school.",
    img: "/images/shop/deck-15.png",
    size: "8.05",
    stock: "Edición limitada",
  },
  {
    name: "ANTI HERO SKATEBOARDS",
    price: "₡30,500",
    desc: "Hecha para conquistar cualquier spot urbano.",
    img: "/images/shop/deck-12.png",
    size: "8.20",
    stock: "Disponible",
  },
  {
    name: "REAL SKATEBOARDS",
    price: "₡32,000",
    desc: "Velocidad, control y estilo agresivo.",
    img: "/images/shop/deck-13.png",
    size: "8.23",
    stock: "Disponible",
  },
  {
    name: "ZOO YORK",
    price: "₡36,900",
    desc: "Nivel élite Monchopark.",
    img: "/images/shop/deck-16.png",
    size: "8.25",
    stock: "Agotado",
  },
];

window.products = products;
window.popup = popup;

// ===== UPDATE =====
function updatePopup(index) {
  const product = currentList[index];

  if (!product) return;

  popupImage.src = product.img;
  title.textContent = product.name;
  price.textContent = product.price;
  desc.textContent = product.desc;
  sizeEl.textContent = "Tamaño: " + product.size;
  stockEl.textContent = "Stock: " + product.stock;
}

// EXPONER GLOBAL PARA RELATED
window.updatePopup = updatePopup;
window.setCurrentList = (list) => (currentList = list);
window.setCurrentIndex = (i) => (currentIndex = i);

// ===== ABRIR DESDE SHOP =====
decks.forEach((deck) => {
  deck.addEventListener("click", () => {
    currentList = products;
    currentIndex = Number(deck.dataset.id);

    updatePopup(currentIndex);
    popup.classList.add("active");
  });
});

// ===== CERRAR =====
document.querySelectorAll("#closePopup").forEach((btn) => {
  btn.onclick = () => {
    popup.classList.remove("active");
  };
});

// ===== NAVEGACIÓN =====
document.getElementById("nextDeck").onclick = () => {
  currentIndex = (currentIndex + 1) % currentList.length;
  updatePopup(currentIndex);
};

document.getElementById("prevDeck").onclick = () => {
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  updatePopup(currentIndex);
};

// ===== 3D EFECTO =====
const deckContainer = document.querySelector(".popup-deck");
const deck3D = document.querySelector(".popup-deck img");

deckContainer.addEventListener("mousemove", (e) => {
  const rect = deckContainer.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 18;
  const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 18;

  deck3D.style.transform = `
    rotateY(${rotateY}deg)
    rotateX(${rotateX}deg)
    scale(1.08)
  `;
});

deckContainer.addEventListener("mouseleave", () => {
  deck3D.style.transform = "rotateY(0deg) rotateX(0deg)";
});
