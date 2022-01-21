export class ListNode<T> {
  value: T;
  weight: number;
  prev: ListNode<T> | null = null;
  next: ListNode<T> | null = null;

  constructor(
    value: T,
    weight: number,
    prev: ListNode<T> | null = null,
    next: ListNode<T> | null = null
  ) {
    this.value = value;
    this.weight = weight;
    this.prev = prev;
    this.next = next;
  }
}

export class DoublyLinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  size = 0;

  peekHead(): T | undefined {
    return this.head?.value;
  }

  peekTail(): T | undefined {
    return this.tail?.value;
  }

  addHead(value: T, weight = 1): ListNode<T> {
    const node = new ListNode(value, weight);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.size = node.weight;
      return node;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
    this.size += node.weight;

    return node;
  }

  addTail(value: T, weight = 1): ListNode<T> {
    const node = new ListNode(value, weight);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
      this.size = node.weight;
      return node;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.size += node.weight;

    return node;
  }

  popHead(): T | null {
    if (!this.head) {
      return null;
    }

    const tmp = this.head.value;
    this.size -= this.head.weight;

    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    }

    return tmp;
  }

  popTail(): T | null {
    if (!this.tail) {
      return null;
    }

    const tmp = this.tail.value;
    this.size -= this.tail.weight;

    this.tail = this.tail.prev;
    this.tail!.next = null;

    return tmp;
  }

  removeNode(node: ListNode<T>): void {
    if (!this.head) {
      return;
    }

    this.size -= node.weight;

    if (node.prev) {
      node.prev.next = node.next;

      if (node.next) {
        node.next.prev = node.prev;
      }
    } else {
      this.head = this.head.next;

      if (this.tail === node) {
        this.tail = this.head;
      }
    }
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  toString(): string {
    const values = [];

    let tmp = this.head;
    while (tmp != null) {
      values.push(tmp.value);
      tmp = tmp.next;
    }

    return JSON.stringify(values);
  }
}
