const form = document.getElementById("contact-form");
const btn = form.querySelector("button");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirm-email");
const message = document.getElementById("message");
const charCount = document.querySelector(".char-count");

message.addEventListener("input", () => {
  charCount.textContent = `${message.value.length} / 600`;
});

function showError(input, msg) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  formGroup.classList.remove("success");

  error.textContent = msg;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error-message");

  formGroup.classList.remove("error");
  formGroup.classList.add("success");

  error.textContent = "";
}

function validateNotEmpty(input, fieldName) {
  if (input.value.trim() === "") {
    showError(input, `${fieldName} es requerido`);
    return false;
  }
  showSuccess(input);
  return true;
}

function validateEmailMatch() {
  if (email.value !== confirmEmail.value) {
    showError(confirmEmail, "Los correos no coinciden");
    return false;
  }
  showSuccess(confirmEmail);
  return true;
}

function validateMessage() {
  if (message.value.length < 10) {
    showError(message, "Mínimo 10 caracteres");
    return false;
  }
  showSuccess(message);
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  if (!validateNotEmpty(firstName, "Nombre")) isValid = false;
  if (!validateNotEmpty(lastName, "Apellido")) isValid = false;
  if (!validateNotEmpty(email, "Email")) isValid = false;
  if (!validateNotEmpty(confirmEmail, "Confirmar Email")) isValid = false;
  if (!validateMessage()) isValid = false;
  if (!validateEmailMatch()) isValid = false;

  if (!isValid) return;

  const originalBtn = btn.innerHTML;
  btn.textContent = "Enviando..."; 
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `
      ¡Enviado! <img src="/images/icons/checked.webp" style="width:20px; vertical-align:middle; margin-left:5px;" />
    `;

    form.reset();
    charCount.textContent = "0 / 600";

    document
      .querySelectorAll(".form-group")
      .forEach((g) => g.classList.remove("success"));

    setTimeout(() => {
      btn.innerHTML = originalBtn;
      btn.disabled = false;
    }, 2000);
  }, 1500); 
});
