import { expect, test } from "@playwright/test";

const expectedBooks = [
  {
    id: 101,
    title: "Событийный цикл изнутри",
    author: "Н. Макро",
    price: "21.15$",
  },
  {
    id: 102,
    title: "Fetch и CORS без боли",
    author: "Е. Нетворкин",
    price: "17.85$",
  },
  {
    id: 103,
    title: "Промисы на практике",
    author: "П. Резолвер",
    price: "26.40$",
  },
  {
    id: 104,
    title: "Async/await для тимлида",
    author: "А. Вейтер",
    price: "24.90$",
  },
  {
    id: 105,
    title: "Dynamic import для ленивых",
    author: "Д. Импортов",
    price: "15.99$",
  },
];

test.describe("Book Store", () => {
  test.use({ baseURL: "http://127.0.0.1:4173" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads the catalog and renders discounted prices", async ({ page }) => {
    await expect(page).toHaveTitle("Books");
    await expect(
      page.getByRole("heading", { level: 1, name: "Book Store" }),
    ).toBeVisible();

    const reloadButton = page.getByRole("button", { name: "Обновить каталог" });
    const exportButton = page.getByRole("button", { name: "Экспорт" });
    const list = page.locator('[data-component="list"]');

    await expect(list.getByRole("listitem")).toHaveCount(0);

    await reloadButton.click();

    await expect(list.getByText("Книги загружаются....")).toBeVisible();
    await expect(list.getByRole("listitem")).toHaveCount(expectedBooks.length);
    await expect(list.getByText("Книги загружаются....")).toHaveCount(0);
    await expect(exportButton).toBeVisible();

    for (const book of expectedBooks) {
      const item = list.getByRole("listitem").filter({
        has: page.getByText(book.title, { exact: true }),
      });

      await expect(item).toContainText(`#${book.id}`);
      await expect(item).toContainText(`Автор: ${book.author}`);
      await expect(item).toContainText(book.price);
    }
  });

  test("check product creation", async ({ page }) => {
    await page.route("**/api/product", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "1",
          name: "Asd",
        }),
      });
    });
  });
});
