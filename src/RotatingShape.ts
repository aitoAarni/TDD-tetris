export class RotatingShape {
  shape: string[][];
  size: number
  constructor(shape: string[][] = [[""]]) {
    this.shape = shape;
    this.size = shape.length
  }
  static fromString(str: string) {
    const shape = str.split(/\s/g).filter(item => item.length>0).map(row => row.split(""));
    return new RotatingShape(shape);
  }


}
