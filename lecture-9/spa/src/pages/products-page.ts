import { createElement } from "../utils/create-element";

interface Product {
  id: number;
  name: string;
  price: number;
  tag: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Studio Lamp", price: 39, tag: "new" },
  { id: 2, name: "Travel Kettle", price: 58, tag: "sale" },
  { id: 3, name: "Desk Organizer", price: 24, tag: "new" },
  { id: 4, name: "Analog Timer", price: 19, tag: "classic" },
  { id: 5, name: "Audio Dock", price: 89, tag: "limited" },
  { id: 6, name: "Cable Kit", price: 12, tag: "basic" },
];

export class ProductsPage {
  element: HTMLElement | null = null;

  #input: HTMLInputElement | null = null;
  #list: HTMLUListElement | null = null;
  #urlLabel: HTMLElement | null = null;
  #clearButton: HTMLButtonElement | null = null;
  #handleInput: ((event: Event) => void) | null = null;
  #handleClear: (() => void) | null = null;

  render(): HTMLElement {
    this.element = createElement<HTMLElement>(`
      <section class="page">
        <h1>Products</h1>
        <p>
          The filter updates the URL with history.replaceState, so the Back
          button does not step through each keystroke.
        </p>

        <div class="filter">
          <input
            type="search"
            name="query"
            placeholder="Filter products"
            autocomplete="off"
            data-element="filter"
          />
          <button type="button" data-action="clear">Clear</button>
        </div>

        <div class="muted">URL: <span data-element="url"></span></div>

        <ul class="list" data-element="list"></ul>
      </section>
    `);

    this.#input = this.element.querySelector<HTMLInputElement>(
      '[data-element="filter"]',
    );
    this.#list = this.element.querySelector<HTMLUListElement>(
      '[data-element="list"]',
    );
    this.#urlLabel = this.element.querySelector<HTMLElement>(
      '[data-element="url"]',
    );
    this.#clearButton = this.element.querySelector<HTMLButtonElement>(
      '[data-action="clear"]',
    );

    if (!this.#input || !this.#list || !this.#urlLabel || !this.#clearButton) {
      throw new Error("Products page markup is incomplete");
    }

    const query = this.#getQuery();
    this.#input.value = query;

    this.#handleInput = () => {
      if (!this.#input) {
        return;
      }

      const value = this.#input.value.trim();
      this.#renderList(value);
      this.#updateQuery(value);
    };

    this.#handleClear = () => {
      if (!this.#input) {
        return;
      }

      this.#input.value = "";
      this.#handleInput?.(new Event("input"));
    };

    this.#input.addEventListener("input", this.#handleInput);
    this.#clearButton.addEventListener("click", this.#handleClear);

    this.#renderList(query);
    this.#updateUrlLabel();

    return this.element;
  }

  destroy(): void {
    if (this.#input && this.#handleInput) {
      this.#input.removeEventListener("input", this.#handleInput);
    }

    if (this.#clearButton && this.#handleClear) {
      this.#clearButton.removeEventListener("click", this.#handleClear);
    }
  }

  #getQuery(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") ?? "";
  }

  #updateQuery(value: string): void {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("q", value);
    } else {
      url.searchParams.delete("q");
    }

    history.replaceState(history.state, "", url.pathname + url.search);
    this.#updateUrlLabel();
  }

  #updateUrlLabel(): void {
    if (!this.#urlLabel) {
      return;
    }

    this.#urlLabel.textContent =
      window.location.pathname + window.location.search;
  }

  #renderList(query: string): void {
    if (!this.#list) {
      return;
    }

    const normalized = query.trim().toLowerCase();
    const items = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(normalized),
    );

    if (items.length === 0) {
      this.#list.innerHTML = "<li>No matches found</li>";
      return;
    }

    this.#list.innerHTML = items
      .map(
        (product) => `
          <li data-product-id="${product.id}">
            <span>${product.name}</span>
            <span>
              <span class="badge">${product.tag}</span>
              $${product.price}
            </span>
          </li>
        `,
      )
      .join("");
  }
}
