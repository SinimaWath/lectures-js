import './style.css';

import { createElement } from './shared/utils/create-element';
import { required } from './shared/utils/required';

class Teapot{
  private _element: HTMLElement | null = null;


  constructor() {
    // bind - создает новую функцию, с привязанным this
    // Для приватных методов не работает
    // this.start = this.start.bind(this);
  }

  get element(): HTMLElement {
    return required(this._element, 'Teapot element has been destroyed');
  }
}

const teapot = new Teapot();

document.body.append(teapot.element);
