export class RemixImageError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, RemixImageError.prototype);
  }

  toString() {
    return this.message;
  }
}
