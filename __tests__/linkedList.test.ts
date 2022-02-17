import { DoublyLinkedList } from "../src/utils/linkedList";

describe("DoublyLinkedList", () => {
  test("should instantiate", () => {
    const ll = new DoublyLinkedList<number>();

    expect(ll).not.toBeNull();
  });

  test("should insert forwards", () => {
    const ll = new DoublyLinkedList<number>();

    ll.addTail(1);
    ll.addTail(2);
    ll.addTail(3);

    expect(ll.size).toEqual(3);
    expect(ll.head?.value).toEqual(1);
    expect(ll.tail?.value).toEqual(3);
  });

  test("should insert backwards", () => {
    const ll = new DoublyLinkedList<number>();

    ll.addHead(1);
    ll.addHead(2);
    ll.addHead(3);

    expect(ll.size).toEqual(3);
    expect(ll.head?.value).toEqual(3);
    expect(ll.tail?.value).toEqual(1);
  });

  test("should peek", () => {
    const ll = new DoublyLinkedList<number>();

    ll.addTail(1);
    ll.addTail(2);
    ll.addTail(3);

    expect(ll.peekHead()).toEqual(1);
    expect(ll.peekTail()).toEqual(3);
  });

  test("should pop", () => {
    const ll = new DoublyLinkedList<number>();

    ll.addTail(1);
    ll.addTail(2);
    ll.addTail(3);

    expect(ll.size).toEqual(3);
    expect(ll.head?.value).toEqual(1);

    expect(ll.popHead()).toEqual(1);
    expect(ll.popTail()).toEqual(3);
    expect(ll.peekHead()).toEqual(2);
  });

  test("should remove node", () => {
    const ll = new DoublyLinkedList<number>();

    ll.addTail(1);
    const middle = ll.addTail(2);
    ll.addTail(3);

    expect(ll.size).toEqual(3);
    expect(ll.head?.value).toEqual(1);
    expect(ll.tail?.value).toEqual(3);

    ll.removeNode(middle);

    expect(ll.size).toEqual(2);
    expect(ll.head?.value).toEqual(1);
    expect(ll.tail?.value).toEqual(3);
  });

  test("should clear", () => {
    const ll = new DoublyLinkedList<number>();

    ll.addTail(1);
    ll.addTail(2);
    ll.addTail(3);

    expect(ll.size).toEqual(3);

    ll.clear();
    expect(ll.size).toEqual(0);

    ll.addTail(1);
    expect(ll.size).toEqual(1);
  });
});
