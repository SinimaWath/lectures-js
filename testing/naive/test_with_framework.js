import { get } from "../task/index.js";
import { describe, it, expect } from "./framework.js";

describe('Функция get', () => [
    it('Если есть путь и обьект, то выводит свойство', () => {
        const value = get({ info: { name: 'Вася' } }, 'info.name');

        expect(value).toBeEqual('Вася');
    }),
    it('Если нет обьект, то возвращает null', () => { }),
    it('Если нет свойства, то возвращает undefined', () => { }),
    it('Если нет пут, то возвращает обьект', () => { }),
]);
