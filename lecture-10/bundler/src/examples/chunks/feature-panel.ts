import { chunkLabel, featureSteps } from "./feature-data";

// Этот модуль грузится только по требованию.
// Пример нужен, чтобы показать пользу code splitting для редкого функционала.
export function createFeaturePanel(): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "lazy-feature";

  const title = document.createElement("h3");
  title.textContent = "Ленивый модуль загружен";

  const description = document.createElement("p");
  description.textContent = chunkLabel;

  const list = document.createElement("ol");

  for (const step of featureSteps) {
    const item = document.createElement("li");
    item.textContent = step;
    list.append(item);
  }

  wrapper.append(title, description, list);

  return wrapper;
}
