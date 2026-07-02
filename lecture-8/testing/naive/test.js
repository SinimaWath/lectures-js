import { get } from "../task/index.js";

console.log(get({ a: "123" }, "a") !== "123" ? "Тест упал" : "Тест прошел");
console.log(
  get({ a: "123323" }, "a") !== "12323" ? "Тест упал" : "Тест прошел",
);

// function test() {
// 	const result = get({ info: { name: 'Вася' } }, 'info.name');

// 	console.log(result === 'Вася' ? 'Тест прошел' : 'Тест не прошел')
// }

// function test2() {
// 	const result = get({}, 'info.name');

// 	console.log(result === undefined ? 'Тест прошел' : 'Тест не прошел')
// }

// test();
// test2();
