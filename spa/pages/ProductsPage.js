import { createElement } from "../utils/createElement.js";

const PRODUCTS = [
  { id: 1, name: "Studio Lamp", price: 39, tag: "new" },
  { id: 2, name: "Travel Kettle", price: 58, tag: "sale" },
  { id: 3, name: "Desk Organizer", price: 24, tag: "new" },
  { id: 4, name: "Analog Timer", price: 19, tag: "classic" },
  { id: 5, name: "Audio Dock", price: 89, tag: "limited" },
  { id: 6, name: "Cable Kit", price: 12, tag: "basic" },
];

export class ProductsPage {
  element = null;

  #input = null;
  #list = null;
  #urlLabel = null;
  #clearButton = null;
  #handleInput = () => {};
  #handleClear = () => {};

  render() {
    this.element = createElement(`
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

    this.#input = this.element.querySelector('[data-element="filter"]');
    this.#list = this.element.querySelector('[data-element="list"]');
    this.#urlLabel = this.element.querySelector('[data-element="url"]');
    this.#clearButton = this.element.querySelector('[data-action="clear"]');

    const query = this.#getQuery();
    this.#input.value = query;

    this.#handleInput = () => {
      const value = this.#input.value.trim();
      this.#renderList(value);
      this.#updateQuery(value);
    };

    this.#input.addEventListener("input", this.#handleInput);

    this.#handleClear = () => {
      this.#input.value = "";
      this.#handleInput();
    };

    this.#clearButton.addEventListener("click", this.#handleClear);

    this.#renderList(query);
    this.#updateUrlLabel();

    return this.element;
  }

  destroy() {
    if (this.#input && this.#handleInput) {
      this.#input.removeEventListener("input", this.#handleInput);
    }

    if (this.#clearButton && this.#handleClear) {
      this.#clearButton.removeEventListener("click", this.#handleClear);
    }
  }

  #getQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") ?? "";
  }

  #updateQuery(value) {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("q", value);
    } else {
      url.searchParams.delete("q");
    }

    history.replaceState(history.state, "", url.pathname + url.search);
    this.#updateUrlLabel();
  }

  #updateUrlLabel() {
    if (this.#urlLabel) {
      this.#urlLabel.textContent =
        window.location.pathname + window.location.search;
    }
  }

  #renderList(query) {
    const normalized = query.trim().toLowerCase();
    const items = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(normalized)
    );

    if (items.length === 0) {
      this.#list.innerHTML = "<li>No matches found</li>";
      return;
    }

    this.#list.innerHTML = items
      .map(
        (product) => `
          <li>
            <span>${product.name}</span>
            <span>
              <span class="badge">${product.tag}</span>
              $${product.price}
            </span>
          </li>
        `
      )
      .join("");
  }
}
