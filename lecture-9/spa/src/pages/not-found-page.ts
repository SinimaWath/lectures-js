import { createElement } from "../utils/create-element";

export class NotFoundPage {
  element: HTMLElement | null = null;

  render(): HTMLElement {
    this.element = createElement<HTMLElement>(`
      <section class="page">
        <h1>404</h1>
        <p>The route does not exist. Check the URL or go back home.</p>
        <a class="inline-link" href="/">Go to home</a>
      </section>
    `);

    return this.element;
  }
}
