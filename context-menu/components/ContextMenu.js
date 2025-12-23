export class ContextMenu {
  static activeMenu = null;

  element = null;
  #items = [];

  constructor(items) {
    this.#items = items ?? this.#items;
    this.#render();
  }

  #template() {
    return `
              <div class="context-menu">
                  <ul class="context-menu__list">
                      ${this.#items
                        .map(({ text }) => `<li class="menu-item">${text}</li>`)
                        .join()}
                  </ul>
              </div>
            `;
  }

  #render() {
    const tmp = document.createElement("div");
    tmp.innerHTML = this.#template();
    this.element = tmp.firstElementChild;
  }

  show(clientX, clientY) {
    if (ContextMenu.activeMenu) {
      ContextMenu.activeMenu.remove();
    }

    this.element.style.position = "fixed";
    this.element.style.left = `${clientX}px`;
    this.element.style.top = `${clientY}px`;

    document.body.append(this.element);

    ContextMenu.activeMenu = this;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    if (ContextMenu.activeMenu === this) {
      ContextMenu.activeMenu = null;
    }
  }
}
