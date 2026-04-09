(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=document.createElement(`template`);t.innerHTML=e.trim();let n=t.content.firstElementChild;if(!(n instanceof HTMLElement))throw Error(`Expected HTML markup with a root HTMLElement`);return n}var t=class{element=null;#e=null;#t=0;#n=null;render(){if(this.element=e(`
      <section class="page">
        <h1>About</h1>
        <p>
          This page keeps a small timer running while it is mounted. The router
          stops it in destroy() when you navigate away.
        </p>
        <div class="card">
          <div class="muted">Time on page</div>
          <div class="timer" data-element="timer">0s</div>
        </div>
      </section>
    `),this.#n=this.element.querySelector(`[data-element="timer"]`),!this.#n)throw Error(`Timer element was not rendered`);return this.#t=Date.now(),this.#e=window.setInterval(()=>{if(!this.#n)return;let e=Math.floor((Date.now()-this.#t)/1e3);this.#n.textContent=`${e}s`},1e3),this.element}destroy(){this.#e!==null&&(window.clearInterval(this.#e),this.#e=null)}},n=[{name:`Lighting`,query:`lamp`},{name:`Workspace`,query:`desk`},{name:`Audio`,query:`audio`},{name:`Storage`,query:`kit`}],r=class{element=null;render(){return this.element=e(`
      <section class="page">
        <h1>Categories</h1>
        <p>
          These are regular links. The router intercepts them and updates the
          URL without a reload.
        </p>
        <ul class="list">
          ${n.map(({name:e,query:t})=>`
              <li>
                <a class="inline-link" href="/products?q=${t}">
                  ${e}
                </a>
                <span class="badge">/products?q=${t}</span>
              </li>
            `).join(``)}
        </ul>
      </section>
    `),this.element}},i=class{element=null;#e;#t=null;constructor({router:e}){this.#e=e}render(){if(this.element=e(`
      <section class="page">
        <h1>SPA routing with History API</h1>
        <p>
          This page never reloads. The router intercepts clicks, updates the URL
          with history.pushState, and renders the right component.
        </p>
        <div class="grid">
          <div class="card">
            <h3>1. Click interception</h3>
            <p>Links are handled once, through event delegation.</p>
          </div>
          <div class="card">
            <h3>2. URL updates</h3>
            <p>History API keeps browser navigation working.</p>
          </div>
          <div class="card">
            <h3>3. Component swap</h3>
            <p>Only the main content area is replaced.</p>
          </div>
        </div>
        <button class="button-primary" type="button" data-action="go-products">
          Go to products
        </button>
        <p class="muted">
          Tip: try opening <a href="/missing" class="inline-link">/missing</a>
          to see the 404 page.
        </p>
      </section>
    `),this.#t=this.element.querySelector(`[data-action="go-products"]`),!this.#t)throw Error(`Products CTA button was not rendered`);return this.#t.addEventListener(`click`,this.#n),this.element}destroy(){this.#t?.removeEventListener(`click`,this.#n)}#n=()=>{this.#e.navigate(`/products`)}},a=class{element=null;render(){return this.element=e(`
      <section class="page">
        <h1>404</h1>
        <p>The route does not exist. Check the URL or go back home.</p>
        <a class="inline-link" href="/">Go to home</a>
      </section>
    `),this.element}},o=[{id:1,name:`Studio Lamp`,price:39,tag:`new`},{id:2,name:`Travel Kettle`,price:58,tag:`sale`},{id:3,name:`Desk Organizer`,price:24,tag:`new`},{id:4,name:`Analog Timer`,price:19,tag:`classic`},{id:5,name:`Audio Dock`,price:89,tag:`limited`},{id:6,name:`Cable Kit`,price:12,tag:`basic`}];new class{currentPage=null;#e;#t;#n;constructor({routes:e,rootSelector:t}){this.#e=e,this.#t=this.#r(t),this.#n=e.find(e=>e.path===`*`)??null}init(){document.body.addEventListener(`click`,this.#c),window.addEventListener(`popstate`,this.#l),this.render(window.location.pathname+window.location.search)}destroy(){document.body.removeEventListener(`click`,this.#c),window.removeEventListener(`popstate`,this.#l),this.#a()}navigate(e,{replace:t=!1}={}){let n=new URL(e,window.location.origin),r=n.pathname+n.search;t?history.replaceState(null,``,r):history.pushState(null,``,r),this.render(r)}async render(e){let{pathname:t}=this.#i(e),n=this.#e.find(e=>e.path===t)??this.#n;if(!n)return;this.#a(),this.currentPage=new n.component({path:t,router:this});let r=await this.currentPage.render();this.#t.replaceChildren(r),this.#o(t),this.#s(n.title)}#r(e){let t=document.querySelector(e);if(!t)throw Error(`Router root element not found: ${e}`);return t}#i(e){let t=new URL(e,window.location.origin);return{pathname:t.pathname,search:t.search}}#a(){this.currentPage?.destroy?.(),this.currentPage=null}#o(e){document.querySelectorAll(`[data-nav-link]`).forEach(t=>{let n=t.getAttribute(`href`);if(!n)return;let r=new URL(n,window.location.origin).pathname===e;t.classList.toggle(`is-active`,r),r?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)})}#s(e){document.title=e?`${e} | Vanilla SPA`:`Vanilla SPA`}#c=e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let t=e.target;if(!(t instanceof Element))return;let n=t.closest(`a[href]`);if(!n||n.target===`_blank`||n.hasAttribute(`download`)||n.getAttribute(`rel`)===`external`)return;let r=n.getAttribute(`href`);if(!r)return;let i=new URL(r,window.location.origin);i.origin===window.location.origin&&(e.preventDefault(),this.navigate(i.pathname+i.search))};#l=()=>{this.render(window.location.pathname+window.location.search)}}({routes:[{path:`/`,title:`Home`,component:i},{path:`/products`,title:`Products`,component:class{element=null;#e=null;#t=null;#n=null;#r=null;#i=null;#a=null;render(){if(this.element=e(`
      <section class="page">
        <h1>Products</h1>
        <p>
          The filter updates the URL with history.replaceState, so the Back
          button does not step through each keystroke.
        </p>

        <div class="filter">
          <input
            type="search"
            name="query"
            placeholder="Filter products"
            autocomplete="off"
            data-element="filter"
          />
          <button type="button" data-action="clear">Clear</button>
        </div>

        <div class="muted">URL: <span data-element="url"></span></div>

        <ul class="list" data-element="list"></ul>
      </section>
    `),this.#e=this.element.querySelector(`[data-element="filter"]`),this.#t=this.element.querySelector(`[data-element="list"]`),this.#n=this.element.querySelector(`[data-element="url"]`),this.#r=this.element.querySelector(`[data-action="clear"]`),!this.#e||!this.#t||!this.#n||!this.#r)throw Error(`Products page markup is incomplete`);let t=this.#o();return this.#e.value=t,this.#i=()=>{if(!this.#e)return;let e=this.#e.value.trim();this.#l(e),this.#s(e)},this.#a=()=>{this.#e&&(this.#e.value=``,this.#i?.(new Event(`input`)))},this.#e.addEventListener(`input`,this.#i),this.#r.addEventListener(`click`,this.#a),this.#l(t),this.#c(),this.element}destroy(){this.#e&&this.#i&&this.#e.removeEventListener(`input`,this.#i),this.#r&&this.#a&&this.#r.removeEventListener(`click`,this.#a)}#o(){return new URLSearchParams(window.location.search).get(`q`)??``}#s(e){let t=new URL(window.location.href);e?t.searchParams.set(`q`,e):t.searchParams.delete(`q`),history.replaceState(history.state,``,t.pathname+t.search),this.#c()}#c(){this.#n&&(this.#n.textContent=window.location.pathname+window.location.search)}#l(e){if(!this.#t)return;let t=e.trim().toLowerCase(),n=o.filter(e=>e.name.toLowerCase().includes(t));if(n.length===0){this.#t.innerHTML=`<li>No matches found</li>`;return}this.#t.innerHTML=n.map(e=>`
          <li data-product-id="${e.id}">
            <span>${e.name}</span>
            <span>
              <span class="badge">${e.tag}</span>
              $${e.price}
            </span>
          </li>
        `).join(``)}}},{path:`/categories`,title:`Categories`,component:r},{path:`/about`,title:`About`,component:t},{path:`*`,title:`Not Found`,component:a}],rootSelector:`#content`}).init();var s=document.querySelector(`[data-action="back"]`),c=document.querySelector(`[data-action="forward"]`);s?.addEventListener(`click`,()=>{history.back()}),c?.addEventListener(`click`,()=>{history.forward()});