type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Vlad",
};

const app = document.querySelector<HTMLPreElement>("#app");

if (app) {
  app.textContent = `Hello, ${user.name}!`;
}
