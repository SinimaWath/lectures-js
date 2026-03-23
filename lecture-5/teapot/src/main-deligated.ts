import './style.css';

import { createElement } from './shared/utils/create-element';
import { required } from './shared/utils/required';

class Teapot {
  private _element: HTMLElement | null = null;
  private timerId: number = 0;

  constructor() {
    // this.onStart = () => {};
    this._element = createElement(this.template);

    this.element.addEventListener('click', this.onClick);
  }


  get element(): HTMLElement {
    return required(this._element, 'Teapot element has been destroyed');
  }

  private get template() {
    return `
      <main class="main js-main-1">
        <button class="js-button-1" data-element="turnon" onclick="this.element">
          <div>Включить чайник</div>
          <img></img>
        </button>
        <div class="status js-status" data-element="status">Не закипел<div>
    </main>
    `;
  };

  // Фукнция создается каждый раз на новый экземпляр
  // Но сохраняет this экземпляра
  private onClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!('tagName' in target)) {
        return;
    }

    if (!target.closest('[data-element="turnon"]')) {
        return;
    }

    // target, currentTarget === this

    const status = this.element.querySelector('[data-element="status"]');
    if (!status) {
      return;
    }

    status.textContent = 'Закипает';

    this.timerId = setTimeout(() => {
      status.textContent = 'Закипел';
    }, 2000); // ms
  }

  destroy() {
    clearTimeout(this.timerId);
  }
}

const teapot = new Teapot();

document.body.append(teapot.element);
