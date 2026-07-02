import { createElement } from "../utils/create-element";

const CATEGORIES = [
  { name: "Lighting", query: "lamp" },
  { name: "Workspace", query: "desk" },
  { name: "Audio", query: "audio" },
  { name: "Storage", query: "kit" },
] as const;

export class CategoriesPage {
  element: HTMLElement | null = null;

  render(): HTMLElement {
    this.element = createElement<HTMLElement>(`
      <section class="page">
        <h1>Categories</h1>
        <p>
          These are regular links. The router intercepts them and updates the
          URL without a reload.
        </p>
        <ul class="list">
          ${CATEGORIES.map(
            ({ name, query }) => `
              <li>
                <a class="inline-link" href="/products?q=${query}">
                  ${name}
                </a>
                <span class="badge">/products?q=${query}</span>
              </li>
            `,
          ).join("")}
        </ul>
      </section>
    `);

    return this.element;
  }
}
