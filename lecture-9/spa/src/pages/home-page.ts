import type { PageContext } from "../types";
import { createElement } from "../utils/create-element";
import type { Router } from "../router";

export class HomePage {
  element: HTMLElement | null = null;

  readonly #router: Router;
  #ctaButton: HTMLButtonElement | null = null;

  constructor({ router }: PageContext<Router>) {
    this.#router = router;
  }

  render(): HTMLElement {
    this.element = createElement<HTMLElement>(`
      <section class="page">
        <h1>SPA routing with History API</h1>
        <p>
          This page never reloads. The router intercepts clicks, updates the URL
          with history.pushState, and renders the right component.
        </p>
        <div class="grid">
          <div class="card">
            <h3>1. Click interception</h3>
            <p>Links are handled once, through event delegation.</p>
          </div>
          <div class="card">
            <h3>2. URL updates</h3>
            <p>History API keeps browser navigation working.</p>
          </div>
          <div class="card">
            <h3>3. Component swap</h3>
            <p>Only the main content area is replaced.</p>
          </div>
        </div>
        <button class="button-primary" type="button" data-action="go-products">
          Go to products
        </button>
        <p class="muted">
          Tip: try opening <a href="/missing" class="inline-link">/missing</a>
          to see the 404 page.
        </p>
      </section>
    `);

    this.#ctaButton = this.element.querySelector<HTMLButtonElement>(
      '[data-action="go-products"]',
    );

    if (!this.#ctaButton) {
      throw new Error("Products CTA button was not rendered");
    }

    this.#ctaButton.addEventListener("click", this.#handleCtaClick);

    return this.element;
  }

  destroy(): void {
    this.#ctaButton?.removeEventListener("click", this.#handleCtaClick);
  }

  #handleCtaClick = (): void => {
    this.#router.navigate("/products");
  };
}
