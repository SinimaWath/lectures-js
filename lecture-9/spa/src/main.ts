import "./styles.css";

import { AboutPage } from "./pages/about-page";
import { CategoriesPage } from "./pages/categories-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProductsPage } from "./pages/products-page";
import { Router } from "./router";
import type { RouteDefinition } from "./types";

// type Directions = {
//   left: string;
//   right: string;
// };

// const directions = {
//   left: "left",
//   right: "right",
// } as const satisfies Directions;

// directions.left === 'asd';

const routes = [
  {
    path: "/",
    title: "Home",
    component: HomePage,
  },
  {
    path: "/products",
    title: "Products",
    component: ProductsPage,
  },
  {
    path: "/categories",
    title: "Categories",
    component: CategoriesPage,
    // component: () =>
    // import("./pages/products-page").then((m) => m.ProductsPage),
  },
  {
    path: "/about",
    title: "About",
    component: AboutPage,
  },
  {
    path: "*",
    title: "Not Found",
    component: NotFoundPage,
  },
] as const satisfies RouteDefinition<Router>[];

routes[0].title;

const router = new Router({
  routes,
  rootSelector: "#content",
});

router.init();

const backButton = document.querySelector<HTMLButtonElement>(
  '[data-action="back"]',
);
const forwardButton = document.querySelector<HTMLButtonElement>(
  '[data-action="forward"]',
);

backButton?.addEventListener("click", () => {
  history.back();
});

forwardButton?.addEventListener("click", () => {
  history.forward();
});
