import './style.css';

import { createElement } from './shared/utils/create-element';
import { required } from './shared/utils/required';

class Teapot implements EventListenerObject {
  private _element: HTMLElement | null = null;
  private timerId: number = 0;

  constructor() {
    // this.onStart = () => {};
    this._element = createElement(this.template);

    this.initEventListeners();
  }

  private initEventListeners() {
    const button = this.element.querySelector<HTMLElement>('[data-element="turnon"]');

    if (!button) {
      throw new Error('No button')
    }

    // button.onStart = this.onStart
    // button.onStart(event);
    // ---- 
    // Потеря контекста (this)
    // button.addEventListener('click', () => this.onStart()); // Такой обработчик события нельзя удалить
    button.addEventListener('click', this.onStart);
    button.addEventListener('click', this);
    // button.removeEventListener('click', this);

    // const _this = this;
    // const _thisOnStart = this.onStart.bind(_this);
    // button.addEventListener('click', _thisOnStart); // 

    // button.onclick = () => {
    //   alert('From onclick');
    // };

    // button.onclick = () => {
    //   alert('From onclick 2');
    // }

    // // button.onlick = null;

    // const onClick = () => {
    //   alert('add event listeners 2');
    // };

    // button.addEventListener('click', onClick);

    // button.removeEventListener('click', onClick);

    // // Одноразывае по типу удаления
    // button.addEventListener('click', () => {
    //   alert('add event listeners 3');
    // }, { once: true, passive: true, capture: true });
  }

  get element(): HTMLElement {
    return required(this._element, 'Teapot element has been destroyed');
  }

  private get template() {
    return `
      <main class="main js-main-1">
		    <button class="js-button-1" data-element="turnon" onclick="this.element">
          <div>Включить чайник</div>
        </button>
		    <div class="status js-status" data-element="status">Не закипел<div>
		  </main>
    `;
  }


  handleEvent(event: Event): void {
    console.log(event);
    // if (..) {

    // }

    // if (...) {

    // }
  }

  // Фукнция создается каждый раз на новый экземпляр
  // Но сохраняет this экземпляра
  private onStart = () => {
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

const button = teapot.element.querySelector('button');
// if (button) {
//   button.onclick = () => {
//     alert('asd')
//   }
// }

document.body.append(teapot.element);
