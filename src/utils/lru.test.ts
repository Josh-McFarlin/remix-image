import { LRU } from "./lru";

describe("LRU", () => {
  test("should instantiate", () => {
    const cache = new LRU<number>(10);

    expect(cache).not.toBeNull();
  });

  test("set should add item", () => {
    const cache = new LRU<number>(10);

    expect(cache.size).toEqual(0);

    cache.set("Hello", 5);

    expect(cache.size).toEqual(1);
  });

  test("set should not add duplicate items", () => {
    const cache = new LRU<number>(10);

    expect(cache.size).toEqual(0);

    cache.set("Hi", 5);
    cache.set("Hello", 6);
    cache.set("Hi", 7);
    cache.set("Hey", 8);
    cache.set("Hello", 9);
    cache.set("Hello", 10);

    expect(cache.size).toEqual(3);
  });

  test("has should fail when empty", () => {
    const cache = new LRU<number>(10);

    expect(cache.size).toEqual(0);
    expect(cache.has("Hello World")).toEqual(false);
  });

  test("has should pass when contains key", () => {
    const cache = new LRU<number>(10);

    cache.set("Hello World", 123);

    expect(cache.size).toEqual(1);
    expect(cache.has("Hello World")).toEqual(true);
  });

  test("get should pass when contains key", () => {
    const cache = new LRU<number>(10);

    cache.set("Hello World", 123);

    expect(cache.size).toEqual(1);
    expect(cache.get("Hello World")).toEqual(123);
  });

  test("get should fail when missing key", () => {
    const cache = new LRU<number>(10);

    cache.set("Not Hello World", 123);

    expect(cache.size).toEqual(1);
    expect(cache.get("Hello World")).toBeNull();
  });

  test("should remove least used items", () => {
    const cache = new LRU<number>(10);

    cache.set("One", 1, 7);
    cache.set("Two", 2, 3);

    expect(cache.size).toEqual(10);
    expect(cache.has("Two")).toEqual(true);

    cache.set("Three", 3, 1);

    expect(cache.size).toEqual(4);
    expect(cache.has("One")).toEqual(false);
    expect(cache.has("Three")).toEqual(true);
  });

  test("get should modify deletion order", () => {
    const cache = new LRU<number>(10);

    cache.set("One", 1, 7);
    cache.set("Two", 2, 3);

    expect(cache.size).toEqual(10);
    expect(cache.has("Two")).toEqual(true);

    cache.get("One");
    cache.set("Three", 3, 1);

    expect(cache.size).toEqual(4);
    expect(cache.has("One")).toEqual(false);
    expect(cache.has("Three")).toEqual(true);
  });

  test("should remove", () => {
    const cache = new LRU<number>(10);

    cache.set("One", 1);
    cache.set("Two", 2);
    cache.set("Three", 3);

    expect(cache.size).toEqual(3);
    expect(cache.has("Two")).toEqual(true);

    cache.remove("Two");

    expect(cache.size).toEqual(2);
    expect(cache.has("Two")).toEqual(false);
  });

  test("should clear", () => {
    const cache = new LRU<number>(10);

    cache.set("One", 1);
    cache.set("Two", 2);
    cache.set("Three", 3);

    expect(cache.size).toEqual(3);

    cache.clear();
    expect(cache.size).toEqual(0);

    cache.set("One", 1);
    expect(cache.size).toEqual(1);
  });
});
