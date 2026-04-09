import { createElement } from "../utils/create-element";

export class AboutPage {
  element: HTMLElement | null = null;

  #timerId: number | null = null;
  #startedAt = 0;
  #timerElement: HTMLElement | null = null;

  render(): HTMLElement {
    this.element = createElement<HTMLElement>(`
      <section class="page">
        <h1>About</h1>
        <p>
          This page keeps a small timer running while it is mounted. The router
          stops it in destroy() when you navigate away.
        </p>
        <div class="card">
          <div class="muted">Time on page</div>
          <div class="timer" data-element="timer">0s</div>
        </div>
      </section>
    `);

    this.#timerElement = this.element.querySelector<HTMLElement>(
      '[data-element="timer"]',
    );

    if (!this.#timerElement) {
      throw new Error("Timer element was not rendered");
    }

    this.#startedAt = Date.now();
    this.#timerId = window.setInterval(() => {
      if (!this.#timerElement) {
        return;
      }

      const seconds = Math.floor((Date.now() - this.#startedAt) / 1000);
      this.#timerElement.textContent = `${seconds}s`;
    }, 1000);

    return this.element;
  }

  destroy(): void {
    if (this.#timerId !== null) {
      window.clearInterval(this.#timerId);
      this.#timerId = null;
    }
  }
}
