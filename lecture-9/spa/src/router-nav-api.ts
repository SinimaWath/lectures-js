import type { Page, RouteDefinition } from "./types";

interface RouterNavApiOptions {
  routes: RouteDefinition<RouterNavApi>[];
  rootSelector: string;
}

interface NavigateOptions {
  replace?: boolean;
}

export class RouterNavApi {
  currentPage: Page | null = null;

  readonly #routes: RouteDefinition<RouterNavApi>[];
  readonly #root: HTMLElement;
  readonly #notFoundRoute: RouteDefinition<RouterNavApi> | null;
  readonly #navigation: Navigation;

  constructor({ routes, rootSelector }: RouterNavApiOptions) {
    const navigation = window.navigation;
    if (!navigation) {
      throw new Error("Navigation API is not supported in this browser");
    }

    this.#routes = routes;
    this.#root = this.#getRootElement(rootSelector);
    this.#notFoundRoute = routes.find((route) => route.path === "*") ?? null;
    this.#navigation = navigation;
  }

  init(): void {
    this.#navigation.addEventListener("navigate", this.#handleNavigate);
    void this.render(window.location.pathname + window.location.search);
  }

  destroy(): void {
    this.#navigation.removeEventListener("navigate", this.#handleNavigate);
    this.#destroyCurrentPage();
  }

  navigate(path: string, { replace = false }: NavigateOptions = {}): void {
    this.#navigation.navigate(path, {
      history: replace ? "replace" : "push",
    });
  }

  async render(path: string): Promise<void> {
    const { pathname } = this.#parsePath(path);
    const route =
      this.#routes.find((candidate) => candidate.path === pathname) ??
      this.#notFoundRoute;

    if (!route) {
      return;
    }

    this.#destroyCurrentPage();

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
    document.title = title ? `${title} | Vanilla SPA` : "Vanilla SPA";
  }

  #handleNavigate = (event: NavigationNavigateEvent): void => {
    if (!event.canIntercept || event.hashChange || event.downloadRequest) {
      return;
    }

    const url = new URL(event.destination.url);
    if (url.origin !== window.location.origin) {
      return;
    }

    event.intercept({
      handler: async () => {
        if (event.signal.aborted) {
          return;
        }

        await this.render(url.pathname + url.search);
      },
    });
  };
}
