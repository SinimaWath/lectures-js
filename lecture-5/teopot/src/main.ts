import "./style.css";

import { createElement } from "./createElement";

class Teopot implements EventListenerObject {
  element: HTMLElement;

  constructor() {
    this.element = createElement(this.template());
    this.render();
  }

  private render() {
    this.element.addEventListener("click", this.onElementClick);

    const button = this.element.querySelector<HTMLButtonElement>(
      '[data-element="turnon"]',
    );
    if (!button) {
      return;
    }

    const fn = this.onButtonClick;

    // button.fn()
    // fn.bind(this)
    // button.addEventListener("click", fn);
    button.addEventListener("click", this);
    // button.removeEventListener("click", this);

    // button.onclick = () => {
    //   console.log("Event Listener");
    //   button.onclick = null;
    // };

    // button.addEventListener("click", () => {
    //   console.log("Add Event Listener");
    // });

    // const onClick = () => {
    //   console.log("Add Event Listener 2");
    // };

    // button.addEventListener("click", onClick, {
    //   once: true,
    //   //   capture: true,
    //   //   passive: true,
    // });

    // button.removeEventListener("click", onClick);
  }

  // this внутри handleEvent всегда указывает на сам обьект класса
  handleEvent(object: Event): void {
    if (object.type === "click") {
      console.log(object);
      this.onButtonClick();
    }
  }

  private onElementClick = (event: Event) => {
    event.currentTarget; // <main />

    if ((event.target as HTMLElement).dataset.element !== "turnon") {
      return;
    }

    this.onButtonClick();
  };

  // Стрелочная: this берется из замыкания.
  private onButtonClick() {
    setTimeout(() => {
      const status = this.element.querySelector<HTMLDivElement>(
        '[data-element="status"]',
      );
      if (!status) {
        return;
      }

      status.textContent = "Закипел";
    }, 1000);
  }

  // Обычная: this определяется в момент вызова. Обьект слева от точки.
  private template() {
    return `
        <main class="main js-main-1">
            <button class="js-button-1" data-element="turnon" onclick="console.log('123')">
                <div>
                    Включить чайник <span></span>
                </div>
            </button>
            <div class="status js-status" data-element="status">Не закипел<div>
        </main>
    `;
  }
}

const teapot = new Teopot();

document.querySelector("#app")?.append(teapot.element);
