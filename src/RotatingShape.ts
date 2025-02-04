export class RotatingShape {
  shape: string;
  constructor(shape: string) {
    this.shape = shape;
  }
  static fromString(str: string) {
    const shape = str.replace(/[ \t]/g, "") + "\n";
    return new RotatingShape(shape);
  }
  toString() {
    return this.shape;
  }
}
