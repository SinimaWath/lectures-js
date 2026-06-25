// import 'csv';
// import 'excel';

export async function csvCopyToBuffer<
  T extends {
    id: number;
    title: string;
    author: string;
    price: number;
  },
>(books: T[]) {
  const header = "id,title,author,price";
  const rows = books.map(
    (book) =>
      `${book.id},"${book.title.replace(/"/g, '""')}",${book.author ?? "N/A"},${
        book.price
      }`,
  );
  const csv = [header, ...rows].join("\n");

  try {
    // Только в HTTPS, и только если вызвали в контексте пол события
    await window.navigator.clipboard.writeText(csv);
    console.log("✅ Успешно скопировано в буфер!");
  } catch (e) {
    console.error("Ошибка копирования:", e);
  }
}
