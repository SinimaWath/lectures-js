import { createElement } from "../../shared/utils/create-element";

import "./style.css";

type Product = {
  title: string;
  price: number;
};

const priceFormatter = Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

class ProductCard {
  element: HTMLDivElement;

  constructor(private product: Product) {
    this.element = document.createElement("div");

    this.render();
  }

  private render(): void {
    // this.element.innerHTML = this.template();
    this.element.insertAdjacentHTML("beforeend", this.template());
  }

  private template(): string {
    return `
        <div class="product-card">
            <div class="product-card__eyebrow">Новая коллекция</div>
            <h2 class="product-card__title">${this.product.title}</h2>
            <p class="product-card__price">${priceFormatter.format(this.product.price)}</p>
            <button class="product-card__button" type="button">Купить</button>
    </div>
    `;
  }
}

const iphone = new ProductCard({
  title: "Iphone 15",
  price: 999,
});

const iphone16 = new ProductCard({
  title: "Iphone 16",
  price: 123,
});

// #id => ищет по аттрибуту id="id"
// .class => ищет по аттибуту class="class"
// div => ищет елеменет с тегом div
const app = document.querySelector("#app");

if (!app) {
  throw new Error("No App DOM element");
}

app.append(iphone.element, iphone16.element);
