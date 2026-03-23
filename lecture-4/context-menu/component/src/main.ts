import './style.css';

import { createElement } from './createElement';

interface Item {
    text: string;
}

const required = <T>(value: T | null | undefined, message: string = 'no found element'): T => {
  if (value == null) {
    throw new Error(message);
  }

  return value;
};

// interface Component {
//     element: HTMLElement;
// }
// 
// abstract class Component {
//
// }
class ContextMenu {

    public static activeMenu: ContextMenu | null;

    public element: HTMLElement;

    constructor(private items: Item[]) {
        this.element = createElement(this.template)
    }

    private get template() {
        const items = this.items.map(
            item => `<li class="menu-item" data-action="${item.text}">${item.text}</li>`
        ).join('');

        return `
            <div class="context-menu">
                <ul class="context-menu__list">
                    ${items}
                </ul>
            </div>
        `
    }

    public show(clientX: number, clientY: number) {
        if (ContextMenu.activeMenu) {
            ContextMenu.activeMenu.remove();
        }

        const ul = required(this.element.querySelector<HTMLUListElement>('.context-menu__list'));

        this.element.style.top = `${clientY}px`;
        this.element.style.left = `${clientX}px`;

        document.body.append(this.element);

        ContextMenu.activeMenu = this;
    }

    // Скрыть
    public remove() {
        this.element.remove();
    }

    // Удалить все: Ссылки на обьекты, подписки на события ....
    public destroy() {
        this.remove();
        if (ContextMenu.activeMenu === this) {
            ContextMenu.activeMenu = null;
        }
    }
}

const menu = new ContextMenu([
    {
        text: 'Refresh',
    },
    {
        text: 'Settings'
    }
]);

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    menu.show(event.clientX, event.clientY);
});

document.addEventListener('click', () => {
    if (ContextMenu.activeMenu) {
        ContextMenu.activeMenu.remove();
    }
})