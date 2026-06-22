import "./style.css";

import { required } from "./required";
import { createElement } from "./createElement";

type BallCustomEvents = "ball:dragg:finished" | "ball:dragg:started";

class Ball {
  element: HTMLElement;

  private shiftX = 0;
  private shiftY = 0;

  constructor() {
    this.element = createElement(this.template());
    this.render();
  }

  private render() {
    this.element.addEventListener("dragstart", (e) => e.preventDefault());
    this.element.addEventListener("pointerdown", this.onDown);
  }

  private template() {
    return '<img src="https://js.cx/clipart/ball.svg" width="40" height="40" class="ball" alt="Draggable ball">';
  }

  private moveAt(x: number, y: number) {
    this.element.style.left = `${x - this.shiftX}px`;
    this.element.style.top = `${y - this.shiftY}px`;
  }

  private onDown = () => {
    document.addEventListener("pointermove", this.onMove);
    document.addEventListener("pointerup", this.onUp, { once: true });
    this.element.classList.add("ball_dragging");

    this.shiftX = this.element.offsetWidth / 2;
    this.shiftY = this.element.offsetHeight / 2;

    this.dispatchEvent("ball:dragg:started");
  };

  private onMove = ({ clientX, clientY }: PointerEvent) => {
    this.moveAt(clientX, clientY);
  };

  private onUp = () => {
    document.removeEventListener("pointermove", this.onMove);
    this.element.classList.remove("ball_dragging");

    this.dispatchEvent("ball:dragg:finished");
  };

  private dispatchEvent(name: BallCustomEvents) {
    const event = new CustomEvent(name, {
      bubbles: true,
    });

    this.element.dispatchEvent(event);
  }
}

const ball = new Ball();

document.querySelector("#app")?.append(ball.element);

document.addEventListener("ball:dragg:finished", () => {
  console.log("ball stopped");
});
