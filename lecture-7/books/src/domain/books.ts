export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

// zod
// Функция‑type guard: проверяет, что значение — это объект типа Book
function isBook(value: unknown): value is Book {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "author" in value &&
    "price" in value
  );
}

export function isBookArray(value: unknown): value is Book[] {
  return Array.isArray(value) && value.every(isBook);
}
