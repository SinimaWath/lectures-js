import { createElement } from "../utils/createElement.js";

export class AboutPage {
  element = null;

  #timerId = null;
  #startedAt = 0;
  #timerEl = null;

  render() {
    this.element = createElement(`
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

    this.#timerEl = this.element.querySelector('[data-element="timer"]');
    this.#startedAt = Date.now();

    this.#timerId = window.setInterval(() => {
      const seconds = Math.floor((Date.now() - this.#startedAt) / 1000);
      this.#timerEl.textContent = `${seconds}s`;
    }, 1000);

    return this.element;
  }

  destroy() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
    }
  }
}
