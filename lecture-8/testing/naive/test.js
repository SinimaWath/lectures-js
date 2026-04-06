import { get } from "../task/index.js";

function test() {
	const result = get({ info: { name: 'Вася' } }, 'info.name');
	
	console.log(result === 'Вася' ? 'Тест прошел' : 'Тест не прошел')
}

function test2() {
	const result = get({}, 'info.name');
	
	console.log(result === undefined ? 'Тест прошел' : 'Тест не прошел')
}

test();
test2();
