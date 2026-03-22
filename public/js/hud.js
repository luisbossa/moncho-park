let playerMoney = 120000;

const moneyEl = document.querySelector(".hud-money");
const buyBtn = document.querySelector(".btn.yes");

function formatCRC(amount) {
  return "₡ " + amount.toLocaleString("es-CR");
}

function updateMoneyUI() {
  moneyEl.textContent = formatCRC(playerMoney);

  moneyEl.classList.add("flash");
  setTimeout(() => moneyEl.classList.remove("flash"), 300);
}

function parsePrice(priceStr) {
  return Number(priceStr.replace(/[₡\s,]/g, ""));
}

updateMoneyUI();

buyBtn.addEventListener("click", () => {
  const product = currentList[currentIndex];
  if (!product) return;

  const priceValue = parsePrice(product.price);

  if (playerMoney >= priceValue) {
    playerMoney -= priceValue;
    updateMoneyUI();

    showMessage("Compra exitosa !", "success");
  } else {
    showMessage("Fondos insuficientes", "error");
  }
});

function showMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "game-msg " + type;
  msg.textContent = text;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.classList.add("show");
  }, 10);

  setTimeout(() => {
    msg.classList.remove("show");
    setTimeout(() => msg.remove(), 300);
  }, 2000);
}
