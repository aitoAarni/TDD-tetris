export class RotatingShape {
  shape: string;
  shape2: string[][];
  constructor(shape: string, shape2: string[][] = [[""]]) {
    this.shape = shape;
    this.shape2 = shape2;
  }
  static fromString(str: string) {
    const shape = str.replace(/[ \t]/g, "") + "\n";
    return new RotatingShape(shape);
  }
  toString() {
    return this.shape;
  }
}
