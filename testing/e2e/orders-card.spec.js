import { test, expect } from "@playwright/test";

test.describe('ColumnChart', () => {
  test("column charts render on the page", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/testing/ui/index.html");

    const charts = page.locator(".column-chart");
    await expect(charts).toHaveCount(3);

    const ordersChart = page.locator("#orders .column-chart");
    await expect(ordersChart).toHaveClass(/column-chart_loading/);
    await expect(ordersChart.locator(".column-chart__title")).toContainText(
      "Total orders"
    );
    await expect(ordersChart.locator(".column-chart__link")).toHaveAttribute(
      "href",
      "#"
    );
    await expect(ordersChart.locator(".column-chart__chart div")).toHaveCount(0);

    const salesChart = page.locator("#sales .column-chart");
    await expect(salesChart.locator(".column-chart__title")).toContainText(
      "Total sales"
    );
    await expect(salesChart.locator(".column-chart__header")).toContainText(
      "$243437"
    );
    await expect(salesChart.locator(".column-chart__chart div")).toHaveCount(6);
    await expect(salesChart.locator(".column-chart__link")).toHaveCount(0);

    const customersChart = page.locator("#customers .column-chart");
    await expect(customersChart.locator(".column-chart__title")).toContainText(
      "Total customers"
    );
    await expect(customersChart.locator(".column-chart__header")).toContainText(
      "321"
    );
    await expect(customersChart.locator(".column-chart__chart div")).toHaveCount(
      6
    );
    await expect(customersChart.locator(".column-chart__link")).toHaveCount(0);
  });

})