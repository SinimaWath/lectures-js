// Global styles are bundled via style-loader + css-loader.
import './styles/main.css';

// CSS Modules are opt-in via the .module.css extension.
import * as buttonStyles from './styles/button.module.css';

// Asset Modules demo: logo.svg becomes a URL (or inline data URL for small files).
import logoUrl from './assets/logo.svg';

// Inline SVG demo: this file is always embedded into the bundle.
import inlineBadgeUrl from './assets/badge.inline.svg';

// Raw text demo: imported as a string via asset/source.
import introMessage from './assets/message.txt';

// Alias import (see resolve.alias in webpack.common.js).
import { sum } from '@/utils/math';

import { createButton } from './components/button';

// Class fields are supported via @babel/plugin-transform-class-properties.
class Counter {
  count = 0;

  increment() {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();
const app = document.querySelector('#app');

class AppView {
  constructor(root, counterInstance) {
    this.root = root;
    this.counter = counterInstance;
    this.lazyButton = null;
  }

  createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  build() {
    const content = this.createElement('div');
    content.innerHTML = `
      <header class="app-header">
        <img src="${logoUrl}" alt="Bundler demo logo" width="72" height="72">
        <img class="badge" src="${inlineBadgeUrl}" alt="Inline SVG badge" width="32" height="32">
        <h1>Webpack 5 bundler demo</h1>
        <p class="meta">Build time: ${__BUILD_TIME__} | API base: ${__API_BASE__}</p>
      </header>
      <p class="intro">${introMessage.trim()}</p>
      <p class="result">Tree-shaken sum(2, 3) = ${sum(2, 3)}</p>
      <p class="result">Class fields counter value: ${this.counter.increment()}</p>
      <div data-lazy-button></div>
    `;

    // See what in lazyButton
    this.lazyButton = createButton(buttonStyles.lazyButton, 'Load async module');

    this.lazyButton.addEventListener('click', async () => {
      // Dynamic import triggers code splitting into a separate chunk.
      const { createLazyCard } = await import(
        /* webpackChunkName: "lazy-card" */
        './components/lazy'
      );

      this.root.appendChild(createLazyCard());
      this.lazyButton.disabled = true;
    });

    const lazySlot = content.querySelector('[data-lazy-button]');
    if (lazySlot) {
      lazySlot.replaceWith(this.lazyButton);
    } else {
      content.appendChild(this.lazyButton);
    }

    while (content.firstChild) {
      this.root.appendChild(content.firstChild);
    }
  }
}

new AppView(app, counter).build();

// Enable hot reloading in development without a full page refresh.
if (module.hot) {
  module.hot.accept();
}
