import "./styles.css";

import { AboutPage } from "./pages/about-page";
import { CategoriesPage } from "./pages/categories-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProductsPage } from "./pages/products-page";
import { Router } from "./router";
import type { RouteDefinition } from "./types";

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
] satisfies RouteDefinition<Router>[];

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
