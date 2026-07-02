import { expect, test } from "@playwright/test";

const salesBars = [
  { value: "18", tooltip: "38%" },
  { value: "25", tooltip: "50%" },
  { value: "12", tooltip: "25%" },
  { value: "50", tooltip: "100%" },
  { value: "21", tooltip: "44%" },
  { value: "9", tooltip: "19%" },
];

const customersBars = [
  { value: "50", tooltip: "100%" },
  { value: "45", tooltip: "90%" },
  { value: "40", tooltip: "80%" },
  { value: "17", tooltip: "35%" },
  { value: "45", tooltip: "90%" },
  { value: "12", tooltip: "25%" },
];

test.describe("ColumnChart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
  });

  test("renders all charts", async ({ page }) => {
    await expect(page).toHaveTitle("ColumnChart");
    await expect(page.locator(".column-chart")).toHaveCount(3);
  });

  test("renders orders chart in loading state", async ({ page }) => {
    const ordersChart = getChart(page, "orders");

    await expect(ordersChart.root).toHaveClass(/column-chart_loading/);
    await expect(ordersChart.title).toContainText("Total orders");
    await expect(ordersChart.header).toContainText("344");
    await expect(ordersChart.link).toHaveText("View all");
    await expect(ordersChart.link).toHaveAttribute("href", "#");
    await expect(ordersChart.bars).toHaveCount(0);
  });

  test("renders sales chart with formatted value and bars", async ({
    page,
  }) => {
    const salesChart = getChart(page, "sales");

    await expect(salesChart.root).not.toHaveClass(/column-chart_loading/);
    await expect(salesChart.title).toContainText("Total sales");
    await expect(salesChart.header).toContainText("$243437");
    await expect(salesChart.link).toHaveCount(0);
    await expect(salesChart.bars).toHaveCount(6);
    await expectBars(salesChart.bars, salesBars);
  });

  test("renders customers chart with value and bars", async ({ page }) => {
    const customersChart = getChart(page, "customers");

    await expect(customersChart.root).not.toHaveClass(/column-chart_loading/);
    await expect(customersChart.title).toContainText("Total customers");
    await expect(customersChart.header).toContainText("321");
    await expect(customersChart.link).toHaveCount(0);
    await expect(customersChart.bars).toHaveCount(6);
    await expectBars(customersChart.bars, customersBars);
  });
});

function getChart(page, chartId) {
  const container = page.locator(`#${chartId}`);

  return {
    root: container.locator(".column-chart"),
    title: container.locator(".column-chart__title"),
    header: container.locator(".column-chart__header"),
    link: container.locator(".column-chart__link"),
    bars: container.locator(".column-chart__chart > div"),
  };
}

async function expectBars(bars, expectedBars) {
  for (const [index, expectedBar] of expectedBars.entries()) {
    const bar = bars.nth(index);

    await expect(bar).toHaveAttribute("style", `--value: ${expectedBar.value}`);
    await expect(bar).toHaveAttribute("data-tooltip", expectedBar.tooltip);
  }
}
