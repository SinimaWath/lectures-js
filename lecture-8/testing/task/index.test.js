import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { get } from "./index";

describe("task функция get", () => {
  it("should be rendered correctly", () => {
    const value = get({ a: 1 }, "a");

    expect(value).toBeTruthy();
    expect(value).toEqual(123);
    expect(value).toBeNaN();
    expect(value).toBeNaN();
    expect(() => get({})).toThrow();
  });

  it("should be rendered correctly", async () => {
    const value = await get({ a: 1 }, "a");

    expect(value).toBeTruthy();
    expect(value).toEqual(123);
    expect(value).toBeNaN();
    expect(value).toBeNaN();
    expect(() => get({})).toThrow();
  });

  it("should be rendered correctly", async () => {
    const value = await get({ a: 1 }, "a");

    expect(value).toBeTruthy();
    expect(value).toEqual(123);
    expect(value).toBeNaN();
    expect(value).toBeNaN();
    expect(() => get({})).toThrow();
  });

  it.skip("should be rendered correctly", async () => {
    const value = await get({ a: 1 }, "a");

    expect(() => get({})).toThrow();
  });

  it("should be rendered correctly", async () => {
    const value = await get({ a: 1 }, "a");

    expect(() => get({})).toThrow();
  });
});
