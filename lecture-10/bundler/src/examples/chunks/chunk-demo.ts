// Кнопка запускает dynamic import. Такой шаблон нужен,
// когда тяжёлый сценарий используется редко и его не хочется тянуть в первый экран.
export function createChunkDemoSection(): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "chunk-demo";

  const button = document.createElement("button");
  button.className = "chunk-demo__button";
  button.type = "button";
  button.textContent = "Загрузить ленивый модуль";

  const status = document.createElement("p");
  status.className = "status-line";
  status.textContent = "Модуль ещё не загружен.";

  const slot = document.createElement("div");
  slot.className = "chunk-demo__slot";

  button.addEventListener("click", async () => {
    status.textContent = "Идёт загрузка chunk feature-lab...";
    button.disabled = true;

    const { createFeaturePanel } = await import("./feature-panel");
    slot.replaceChildren(createFeaturePanel());

    status.textContent =
      "Готово: редкий функционал приехал отдельным chunk и не мешал первому экрану.";
    button.textContent = "Модуль уже загружен";
  });

  wrapper.append(button, status, slot);

  return wrapper;
}
