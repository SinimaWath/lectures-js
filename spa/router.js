export class Router {
  currentPage = null;

  #routes = [];
  #root = null;
  #notFoundRoute = null;

  constructor({ routes, rootSelector }) {
    this.#routes = routes;
    this.#root = document.querySelector(rootSelector);
    this.#notFoundRoute = routes.find((route) => route.path === "*") ?? null;
  }

  init() {
    if (!this.#root) {
      throw new Error("Router root element not found");
    }

    // TODO: Events

    // Initial render supports deep links on first load.
    this.render(window.location.pathname + window.location.search);
  }

  destroy() {
    // TODO: Clean up events
    this.#destroyCurrentPage();
  }

  navigate(path, { replace = false } = {}) {
    // History API updates the URL without reload.
    if (replace) {
      // replaceState rewrites the current entry (handy for filters).
      history.replaceState(null, "", path);
    } else {
      // pushState creates a new history entry.
      history.pushState(null, "", path);
    }

    // pushState does not trigger popstate, so we render manually.
    this.render(path);
  }

  async render(path) {
    // Normalize and strip query/hash for matching.
    const { pathname } = this.#parsePath(path);
    const route =
      this.#routes.find((item) => item.path === pathname) ??
      this.#notFoundRoute;

    // No matching route and no fallback: render nothing.
    if (!route) {
      return;
    }

    // Destroy previous component to prevent orphaned listeners.
    this.#destroyCurrentPage();
    // Component contract: constructor accepts { path, router }.
    this.currentPage = new route.component({
      path: pathname,
      router: this,
    });

    // render() may be async (e.g., fetch data before showing UI).
    const element = await this.currentPage.render();
    if (!element) {
      return;
    }

    // Replace the content area (keeps header/footer intact).
    this.#root.innerHTML = "";
    this.#root.append(element);

    // Sync UI with the active path.
    this.#updateNav(pathname);
    this.#updateTitle(route.title);
  }

  #parsePath(path) {
    // URL helps with relative paths and normalizes input.
    const url = new URL(path, window.location.origin);
    return {
      pathname: url.pathname,
      search: url.search,
    };
  }

  #destroyCurrentPage() {
    // Optional destroy() keeps router compatible with simple pages.
    if (this.currentPage?.destroy) {
      this.currentPage.destroy();
    }
    this.currentPage = null;
  }

  #updateNav(pathname) {
    // data-nav-link keeps nav detection explicit and cheap.
    const links = document.querySelectorAll("[data-nav-link]");

    links.forEach((link) => {
      // Compare by pathname to ignore query params.
      const url = new URL(link.getAttribute("href"), window.location.origin);
      const isActive = url.pathname === pathname;
      link.classList.toggle("is-active", isActive);

      // aria-current improves accessibility for screen readers.
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  #updateTitle(title) {
   // TODO: Update title
  }

  #handleBodyClick = (event) => {
    // TODO: handle body click
  };

  #handlePopState = () => {
    // TODO: handle pop state
  };
}
