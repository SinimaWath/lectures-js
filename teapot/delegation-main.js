import { createElement } from "./utils/createElement.js";

class Teapot {
  element = null;

  #timerId = -1;

  constructor() {
    this.#render();
    this.#initListeners();

    // bind - создает новую функцию, с привязанным this
    // Для приватных методов не работает
    // this.#start = this.#start.bind(this);
  }

  #render() {
    this.element = createElement(this.#template());
  }

  #template() {
    return `
        <main class="main js-main-1">
            <button 
                class="js-button-1" 
                data-component="button"
            >
                <div><strong>Включить</strong> чайник</div>
            </button>
            <div class="status js-status" data-component="status">Не закипел<div>
        </main>
        `;
  }

  #sub(name) {
    // TODO: Сделать cache на WeakMap
    return this.element.querySelector(`[data-component="${name}"]`);
  }

  #initListeners() {
    this.element.addEventListener("click", (event) => {
      // event.target - это елемент на котором произошло события
      // event.currentTarget - это елемент на котором прямо сейчас вызыван обработчик события
      // this - currentTarget - Это я бы не использовал
      console.log(event.target.dataset.component);

      // event.stopPropagation(); - остановить всплытие

      const isInButton = Boolean(
        event.target.closest(`[data-component="button"]`)
      );

      if (isInButton) {
        this.#start();
      }
    });
  }

  // Браузер в this передает DOM елемент.
  // Стрелочная функция: берет this из замыкание.
  // Нюанс: Теперь на каждый экземпляр класса, у вас новая функция.
  #start = () => {
    console.log("Запускаем чайник");
    this.#sub("status").textContent = "Закипает....";
    this.#sub("button").disabled = true;

    this.#timerId = setTimeout(() => {
      this.#sub("status").textContent = "Закипел";
      this.#sub("button").disabled = false;
    }, 3000);
  };

  destroy() {
    this.#sub("button").removeEventListener("click", this.#start);

    clearTimeout(this.#timerId);

    this.element.remove();

    this.element = null;
  }
}

const t = new Teapot();

document.body.append(t.element);
