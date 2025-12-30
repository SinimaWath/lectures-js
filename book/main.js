import { createElement } from "./utils/createElement.js";
import { delay } from "./utils/delay.js";

class BookStore {
  element = null;
  #books = [];

  constructor() {
    this.#render();
    this.#initListeners();
  }

  async loadBooks() {
    this.#renderLoading(true);

    try {
      //   this.#books = await this.#fetchBooks();

      //   this.#discounts = await this.#fetchDiscounts();

      // Promise.all/any/allSettled/race
      const [books, discounts] = await Promise.all([
        this.#fetchBooks(),
        this.#fetchDiscounts(),
      ]);

      this.#books = books.map((book) => {
        const discount = discounts.find((d) => d.bookId === book.id);
        return {
          ...book,
          price: (book.price * (1 - (discount?.percent ?? 0))).toFixed(2),
        };
      });
    } catch (e) {
      console.error(e);
    }

    this.#renderLoading(false);

    this.#renderBooks();
  }

  async #fetchDiscounts() {
    const response = await fetch("./discounts.json");
    const json = await response.json();
    return json;
  }

  // async -> делает что функия возвращает promise
  async #fetchBooks() {
    await delay(1000);

    const response = await fetch("./books.json");

    const json = await response.json();
    return json;
  }

  #template() {
    return `
      <main class="lab">
        <section class="lab__panel lab__controls">
          <div>
            <div class="lab__brand">
              <div class="lab__book">📚</div>
              <div>
                <h1>Book Store</h1>
              </div>
            </div>
            <p class="lab__hint">
              Кнопка перезагружает каталог.
            </p>
          </div>
          <div class="lab__buttons">
            <button data-component="reload">Обновить каталог</button>
            <button data-component="export">Экспортировать</button>
          </div>
        </section>

        <section class="lab__panel">
          <h2>Каталог книг</h2>
          <p class="lab__small">Асинхронно загружается и отображается в списке.</p>
          <ul class="lab__list" data-component="list"></ul>
        </section>
      </main>
    `;
  }

  #render() {
    this.element = createElement(this.#template());
  }

  #sub(name) {
    return this.element.querySelector(`[data-component="${name}"]`);
  }

  #initListeners() {
    this.#sub("reload").addEventListener("click", (event) => {
      this.loadBooks();
    });

    this.#sub("export").addEventListener("click", async () => {
      // Ленивая подгрузка модулей
      const { csvCopyToBuffer } = await import("./utils/csv.js");

      csvCopyToBuffer(this.#books);
    });
  }

  #renderLoading(status) {
    const loading = createElement(`<div>Книги загружаются....</div>`);

    if (status) {
      this.#sub("list").append(loading);
    } else {
      this.#sub("list").innerHTML = "";
    }
  }

  #renderBooks() {
    const list = this.#sub("list");
    list.innerHTML = "";
    // document.createElement('div');
    const fragment = document.createDocumentFragment();

    this.#books.forEach((book) => {
      const li = createElement(`
        <li class="lab__item">
          <div class="lab__tag">#${book.id} <span>новинка</span></div>
          <div><strong>${book.title}</strong></div>
          <div class="lab__small">Автор: ${book.author ?? "уточняется"}</div>
          <div class="lab__price">${book.price}$</div>
        </li>
      `);

      fragment.append(li);
    });

    list.append(fragment);
  }
}

const store = new BookStore();
document.body.append(store.element);
