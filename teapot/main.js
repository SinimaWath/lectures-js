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
    this.#sub("button").addEventListener("click", this.#start);

    // 2 способа если не нужно сохранять ссылку

    // this.#sub("button").addEventListener("click", this.#start.bind(this));
    // this.#sub("button").addEventListener("click", () => this.#start());
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
      this.element.dispatchEvent(this.#createFinishEvent());
    }, 3000);
  };

  // Сохраняет контекст
  // Все в одном методы
  // Легко удалить
  // Оптмизация - Один обработчик на все события
  handleEvent(event) {
    console.log("handleEvent", event);

    switch (event.type) {
      case "click":
        this.#start();
        break;
      default:
        console.log("unsupported event");
    }
  }

  #createFinishEvent() {
    return new CustomEvent("teapot-ready", {
      bubbles: true,
      detail: {
        foo: "bar",
      },
    });
  }

  destroy() {
    this.#sub("button").removeEventListener("click", this.#start);

    clearTimeout(this.#timerId);

    this.element.remove();

    this.element = null;
  }

  #testInitListeners() {
    // 1 - Нельзя повесить несколько обработчиков события
    // 2 - Не работают все события, DOMContentLoaded
    this.#sub("button").onclick = () => {
      alert("Чайник включен");
    };

    this.#sub("button").onclick = () => {
      alert("Чайник включен 2");
    };

    // Удалил пред
    this.#sub("button").onclick = null;

    // Добавление
    this.#sub("button").addEventListener("click", () => {
      alert("Чайник включен 3");
    });

    this.#sub("button").addEventListener("click", () => {
      alert("Чайник включен 4");
    });

    // Удаление не работает - потому что другая функция
    this.#sub("button").removeEventListener("click", () => {
      alert("Чайник включен 4");
    });

    this.#sub("button").addEventListener("click", this.#start);
    this.#sub("button").removeEventListener("click", this.#start);

    this.#sub("button").addEventListener(
      "click",
      () => {
        alert("Один раз: Чайник включен 5");
      },
      {
        once: true,
        // capture: true, - Аналитики, Событие не всплывает (focus, blur, mouseenter), Блокировка интерфейса
        // passive: false -> используется для обработки скролла
      }
    );

    // 4 способ. Можно передать обьект
    this.#sub("button").addEventListener("click", this);
  }
}

const t = new Teapot();

document.body.append(t.element);

document.addEventListener("teapot-ready", (event) => {
  console.log("Чайник", event);
});

// 1 - addEventListener
// 2 - .onclick = () => ...
// 3 - attribute html
// 4 - object, handleEvent
