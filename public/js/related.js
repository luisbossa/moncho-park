const relatedProducts = [
  {
    name: "TOY MACHINE",
    price: "₡ 33,900",
    desc: "Diseñada para trucos urbanos.",
    img: "/images/shop/deck-18.png",
    size: "8.25",
    stock: "Disponible",
  },
  {
    name: "TOY MACHINE",
    price: "₡ 32,500",
    desc: "Colores agresivos.",
    img: "/images/shop/deck-19.png",
    size: "8.14",
    stock: "Últimas unidades",
  },
  {
    name: "HABITAT",
    price: "₡ 29,000",
    desc: "Madera premium.",
    img: "/images/shop/deck-20.png",
    size: "8.00",
    stock: "Disponible",
  },
  {
    name: "WORLD INDUSTRIES",
    price: "₡ 30,900",
    desc: "Dominio total.",
    img: "/images/shop/deck-22.png",
    size: "8.15",
    stock: "Disponible",
  },
  {
    name: "BLACKLABEL",
    price: "₡ 32,900",
    desc: "Dominio total.",
    img: "/images/shop/deck-23.png",
    size: "8.15",
    stock: "Últimas unidades",
  },
];

const relatedGrid = document.getElementById("relatedGrid");

function renderRelated() {
  relatedGrid.innerHTML = "";

  relatedProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "related-card";

    card.innerHTML = `
      <div class="related-div">
        <div class="related-img-div">
          <img src="${product.img}">
        </div>
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.setCurrentList(relatedProducts);
      window.setCurrentIndex(index);
      window.updatePopup(index);

      window.popup.classList.add("active");
    });

    relatedGrid.appendChild(card);
  });
}

renderRelated();
