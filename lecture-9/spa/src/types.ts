export interface Page {
  render(): HTMLElement | Promise<HTMLElement>;
  destroy?(): void;
}

export interface PageContext<TRouter> {
  path: string;
  router: TRouter;
}

export type PageConstructor<TRouter> = new (
  context: PageContext<TRouter>,
) => Page;

export interface RouteDefinition<TRouter> {
  path: string;
  title: string;
  component: PageConstructor<TRouter>;
  // component:
  // | PageConstructor<TRouter>
  // | (() => Promise<PageConstructor<TRouter>>);
}
