let sum: number = 0;
let n: null = null;
let u: undefined = undefined;

let asd = "asdas";
console.log(sum + 1);

// ------

// Работают только с примитивами.
type Direction = "up" | "left";
type Variant = "outline" | "empty" | "fill";

function movePixel(direction: Direction) {
  if (direction === "up") {
    console.log("up");
  }
}

movePixel("up");

// -------

type Fn = (a: number, b: number) => number;

let sum2: Fn = (a: number, b: number) => {
  if (!a || !b) {
    return 0;
  }
  return a + b;
};

const names: string[] = ["Vasya", "Kolya"];
const n123: Array<string | number> = ["Asd"];

// x, y
type Point = number[];
type Point2 = {
  x: number;
  y: number;
};
type Point3 = [x: number, y: number];

const moscow: Point = [12, 123, 123, 1231];
const moscow2: Point2 = {
  x: 123,
  y: 123,
};
const moscow3: Point3 = [1, 2];

// -----

// any - делай что хочешь, я не проверяю
function get(): any {}

const value = get();

const a = 1 + value;

// unknown
function getData(): unknown {
  return 1;
}

const data = getData();
let uknownData: unknown;

if (typeof data === "number") {
  // В этой ветке TS знает что data это number
  data.toFixed();
} else {
  data;
}

// never
function fail(): never {
  throw new Error("asd");
}

function f(): never {
  while (true) {}
}

// type cast

function React() {}

const REACT_VLAD = React as unknown as number;

const num = REACT_VLAD + 1;

console.log(num);

function sum123(a: number | string, b: number | string) {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }

  if (typeof a === "string" && typeof b === "string") {
    return parseInt(a, 10) + parseInt(b, 10);
  }
}

sum123(1, "asd");

// Union Types
type BankAccount =
  | {
      type: "retail";
      name: string;
      secondName: string;
    }
  | {
      type: "bussines";
      address: string;
    };

function withdrawMoney(from: BankAccount, to: BankAccount) {
  console.log(to.name);

  if (to.type === "bussines") {
    console.log(to.address);
  } else {
    console.log(to.name);
  }

  if (to.type === "retail") {
    console.log(to.name, to.secondName);
  }
}

// Structural Typing

type User = {
  name: string;
};

type Person = {
  name: string;
  age: number;
};

function greet(user: User) {
  console.log(user.name);
}

const person: Person = {
  name: "Alex",
  age: 123,
};

greet(person);

// Обращение к глобальному обьекту
console.log(globalThis);
