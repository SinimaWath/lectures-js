import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { transformSync } from "@swc/core";
import { defineConfig, type Plugin } from "vite";

type LessonCard = {
  id: string;
  title: string;
  description: string;
  reason: string;
};

function parseLessonSource(source: string): LessonCard[] {
  return source
    .trim()
    .split(/\n\s*\n/)
    .map((block, index) => {
      const meaningfulLines = block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith("#"));

      if (meaningfulLines.length === 0) {
        return null;
      }

      const fields = Object.fromEntries(
        meaningfulLines.map((line) => {
          const separatorIndex = line.indexOf(":");

          if (separatorIndex === -1) {
            throw new Error(`Invalid lesson line: ${line}`);
          }

          const key = line.slice(0, separatorIndex).trim();
          const value = line.slice(separatorIndex + 1).trim();

          return [key, value];
        }),
      );

      return {
        id: fields.id ?? `example-${index + 1}`,
        title: fields.title ?? "Без названия",
        description: fields.description ?? "Описание не указано",
        reason: fields.reason ?? "Причина использования не указана",
      };
    })
    .filter((card): card is LessonCard => card !== null);
}

function lessonLoader(): Plugin {
  return {
    name: "lesson-loader",
    enforce: "pre",
    load(id) {
      if (!id.endsWith(".lesson")) {
        return null;
      }

      // binaryCal(....);

      const source = readFileSync(id, "utf8");
      const cards = parseLessonSource(source);

      return `export default ${JSON.stringify(cards, null, 2)};`;
    },
  };
}

function lectureToolsPlugin(): Plugin {
  const virtualId = "virtual:lecture-meta";
  const resolvedVirtualId = `\0${virtualId}`;

  return {
    name: "lecture-tools-plugin",
    resolveId(id) {
      return id === virtualId ? resolvedVirtualId : null;
    },
    load(id) {
      if (id !== resolvedVirtualId) {
        return null;
      }

      return `export const pluginMeta = ${JSON.stringify(
        {
          pluginName: "lecture-tools-plugin",
          hmrEvent: "lecture:loader-updated",
          chunkName: "feature-lab",
          note: "Плагин создаёт virtual module, добавляет атрибут в index.html и шлёт HMR-событие при изменении .lesson файла.",
        },
        null,
        2,
      )};`;
    },
    transformIndexHtml(html) {
      return html.replace(
        "<body>",
        '<body data-powered-by="lecture-tools-plugin">',
      );
    },
    handleHotUpdate(context) {
      if (!context.file.endsWith(".lesson")) {
        return;
      }

      context.server.ws.send({
        type: "custom",
        event: "lecture:loader-updated",
        data: {
          file: path.basename(context.file),
          updatedAt: new Date().toLocaleTimeString("ru-RU"),
        },
      });
    },
  };
}

function swcExamplesPlugin(): Plugin {
  return {
    name: "swc-examples-plugin",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("/src/examples/swc/") || !id.endsWith(".ts")) {
        return null;
      }

      // SWC полезен, когда проекту нужен альтернативный трансформер:
      // например, для экспериментального синтаксиса, миграций или более
      // тонкой настройки компиляции отдельных файлов.
      const result = transformSync(code, {
        filename: id,
        sourceMaps: true,
        jsc: {
          target: "es2022",
          parser: {
            syntax: "typescript",
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: false,
          },
        },
        module: {
          type: "es6",
        },
      });

      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}

const srcDirectory = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": srcDirectory,
    },
  },
  plugins: [
    // Лоадер нужен, когда хочется импортировать не только JS/TS,
    // но и собственный формат данных команды или учебного материала.
    lessonLoader(),
    // Плагин расширяет Vite: добавляет virtual module и серверные хуки.
    lectureToolsPlugin(),
    // SWC подключаем точечно для файлов, которым нужен другой трансформер.
    swcExamplesPlugin(),
  ],
  server: {
    open: false,
    hmr: {
      overlay: true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Общие SCSS-переменные и mixin автоматически доступны во всех стилях.
        additionalData: '@use "@/styles/tokens.scss" as *;',
      },
    },
  },
  build: {
    rollupOptions: {
      // Tree shaking особенно полезен для production-сборки:
      // Rollup удаляет неиспользуемые экспорты и уменьшает итоговый bundle.
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        manualChunks(id) {
          // manualChunks показывает, как откладывать редкие функции
          // в отдельный файл и не грузить их в первый экран.
          if (id.includes("/src/examples/chunks/")) {
            return "feature-lab";
          }

          return undefined;
        },
      },
    },
  },
});
