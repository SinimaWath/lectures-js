export interface Discount {
  bookId: number;
  percent: number;
}

// Функция‑type guard: проверяет, что значение — это объект типа Book
function isDiscount(value: unknown): value is Discount {
  return (
    typeof value === "object" &&
    value !== null &&
    "bookId" in value &&
    "percent" in value
  );
}

// zod - как пример zod
// Если функция isDiscountArray возвращает true, то переданное значение это Discount[]
export function isDiscountArray(value: unknown): value is Discount[] {
  return Array.isArray(value) && value.every(isDiscount);
}
