import { createElement } from "../utils/createElement.js";

export class NotFoundPage {
  element = null;

  render() {
    this.element = createElement(`
      <section class="page">
        <h1>404</h1>
        <p>The route does not exist. Check the URL or go back home.</p>
        <a class="inline-link" href="/">Go to home</a>
      </section>
    `);

    return this.element;
  }
}
