(() => {
  if (window.lucide) lucide.createIcons();

  const form = document.querySelector(".lessons-form");
  if (!form) return;

  const btn = form.querySelector("button[type='submit']");
  const sentTemplate = form.querySelector(".sent-template");
  const checkboxes = [...form.querySelectorAll('input[type="checkbox"]')];
  const checkboxGroup = form.querySelector(".lessons-checkbox-group");

  // ===== PLAN SELECCIONADO DESDE "RESERVAR" =====
  const planBox = form.querySelector(".lessons-form-plan");
  const planLabel = planBox.querySelector("strong");
  const planInput = form.elements.plan;
  const planCards = document.querySelectorAll("[data-plan-card]");

  function selectPlan(plan) {
    planInput.value = plan;
    planLabel.textContent = plan;
    planBox.classList.toggle("show", Boolean(plan));
    planCards.forEach((card) => card.classList.toggle("is-selected", card.dataset.planCard === plan));
  }

  document.querySelectorAll("[data-plan]").forEach((link) =>
    link.addEventListener("click", () => {
      selectPlan(link.dataset.plan);
      // Enfoca el primer campo después del scroll suave
      setTimeout(() => form.elements.name.focus({ preventScroll: true }), 600);
    })
  );

  planBox.querySelector("button").addEventListener("click", () => selectPlan(""));

  // ===== VALIDACIÓN =====
  const rules = [
    [form.elements.name, (v) => v.trim()],
    [form.elements.email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
    [form.elements.phone, (v) => v.replace(/\D/g, "").length >= 8],
    [form.elements.message, (v) => v.trim()],
  ];

  rules.forEach(([input]) => input.addEventListener("input", () => input.classList.remove("error")));

  checkboxes.forEach((cb) =>
    cb.addEventListener("change", () => {
      if (checkboxes.some((c) => c.checked)) checkboxGroup.classList.remove("error");
    })
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstInvalid = null;

    rules.forEach(([input, test]) => {
      const ok = Boolean(test(input.value));
      input.classList.toggle("error", !ok);
      input.setAttribute("aria-invalid", !ok);
      if (!ok) firstInvalid ||= input;
    });

    const hasClassType = checkboxes.some((cb) => cb.checked);
    checkboxGroup.classList.toggle("error", !hasClassType);
    if (!hasClassType) firstInvalid ||= checkboxes[0];

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const originalBtn = btn.innerHTML;
    btn.textContent = "Enviando...";
    btn.disabled = true;

    setTimeout(() => {
      btn.replaceChildren(sentTemplate.content.cloneNode(true));
      form.reset();
      selectPlan("");

      setTimeout(() => {
        btn.innerHTML = originalBtn;
        btn.disabled = false;
      }, 2000);
    }, 1200);
  });
})();
