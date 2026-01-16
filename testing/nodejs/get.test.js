import test from "node:test";
import assert from "node:assert/strict";
import { get } from "../task/index.js";

test("get returns nested property value", () => {
  const value = get({ info: { name: "Вася" } }, "info.name");

  assert.equal(value, "Вася");
});

test("get returns undefined for missing path", () => {
  const value = get({ info: { name: "Вася" } }, "info.age");

  assert.equal(value, undefined);
});

test("get returns undefined when object path is missing", () => {
  const value = get({}, "info.name");

  assert.equal(value, undefined);
});
