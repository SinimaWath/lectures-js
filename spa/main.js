import { Router } from "./router.js";
import { HomePage } from "./pages/HomePage.js";
import { ProductsPage } from "./pages/ProductsPage.js";
import { CategoriesPage } from "./pages/CategoriesPage.js";
import { AboutPage } from "./pages/AboutPage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";

const routes = [
  {
    path: "/spa/",
    title: "Home",
    component: HomePage,
  },
  {
    path: "/spa/products",
    title: "Products",
    component: ProductsPage,
  },
  {
    path: "/spa/categories",
    title: "Categories",
    component: CategoriesPage,
  },
  {
    path: "/spa/about",
    title: "About",
    component: AboutPage,
  },
  {
    path: "*",
    title: "Not Found",
    component: NotFoundPage,
  },
];

const router = new Router({
  routes,
  rootSelector: "#content",
});

router.init();

const backButton = document.querySelector('[data-action="back"]');
const forwardButton = document.querySelector('[data-action="forward"]');

if (backButton) {
  backButton.addEventListener("click", () => history.back());
}

if (forwardButton) {
  forwardButton.addEventListener("click", () => history.forward());
}
