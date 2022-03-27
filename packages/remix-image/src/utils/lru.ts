import { DoublyLinkedList, ListNode } from "./linkedList";

export class LRU<T> {
  linkedList = new DoublyLinkedList<{ key: string; value: T }>();
  keyMap = new Map<string, ListNode<{ key: string; value: T }>>();
  maxSize: number;

  constructor(maxSize: number) {
    this.linkedList = new DoublyLinkedList<{ key: string; value: T }>();
    this.keyMap = new Map<string, ListNode<{ key: string; value: T }>>();
    this.maxSize = maxSize;
  }

  get size(): number {
    return this.linkedList.size;
  }

  has(key: string): boolean {
    if (this.keyMap.has(key)) {
      if (!this.keyMap.get(key)?.value) {
        this.keyMap.delete(key);
        return false;
      }

      return true;
    }

    return false;
  }

  get(key: string): T | null {
    if (!this.has(key)) {
      return null;
    }

    const node = this.keyMap.get(key)!;
    const { value, weight } = node;

    this.linkedList.removeNode(node);
    const newNode = this.linkedList.addHead(value, weight);
    this.keyMap.set(key, newNode);

    return value.value;
  }

  set(key: string, value: T, size = 1): void {
    if (this.has(key)) {
      this.remove(key);
    }

    while (this.maxSize - this.linkedList.size < size) {
      const node = this.linkedList.popTail();
      if (node) {
        this.keyMap.delete(node.key);
      }
    }

    const newNode = this.linkedList.addHead({ key, value }, size);
    this.keyMap.set(key, newNode);
  }

  remove(key: string): boolean {
    if (!this.has(key)) {
      return false;
    }

    const node = this.keyMap.get(key)!;
    this.linkedList.removeNode(node);
    this.keyMap.delete(key);

    return true;
  }

  clear(): void {
    this.linkedList.clear();
    this.keyMap.clear();
  }
}
