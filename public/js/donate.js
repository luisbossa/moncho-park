document.addEventListener("DOMContentLoaded", () => {
  const typeButtons = document.querySelectorAll(".donate-type-btn");
  const amountButtons = document.querySelectorAll(".donate-amount-btn");
  const input = document.querySelector(".donate-custom input");
  const donateBtn = document.querySelector(".btn-23");
  const message = document.querySelector(".donate-message");

  let selectedAmount = null;
  let donationType = "once";

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      typeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      donationType = btn.textContent.toLowerCase();
    });
  });

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      amountButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      input.value = "";
      selectedAmount = btn.textContent.replace(/[₡,]/g, "");
    });
  });

  input.addEventListener("input", () => {
    amountButtons.forEach((b) => b.classList.remove("active"));
    selectedAmount = input.value;
  });

  donateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    message.classList.remove("show");

    if (!selectedAmount || selectedAmount <= 0) {
      message.textContent = "Ingresa una cantidad válida";
      message.style.color = "#ff8b2b";
      showMessage();
      return;
    }

    message.textContent = `Gracias por tu aporte de ₡${Number(selectedAmount).toLocaleString()} !`;
    message.style.color = "#1b667f";

    showMessage();

    setTimeout(resetForm, 2000);
  });

  function showMessage() {
    message.classList.add("show");

    setTimeout(() => {
      message.classList.remove("show");
    }, 3000);
  }

  function resetForm() {
    amountButtons.forEach((b) => b.classList.remove("active"));

    input.value = "";

    selectedAmount = null;
  }
});
