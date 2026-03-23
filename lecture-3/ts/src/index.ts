// number, boolean, null, undefined, symbol, bigint
let sum: string = 0;
let n: null = null;

sum = 'vasya';

// --- 

// Literal 
// Union Types - |

// up, down, left, right
let direction: 'up' | 'down' | 'left' | 'right'  = 'up';

direction = 'down';
direction = 'left';
direction = 'right';

// let count: 5 = 5;

function print(value: string | number) {
  // type narrowing
  if (typeof value === 'string') {
    console.log(value.toUpperCase())
  } else {
    console.log(value.toFixed(1));
  }
  console.log(value);
}

// zod
// const data = zod.validate(fetch('/api/books'));


// Делай что хочешь ТС не проверяет
const a: any = 'Vlad';


a.toUpperCase();
a.length;

if (typeof a === 'string') {
  a;
}

Math.max(a);

// unknown

function getData() {
  return 'asasdasdas';
}

let data: unknown = getData();

if (typeof data === 'number') {
  data.toFixed(1);
}

if (typeof data === 'string') {
  data.toUpperCase();
}

// never

function fail(): never {
  throw new Error('asdasd');
}


// --- 

type User = {
  name: string,
};

interface User2 {
  name: string,
}

class User3 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

function greet(user: User) {
  console.log(user.name);
}

const adress = {
  name: 'Lenina',
  number: 30,
};

greet(adress);


// Function

type fn = (a: number) => number;


let sum232: fn = (a: number) => 1;


const users: number[] = [123, 123123];

const points: Array<string | number> = [123, 'asd'];

// Tuple / Кортеж
type PointGPS = [x: number, y: number | undefined];

const moscow: PointGPS = [4.89, 52.32];

// Нельзя
moscow[3];
