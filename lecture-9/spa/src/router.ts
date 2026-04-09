import type { Page, RouteDefinition } from "./types";

interface RouterOptions {
  routes: RouteDefinition<Router>[];
  rootSelector: string;
}

interface NavigateOptions {
  replace?: boolean;
}

export class Router {
  currentPage: Page | null = null;

  readonly #routes: RouteDefinition<Router>[];
  readonly #root: HTMLElement;
  readonly #notFoundRoute: RouteDefinition<Router> | null;

  constructor({ routes, rootSelector }: RouterOptions) {
    this.#routes = routes;
    this.#root = this.#getRootElement(rootSelector);
    this.#notFoundRoute = routes.find((route) => route.path === "*") ?? null;
  }

  init(): void {
    document.body.addEventListener("click", this.#handleBodyClick);
    window.addEventListener("popstate", this.#handlePopState);
    this.render(window.location.pathname + window.location.search);
  }

  destroy(): void {
    document.body.removeEventListener("click", this.#handleBodyClick);
    window.removeEventListener("popstate", this.#handlePopState);
    this.#destroyCurrentPage();
  }

  navigate(path: string, { replace = false }: NavigateOptions = {}): void {
    if (replace) {
      history.replaceState(null, "", path);
    } else {
      // history.state - чтобы получить текущий стейт переданный в pushState
      history.pushState(null, "", path);
    }
    this.render(path);
  }

  async render(path: string): Promise<void> {
    const { pathname } = this.#parsePath(path);
    const route =
      this.#routes.find((candidate) => candidate.path === pathname) ??
      this.#notFoundRoute;

    if (!route) {
      return;
    }

    // destroy();
    // render();
    this.#destroyCurrentPage();

    // Lazy Loading: Dynamic Import, await import () =>
    // Предположить самые популярные страницы
    // Preload
    this.currentPage = new route.component({
      path: pathname,
      router: this,
    });

    const element = await this.currentPage.render();
    this.#root.replaceChildren(element);
    this.#updateNav(pathname);
    this.#updateTitle(route.title);
  }

  #getRootElement(selector: string): HTMLElement {
    const root = document.querySelector<HTMLElement>(selector);
    if (!root) {
      throw new Error(`Router root element not found: ${selector}`);
    }

    return root;
  }

  #parsePath(path: string): Pick<URL, "pathname" | "search"> {
    const url = new URL(path, window.location.origin);
    return {
      pathname: url.pathname,
      search: url.search,
    };
  }

  #destroyCurrentPage(): void {
    this.currentPage?.destroy?.();
    this.currentPage = null;
  }

  #updateNav(pathname: string): void {
    const links =
      document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]");

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) {
        return;
      }

      const url = new URL(href, window.location.origin);
      const isActive = url.pathname === pathname;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  #updateTitle(title: string): void {
    // TODO: Title
    document.title = title ? `${title} | Vanilla SPA` : `Vanilla SPA`;
  }

  #handleBodyClick = (event: MouseEvent): void => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (!link) {
      return;
    }

    if (
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      link.getAttribute("rel") === "external"
    ) {
      return;
    }

    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    this.navigate(url.pathname + url.search);
  };

  #handlePopState = (): void => {
    this.render(location.pathname + location.search);
  };
}
