// В интерфейсе используется только formatBundlePrice.
// Остальные экспорты специально оставлены как пример кода,
// который tree shaking должен убрать из production bundle.

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export function formatBundlePrice(price: number): string {
  return currencyFormatter.format(price);
}

export const TREE_SHAKING_SENTINEL =
  "TREE_SHAKING_SENTINEL__THIS_TEXT_SHOULD_NOT_APPEAR_IN_DIST";

export function buildDebugOnlyReport(): string {
  return `${TREE_SHAKING_SENTINEL}::${"debug".repeat(32)}`;
}

export function collectDeprecatedPricingVariants(): number[] {
  return [1990, 2990, 3990];
}
