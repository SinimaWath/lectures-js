// 1 - use strict;
// 2 - По аналогии с <script defer>
import { ContextMenu } from "./components/ContextMenu.js";

const menu = new ContextMenu([
  {
    text: "Save",
  },
  {
    text: "Load",
  },
]);

document.body.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  menu.show(event.clientX, event.clientY);
});

document.addEventListener("click", () => {
  menu.remove();
});
