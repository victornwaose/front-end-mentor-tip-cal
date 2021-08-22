const inputBill = document.getElementById("bill");
const inputPersonAmount = document.getElementById("person-amount");
const inputsRadio = document.querySelectorAll(".tip input");
const resetBtn = document.getElementById("reset");
const form = document.querySelector("form");
const personTipAmount = document.getElementById("person-tip-amount");
const total = document.getElementById("total");
const inputCustomTip = document.getElementById("input-custom-tip");

let billValue = null;
let selectedTip = null;
let personAmount = null;

function calculate() {
  if (billValue && selectedTip && personAmount) {
    const billPerPerson = billValue / personAmount;
    const tipAmountPerPerson = billPerPerson * (selectedTip / 100);
    const totalAmount = billPerPerson + tipAmountPerPerson;

    personTipAmount.textContent = formatToCurrency(tipAmountPerPerson);
    total.textContent = formatToCurrency(totalAmount);
    return;
  }

  personTipAmount.textContent = "$0";
  total.textContent = "$0";
}

function formatToCurrency(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function removeAllActiveClass(elements) {
  elements.forEach((el) => el.closest(".tip").classList.remove("active"));
}

function displayError(currentInput, msg) {
  const invalidFeedback = currentInput.nextElementSibling;
  invalidFeedback.textContent = msg;
  currentInput.classList.add("invalid");
}

function clearError(currentInput) {
  const invalidFeedback = currentInput.nextElementSibling;
  invalidFeedback.textContent = "";
  currentInput.classList.remove("invalid");
}

inputBill.addEventListener("input", (e) => {
  let value = e.target.value.trim();
  value = value.replace(/[^0-9.]+/g, "");
  value = value || "";
  inputBill.value = value;
  billValue = parseFloat(value);
  calculate();
});

inputsRadio.forEach((input) => {
  input.addEventListener("click", (e) => {
    removeAllActiveClass(inputsRadio);
    const label = input.closest(".tip");
    label.classList.add("active");
    selectedTip = parseFloat(e.target.value);
    calculate();
  });
});

inputPersonAmount.addEventListener("input", (e) => {
  const currentInput = e.target;
  const value = e.target.value;
  if (value == 0) {
    displayError(currentInput, `can't be zero`);
  } else {
    clearError(currentInput);
  }
  personAmount = parseFloat(value);
  calculate();
});

inputCustomTip.addEventListener("input", (e) => {
  const value = e.target.value;
  selectedTip = parseFloat(value);
  calculate();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  personTipAmount.textContent = "$0";
  total.textContent = "$0";
  billValue = null;
  selectedTip = null;
  personAmount = null;
});