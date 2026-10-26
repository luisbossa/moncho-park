(() => {
  const typeButtons = document.querySelectorAll(".donate-type-btn");
  const amountButtons = document.querySelectorAll(".donate-amount-btn");
  const customBox = document.querySelector(".donate-custom");
  const input = customBox.querySelector("input");
  const donateBtn = document.querySelector(".donate-btn");
  const message = document.querySelector(".donate-message");
  const MAX = Number(input.max) || Infinity;

  let selectedAmount = 0;
  let donationType = "once";
  let messageTimer;

  function setPressed(buttons, active) {
    buttons.forEach((b) => {
      b.classList.toggle("active", b === active);
      b.setAttribute("aria-pressed", b === active);
    });
  }

  setPressed(typeButtons, document.querySelector(".donate-type-btn.active"));
  setPressed(amountButtons, null);

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setPressed(typeButtons, btn);
      donationType = btn.dataset.type;
    });
  });

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setPressed(amountButtons, btn);
      customBox.classList.remove("error");
      input.value = "";
      selectedAmount = Number(btn.dataset.amount);
    });
  });

  input.addEventListener("input", () => {
    setPressed(amountButtons, null);
    customBox.classList.remove("error");
    selectedAmount = Number(input.value);
  });

  function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
    message.classList.add("show");

    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => message.classList.remove("show"), 3000);
  }

  function showError(text) {
    customBox.classList.remove("error");
    void customBox.offsetWidth;
    customBox.classList.add("error");
    showMessage(text, "#ff8b2b");
  }

  donateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!(selectedAmount > 0)) return showError("Elige o ingresa una cantidad válida");
    if (selectedAmount > MAX) return showError(`El monto máximo es ₡${MAX.toLocaleString("en-US")}`);

    const suffix = donationType === "monthly" ? " mensual" : "";
    showMessage(`Gracias por tu aporte${suffix} de ₡${selectedAmount.toLocaleString("en-US")} !`, "#1b667f");

    setTimeout(() => {
      setPressed(amountButtons, null);
      input.value = "";
      selectedAmount = 0;
    }, 2000);
  });
})();
