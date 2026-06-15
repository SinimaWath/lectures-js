import { createElement } from "../../createElement";

interface Item {
  text: string;
}
// type Item = {
//     text: string;
// }

interface Component {
  element: HTMLElement;
  remove(): void;
  destroy(): void;
}

export const required = <T>(
  value: T | null | undefined,
  message: string,
): T => {
  if (value == null) {
    throw new Error(message);
  }

  return value;
};

export class ContextMenu implements Component {
  static activeMenu: ContextMenu | null;

  element: HTMLElement;

  constructor(private items: Item[]) {
    this.element = createElement(this.template());
  }

  show(x: number, y: number) {
    if (ContextMenu.activeMenu) {
      ContextMenu.activeMenu.remove();
    }

    const a = required(document.querySelector("a"), "failed to render");

    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;

    document.body.append(this.element);

    ContextMenu.activeMenu = this;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    if (ContextMenu.activeMenu === this) {
      ContextMenu.activeMenu = null;
    }
  }

  private template() {
    const items = this.items
      .map(
        (item) =>
          `<li class="menu-item" data-action="${item.text}">${item.text}</li>`,
      )
      .join("");

    return `
        <div class="context-menu">
            <ul class="context-menu__list">
                ${items}
            </ul>
        </div>
    `;
  }
}
