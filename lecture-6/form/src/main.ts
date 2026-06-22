import "./style.css";

const products = [
  "Apple iPhone 15",
  "Samsung Galaxy S24",
  "Dyson V15 Detect",
  "Xiaomi Robot Vacuum S10",
  "Sony WH-1000XM5",
];

const form = document.forms.namedItem("product-from");
if (!form) {
  throw new Error("No form found");
}

console.log(form);

const titleElement = form.elements.namedItem(
  "title",
) as HTMLInputElement | null;
const descriptionInput = form.elements.namedItem(
  "description",
) as HTMLTextAreaElement | null;

const datalist = document.querySelector(
  "#product-titles",
) as HTMLDataListElement;

// 0 - Добавляем аттрибуты валидации в HTML. novalidate
// 1 - на blur
// 2 - на input
// 3 - на отправке submit

titleElement?.addEventListener("input", () => {
  const value = titleElement.value.toLowerCase();

  const matched = products.filter((product) =>
    product.toLowerCase().includes(value),
  );

  datalist.innerHTML = matched
    .map((product) => `<option value="${product}"></option>`)
    .join("");
});

titleElement?.addEventListener("blur", () => {
  if (titleElement.value.includes("1xbet")) {
    titleElement.parentElement?.parentElement?.classList.add("has-error");
  }
});

descriptionInput?.addEventListener("input", () => {
  if (descriptionInput.value.includes("betboom")) {
    descriptionInput.parentElement?.classList.add("has-error");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let priceInput = form.elements.namedItem(
    "price",
  ) as HTMLTextAreaElement | null;

  if (parseInt(priceInput?.value || "0", 10) < 0) {
    priceInput?.parentElement?.parentElement?.classList.add("has-error");

    return;
  }

  console.log("1");
  const promise = fetch(form.action, {
    method: form.method,
    body: new FormData(form), // json, text, binary
  });

  console.log("3");

  promise
    .then((response) => {
      console.log("2");
      console.log(response.status);

      // response.json().then()
      // response.text().then()
    })
    .catch((error) => {
      console.log(error);
    });
});

// form.addEventListener("submit", (event) => {
//   let priceInput = form.elements.namedItem(
//     "price",
//   ) as HTMLTextAreaElement | null;

//   if (parseInt(priceInput?.value || "0", 10) < 0) {
//     priceInput?.parentElement?.parentElement?.classList.add("has-error");

//     event.preventDefault();

//     return;
//   }
// });
