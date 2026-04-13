import "./style.scss";

import lessonCards from "./content/bundler.lesson";
import { hmrMessage } from "./content/hmr-message";
import { createChunkDemoSection } from "./examples/chunks/chunk-demo";
import { swcSummary } from "./examples/swc/decorated-label";
import { formatBundlePrice } from "./examples/tree-shaking/pricing";
import { pluginMeta } from "virtual:lecture-meta";

type LessonCard = {
  id: string;
  title: string;
  description: string;
  reason: string;
};

type LoaderHotPayload = {
  file: string;
  updatedAt: string;
};

type HotModuleWithCustomEvents = NonNullable<ImportMeta["hot"]> & {
  on(
    event: "lecture:loader-updated",
    callback: (payload: LoaderHotPayload) => void,
  ): void;
};

const appRoot = document.querySelector("#app");

if (!(appRoot instanceof HTMLDivElement)) {
  throw new Error("App root was not found");
}

const app = appRoot;

let cardsState = [...lessonCards];
let hmrMessageState = hmrMessage;

const loaderGrid = document.createElement("div");
loaderGrid.className = "card-grid";

const loaderStatus = document.createElement("p");
loaderStatus.className = "status-line";
loaderStatus.textContent =
  "Лоадер уже отработал: карточки импортированы из src/content/bundler.lesson.";

const hmrValue = document.createElement("strong");
hmrValue.className = "hmr-value";
hmrValue.textContent = hmrMessageState;

const hmrStatus = document.createElement("p");
hmrStatus.className = "status-line";
hmrStatus.textContent =
  "Измените src/content/hmr-message.ts во время npm run dev.";

function createTextParagraph(text: string): HTMLParagraphElement {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  return paragraph;
}

function createExampleCard(
  title: string,
  description: string,
  reason: string,
): HTMLElement {
  const article = document.createElement("article");
  article.className = "example-card";

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  const descriptionElement = createTextParagraph(description);
  const reasonElement = createTextParagraph(`Зачем нужен: ${reason}`);
  reasonElement.className = "example-card__reason";

  article.append(titleElement, descriptionElement, reasonElement);

  return article;
}

function renderLoaderCards(cards: readonly LessonCard[]): void {
  loaderGrid.replaceChildren(
    ...cards.map((card) =>
      createExampleCard(card.title, card.description, card.reason),
    ),
  );
}

function createSection(
  title: string,
  badge: string,
  description: string,
  children: readonly HTMLElement[],
): HTMLElement {
  const section = document.createElement("section");
  section.className = "lesson-section";

  const header = document.createElement("div");
  header.className = "section-header";

  const badgeElement = document.createElement("span");
  badgeElement.className = "section-badge";
  badgeElement.textContent = badge;

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  header.append(badgeElement, titleElement, descriptionElement);
  section.append(header, ...children);

  return section;
}

function createPluginSection(): HTMLElement {
  const card = document.createElement("article");
  card.className = "example-card";

  const title = document.createElement("h3");
  title.textContent = "virtual:lecture-meta";

  const name = createTextParagraph(`Плагин: ${pluginMeta.pluginName}`);
  const event = createTextParagraph(
    `Кастомное HMR-событие: ${pluginMeta.hmrEvent}`,
  );
  const chunk = createTextParagraph(
    `Имя отдельного чанка: ${pluginMeta.chunkName}`,
  );
  const note = createTextParagraph(`Зачем нужен: ${pluginMeta.note}`);
  note.className = "example-card__reason";

  card.append(title, name, event, chunk, note);

  return createSection(
    "Плагин",
    "plugin",
    "Плагин в Vite нужен, когда стандартной сборки уже мало и проекту нужны собственные хуки, virtual modules или особое поведение dev server.",
    [card],
  );
}

function createHmrSection(): HTMLElement {
  const card = document.createElement("article");
  card.className = "example-card";

  const title = document.createElement("h3");
  title.textContent = "Горячая замена модуля";

  const description = createTextParagraph(
    "HMR полезен, чтобы обновлять только изменённый модуль, а не перезагружать всю страницу.",
  );

  const value = document.createElement("p");
  value.className = "example-card__hmr";
  value.append("Текущее сообщение: ", hmrValue);

  card.append(title, description, value, hmrStatus);

  return createSection(
    "HMR",
    "hmr",
    "Попробуйте изменить src/content/hmr-message.ts: блок ниже обновится сам и покажет, что Vite доставил модуль по горячей замене.",
    [card],
  );
}

function createScssSection(): HTMLElement {
  const card = document.createElement("article");
  card.className = "example-card scss-demo";

  const title = document.createElement("h3");
  title.textContent = "SCSS + additionalData";

  const description = createTextParagraph(
    "SCSS нужен, когда проекту важны переменные, вложенность и переиспользуемые mixin для дизайн-системы.",
  );

  const badgeRow = document.createElement("div");
  badgeRow.className = "scss-demo__badges";
  badgeRow.innerHTML = `
    <span class="scss-demo__token">accent token</span>
    <span class="scss-demo__token">surface mixin</span>
    <span class="scss-demo__token">nested styles</span>
  `;

  const note = createTextParagraph(
    "Здесь переменные и mixin доступны без локального @use, потому что Vite добавляет их через css.preprocessorOptions.scss.additionalData.",
  );
  note.className = "example-card__reason";

  card.append(title, description, badgeRow, note);

  return createSection(
    "SCSS",
    "scss",
    "Стили ниже демонстрируют, как Vite подключает общие токены ко всем SCSS-файлам и помогает держать визуальную систему в одном месте.",
    [card],
  );
}

function createSwcSection(): HTMLElement {
  const card = document.createElement("article");
  card.className = "example-card";

  const title = document.createElement("h3");
  title.textContent = "SWC-трансформация";

  const description = createTextParagraph(
    "SWC полезен, если часть проекта нужно собирать другим трансформером: например, ради особого синтаксиса, миграции или ускорения обработки отдельных файлов.",
  );

  const result = createTextParagraph(`Результат декоратора: ${swcSummary}`);
  result.className = "highlight-line";

  card.append(title, description, result);

  return createSection(
    "SWC",
    "swc",
    "Файл src/examples/swc/decorated-label.ts проходит через SWC-плагин из vite.config.ts, а не через стандартный путь трансформации.",
    [card],
  );
}

function createTreeShakingSection(): HTMLElement {
  const card = document.createElement("article");
  card.className = "example-card";

  const title = document.createElement("h3");
  title.textContent = "Tree shaking в production";

  const description = createTextParagraph(
    "Tree shaking нужен, чтобы неиспользуемые экспорты не попадали в production bundle и не раздували итоговый размер приложения.",
  );

  const value = createTextParagraph(
    `Используемый экспорт formatBundlePrice(3490): ${formatBundlePrice(3490)}`,
  );
  value.className = "highlight-line";

  const note = createTextParagraph(
    "После npm run build строка TREE_SHAKING_SENTINEL не должна находиться в dist — это хороший признак, что неиспользуемый код был вырезан.",
  );
  note.className = "example-card__reason";

  card.append(title, description, value, note);

  return createSection(
    "Tree shaking",
    "shake",
    "Пример опирается на модуль pricing.ts: приложение импортирует только одну функцию, а всё лишнее должно исчезнуть из production-сборки.",
    [card],
  );
}

function createLoaderSection(): HTMLElement {
  renderLoaderCards(cardsState);

  return createSection(
    "Лоадер",
    "loader",
    "Карточки ниже приехали из файла с расширением .lesson. Это наглядный пример custom loader: Vite превращает доменный формат в обычный импортируемый модуль.",
    [loaderStatus, loaderGrid],
  );
}

function createIntroSection(): HTMLElement {
  const wrapper = document.createElement("section");
  wrapper.className = "hero";

  const title = document.createElement("h1");
  title.textContent = "Vite как бандлер: учебный стенд";

  const description = document.createElement("p");
  description.textContent =
    "На этой странице собраны небольшие живые примеры, которые показывают, зачем в проекте нужны лоадеры, плагины, HMR, SCSS, SWC, оптимизация чанков и tree shaking.";

  wrapper.append(title, description);

  return wrapper;
}

function render(): void {
  app.replaceChildren(
    createIntroSection(),
    createLoaderSection(),
    createPluginSection(),
    createHmrSection(),
    createScssSection(),
    createSwcSection(),
    createTreeShakingSection(),
    createSection(
      "Оптимизация чанков",
      "chunks",
      "Нажмите кнопку ниже, чтобы загрузить редкий сценарий отдельно. Этот пример показывает и dynamic import, и manualChunks.",
      [createChunkDemoSection()],
    ),
  );
}

render();

const hot = import.meta.hot as HotModuleWithCustomEvents | undefined;

if (hot) {
  hot.accept("./content/hmr-message.ts", (module) => {
    if (!module) {
      return;
    }

    hmrMessageState = module.hmrMessage;
    hmrValue.textContent = hmrMessageState;
    hmrStatus.textContent = `HMR обновил только этот блок в ${new Date().toLocaleTimeString("ru-RU")}.`;
  });

  hot.accept("./content/bundler.lesson", (module) => {
    if (!module) {
      return;
    }

    cardsState = [...module.default];
    renderLoaderCards(cardsState);
    loaderStatus.textContent =
      "Лоадер перечитал bundler.lesson и Vite обновил только секцию с карточками.";
  });

  hot.on("lecture:loader-updated", (payload) => {
    loaderStatus.textContent = `${payload.file} обновлён в ${payload.updatedAt}. Карточки перерисованы через custom HMR flow.`;
  });
}
