export class RotatingShape {
  shape: string;
  shape2: string[][];
  constructor(shape: string, shape2: string[][] = [[""]]) {
    this.shape = shape;
    this.shape2 = shape2;
  }
  static fromString(str: string) {
    const shape = str.replace(/[ \t]/g, "") + "\n";
    const shape2Str = str.replace(/\s/g, "");
    const shape2: string[][] = []
    for (let i = 0; i<3; i++){
        const newRow = []
        for (let j = 0; j < 3; j++){
            newRow.push(shape2Str[i*3+j])
        }
        shape2.push(newRow)
    }
    return new RotatingShape(shape, shape2);
  }
  toString() {
    const shapeString = this.shape2.map((row) => {
        return row.join("")
    }).join("\n") + "\n"
    return shapeString;
  }
}
