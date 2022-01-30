export class RemixImageError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, RemixImageError.prototype);
  }

  toString() {
    return this.message;
  }
}

export class UnsupportedImageError extends RemixImageError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnsupportedImageError.prototype);
  }
}
