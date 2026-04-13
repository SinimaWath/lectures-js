type LabelledConstructor = {
  note?: string;
};

function withBundleNote(note: string) {
  return function (target: LabelledConstructor): void {
    target.note = note;
  };
}

// Этот файл проходит через SWC-плагин из vite.config.ts.
// Пример полезен, когда часть проекта нуждается в другом трансформере
// или в поддержке синтаксиса, который команда хочет обрабатывать отдельно.
@withBundleNote("SWC обработал декоратор и подготовил этот модуль к работе в браузере.")
class SwcDecoratedExample {
  static note = "Декоратор не сработал";
}

export const swcSummary = SwcDecoratedExample.note;
