import { ordersCardConfig } from "../config/orders-card.config.js";

test("orders card config snapshot", () => {
  expect(ordersCardConfig).toMatchSnapshot();
});
