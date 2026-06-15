import "./style.css";
import { ContextMenu } from "./features/context-menu/component";

const data = [{ text: "Refresh" }, { text: "Settings" }];
const data2 = [{ text: "Delete" }, { text: "Remove" }];

const menu = new ContextMenu(data);
const menu2 = new ContextMenu(data2);

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  menu.show(event.clientX, event.clientY);
});

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  menu2.show(event.clientX, event.clientY);
});

document.addEventListener("click", () => {
  if (ContextMenu.activeMenu) {
    ContextMenu.activeMenu.remove();
  }
});
