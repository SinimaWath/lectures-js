import './style.css';

import { createElement } from './shared/utils/create-element';
import { required } from './shared/utils/required';


class Ball {
    private _element: HTMLElement | null = null;
    private shiftX = 0;
    private shiftY = 0;

    constructor() {
        this._element = createElement<HTMLImageElement>(this.template);


        this.initListeners();
    }

    get element(): HTMLElement {
        return required(this._element, 'Ball element has been destroyed');
    }

    get template(): string {
        return '<img src="https://js.cx/clipart/ball.svg" width="40" height="40" class="ball" alt="Draggable ball">';
    }

    private initListeners(): void {
        // Указатель = Цифровые перья, Указки для проектора, Пальцы, Глаза, Мышка, Тачпад.
        // Pointer = touch + mouse
        // touch (Пальцы) - Клика на телефоне.
        // mouse (Мышка) - Все остальное.
        this.element.addEventListener('pointerdown', this.onDown);
        this.element.addEventListener('dragstart', this.onDragStart);
        document.addEventListener('keyup', this.onKeyUp);
    }


    private onDragStart(e: Event) {
        return e.preventDefault()
    }

    private onDown = () => {
        this.shiftX = this.element.offsetWidth / 2;
        this.shiftY = this.element.offsetHeight / 2;

        document.addEventListener('pointermove', this.onMove);
        document.addEventListener('pointerup', this.onUp, {once: true});
    };


    private onMove = ({clientX, clientY}: PointerEvent) => {
        this.element.style.left = `${clientX - this.shiftX}px`;
        this.element.style.top = `${clientY - this.shiftY}px`;
        
    };

    private onUp = () => {
        document.removeEventListener('pointermove', this.onMove);
    };

    private onKeyUp = (event: KeyboardEvent) => {
        console.log(event);

        if (event.code !== 'Escape') {
            return;
        }

        this.element.style.left = `50%`;
        this.element.style.top = `50%`;
    }

    destroy() {
        if (!this._element) {
            return;
        }

        this.element.removeEventListener('pointerdown', this.onDown);
        document.removeEventListener('pointermove', this.onMove);
        document.removeEventListener('pointerup', this.onUp);
        document.removeEventListener('keyup', this.onKeyUp);
        this.element.removeEventListener('dragstart', this.onDragStart);
        this.element.remove();
        this._element = null;
    }
}


const app = createElement(`
  <main class="ball-demo">
    <p class="ball-demo__hint">Drag the ball with pointer events.</p>
  </main>
`);

const ball = new Ball();
const ball2 = new Ball();


app.append(ball.element, ball2.element);
document.body.append(app);