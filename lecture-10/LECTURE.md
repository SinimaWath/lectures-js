## Приложение

- JS
- TS
- HTML
- CSS => SASS, Post CSS.
- Assets:
  - Fonts
  - Img
  - Shader's
  - Wasm (Figma C++ => Wasm)
    ...
- Service Worker (отдельный JS)
- Web Worker (отдельный JS)
  ...

## Какие задачи

- Разрешение зависимостей. Анализ импортов, поиск файлов в node_modules => Единому графу зависимостей.
- Унификация модули. ESM. Но половина использует CJS
- Преобразования. TS => JS, SASS => CSS, IMG => Comperrsion.
  - TS => JS => JS.
- Tree Shaking. Устранение мертвого кода.
  - EU => Баннер для куки
  - RU => Баннер для куки не нужен => можно удалить через Tree Shaking
- Code Splitting (Разделение кода). Автоматически разбивать приложения на chunk-s (части) для ленивой загрузки.
  - Cache через hash, app.a123njasd.js
  - 1 чанк = плохо, 1млн чанков = плохо. Нужно найти середину золотую
- Minification & Obfuscation.
- Other
  - DX - HMR (Hot module replacement), source maps, ....
