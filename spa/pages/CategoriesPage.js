import { createElement } from "../utils/createElement.js";

const CATEGORIES = [
  { name: "Lighting", query: "lamp" },
  { name: "Workspace", query: "desk" },
  { name: "Audio", query: "audio" },
  { name: "Storage", query: "kit" },
];

export class CategoriesPage {
  element = null;

  render() {
    this.element = createElement(`
      <section class="page">
        <h1>Categories</h1>
        <p>
          These are regular links. The router intercepts them and updates the
          URL without a reload.
        </p>
        <ul class="list">
          ${CATEGORIES.map(
            (item) => `
              <li>
                <a class="inline-link" href="/spa/products?q=${item.query}">
                  ${item.name}
                </a>
                <span class="badge">/spa/products?q=${item.query}</span>
              </li>
            `
          ).join("")}
        </ul>
      </section>
    `);

    return this.element;
  }
}
