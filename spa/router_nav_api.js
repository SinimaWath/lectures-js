export class RouterNavApi {
  // Public reference to the active page component (easy to inspect in console).
  currentPage = null;

  // Route table: { path, component, title }.
  #routes = [];
  // DOM node where pages are rendered.
  #root = null;
  // Optional wildcard route used as 404 fallback.
  #notFoundRoute = null;
  // Navigation API entry point (only in supporting browsers).
  #navigation = null;

  constructor({ routes, rootSelector }) {
    this.#routes = routes;
    this.#root = document.querySelector(rootSelector);
    this.#notFoundRoute = routes.find((route) => route.path === "*") ?? null;
    this.#navigation = window.navigation ?? null;
  }

  init() {
    if (!this.#root) {
      throw new Error("Router root element not found");
    }

    // Teaching note: Navigation API is still new; check support first.
    if (!this.#navigation) {
      throw new Error("Navigation API is not supported in this browser");
    }

    // Single entry point for ALL navigations:
    // - clicks on links
    // - back/forward
    // - programmatic navigate()
    this.#navigation.addEventListener("navigate", this.#handleNavigate);

    // Initial render supports deep links on first load.
    this.render(window.location.pathname + window.location.search);
  }

  destroy() {
    if (this.#navigation) {
      this.#navigation.removeEventListener("navigate", this.#handleNavigate);
    }
    this.#destroyCurrentPage();
  }

  navigate(path, { replace = false } = {}) {
    if (!this.#navigation) {
      return;
    }

    // Navigation API replaces pushState/replaceState.
    this.#navigation.navigate(path, {
      history: replace ? "replace" : "push",
      // You can pass state/info here for restoring UI on back/forward.
      // state: { someData },
    });
  }

  async render(path) {
    // Normalize and strip query/hash for matching.
    const { pathname } = this.#parsePath(path);
    const route =
      this.#routes.find((item) => item.path === pathname) ??
      this.#notFoundRoute;

    if (!route) {
      return;
    }

    // Destroy previous component to prevent orphaned listeners.
    this.#destroyCurrentPage();
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

    this.#updateNav(pathname);
    this.#updateTitle(route.title);
  }

  #parsePath(path) {
    const url = new URL(path, window.location.origin);
    return {
      pathname: url.pathname,
      search: url.search,
    };
  }

  #destroyCurrentPage() {
    if (this.currentPage?.destroy) {
      this.currentPage.destroy();
    }
    this.currentPage = null;
  }

  #updateNav(pathname) {
    const links = document.querySelectorAll("[data-nav-link]");

    links.forEach((link) => {
      const url = new URL(link.getAttribute("href"), window.location.origin);
      const isActive = url.pathname === pathname;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  #updateTitle(title) {
    if (!title) {
      return;
    }

    document.title = `${title} | Vanilla SPA`;
  }

  #handleNavigate = (event) => {
    // NavigationEvent provides rich metadata:
    // event.navigationType: "push" | "replace" | "traverse" | "reload"
    // event.userInitiated: true if triggered by user action
    // event.hashChange: true if only the hash changes

    // If the browser says we cannot intercept, let it do a full navigation.
    if (!event.canIntercept) {
      return;
    }

    // For hash-only changes you might want to let the browser handle it.
    if (event.hashChange) {
      return;
    }

    // Some navigations are downloads; skip interception in that case.
    if (event.downloadRequest) {
      return;
    }

    const url = new URL(event.destination.url);

    // Only same-origin routes are handled by the SPA.
    if (url.origin !== window.location.origin) {
      return;
    }

    // Intercept converts the navigation into a same-document transition.
    event.intercept({
      handler: async () => {
        // AbortSignal can cancel long-running renders.
        if (event.signal.aborted) {
          return;
        }

        await this.render(url.pathname + url.search);

        // Teaching note: you can control scroll restoration here.
      },
    });
  };
}
