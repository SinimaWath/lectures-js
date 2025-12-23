import { createElement } from "./utils/createElement.js";

class Ball {
  element = null;

  #shiftX = 0;
  #shiftY = 0;

  constructor() {
    this.#render();
    this.#initListeners();
  }

  #render() {
    this.element = createElement(this.#template());
  }

  #template() {
    return `<img src="https://js.cx/clipart/ball.svg" width="40" height="40" class="ball">`;
  }

  #initListeners() {
    this.element.ondragstart = (event) => {
      // preventDefault - отменяет встроенное дествие браузера
      event.preventDefault();
    };
    // pointer = mouse (Ipad, Touchpad, мышка и все остальное ) + touch (Телефон)
    this.element.addEventListener("pointerdown", this.#onDown);
  }

  #onDown = (event) => {
    document.addEventListener("pointermove", this.#onMove);
    document.addEventListener("pointerup", this.#onUp, { once: true });

    // В нашем примере можно было написать 20/20
    // Так же можно было сделать через css
    this.#shiftX = this.element.offsetWidth / 2;
    this.#shiftY = this.element.offsetHeight / 2;

    this.#moveAt(event.clientX, event.clientY);

    this.element.classList.add("ball_dragging");
  };

  #onMove = (event) => {
    this.#moveAt(event.clientX, event.clientY);
  };

  #onUp = () => {
    document.removeEventListener("pointermove", this.#onMove);

    this.element.classList.remove("ball_dragging");
  };

  #moveAt = (x, y) => {
    this.element.style.left = `${x - this.#shiftX}px`;
    this.element.style.top = `${y - this.#shiftY}px`;
  };

  destroy() {}
}

const b = new Ball();

document.body.append(b.element);
