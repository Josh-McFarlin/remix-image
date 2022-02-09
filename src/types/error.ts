export class RemixImageError extends Error {
  errorCode: number;

  constructor(message: string, errorCode?: number) {
    super(message);
    Object.setPrototypeOf(this, RemixImageError.prototype);

    this.errorCode = errorCode || 500;
  }

  toString() {
    return this.message;
  }
}

export class UnsupportedImageError extends RemixImageError {
  constructor(message: string) {
    super(message, 415);
    Object.setPrototypeOf(this, UnsupportedImageError.prototype);
  }
}
