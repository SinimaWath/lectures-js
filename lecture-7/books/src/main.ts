import { createElement } from "./utils/create-element";
import { required } from "./utils/required";
import { Book, isBookArray } from "./domain/books";
import { Discount, isDiscountArray } from "./domain/discounts";

import "./style.css";

class BookStore {
  private _element: HTMLElement | null = null;
  private books: Book[] = [];

  constructor() {
    this._element = createElement(this.template());
    this.initListeners();
  }

  private fetchBooks(): Promise<Book[]> {
    return fetch("./books.json")
      .then((response) => response.json()) // Promise<any>
      .then((json) => {
        if (!isBookArray(json)) {
          throw new Error("Incorrect response");
        }

        return json;
      });
  }

  private async fetchDiscounts(): Promise<Discount[]> {
    const response = await fetch("./discounts.json");
    const json = await response.json();

    if (!isDiscountArray(json)) {
      throw new Error("Incorrect response");
    }

    return json;
  }

  private template(): string {
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
          <div class="lab__buttons" data-component="actions">
            <button data-component="reload">Обновить каталог</button>
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

  get element(): HTMLElement {
    return required(
      this._element,
      "Element has been destroyed or not rendered",
    );
  }

  private sub<T extends HTMLElement = HTMLElement>(element: string): T {
    return required(
      this.element.querySelector<T>(`[data-component="${element}"]`),
      `Sub element with data-component="${element}" not found`,
    );
  }

  private initListeners() {
    this.sub("reload").addEventListener("click", async () => {
      this.renderLoading(true);

      try {
        const [books, discounts] = await Promise.all([
          this.fetchBooks(),
          this.fetchDiscounts(),
        ]);

        this.books = books.map((book) => {
          const discount = discounts.find((d) => d.bookId === book.id);

          if (!discount) {
            return book;
          }

          return {
            ...book,
            price: book.price * (1 - discount.percent),
          };
        });
      } catch (e) {
        console.log("Catched Error", e);
      }

      this.renderLoading(false);

      this.renderBooks();

      this.sub("actions").innerHTML +=
        `<button data-component="export">Экспорт</button>`;

      this.sub("export").addEventListener("click", async () => {
        // lazy load спомощью динамического импорта.
        const module = await import("./utils/csv");
        module.csvCopyToBuffer(this.books);
      });
    });
  }

  private renderBooks() {
    const list = this.sub("list");
    list.innerHTML = "";
    const fragment = document.createDocumentFragment();

    this.books.forEach((book) => {
      const li = createElement(`
        <li class="lab__item">
          <div class="lab__tag">#${book.id} <span>новинка</span></div>
          <div><strong>${book.title}</strong></div>
          <div class="lab__small">Автор: ${book.author ?? "уточняется"}</div>
          <div class="lab__price">${book.price.toFixed(2)}$</div>
        </li>
      `);

      fragment.append(li);
    });

    list.append(fragment);
  }

  private renderLoading(status: boolean) {
    const loading = createElement(`<div>Книги загружаются....</div>`);

    if (status) {
      this.sub("list").append(loading);
    } else {
      this.sub("list").innerHTML = "";
    }
  }
}

const store = new BookStore();
document.body.append(store.element);
