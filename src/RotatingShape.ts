export class RotatingShape {
  shape: string[][];
  constructor( shape: string[][] = [[""]]) {
    this.shape = shape;
  }
  static fromString(str: string) {
    const shapeStr = str.replace(/\s/g, "");
    const shape: string[][] = []
    for (let i = 0; i<3; i++){
        const newRow = []
        for (let j = 0; j < 3; j++){
            newRow.push(shapeStr[i*3+j])
        }
        shape.push(newRow)
    }
    return new RotatingShape( shape);
  }
  toString() {
    const shapeString = this.shape.map((row) => {
        return row.join("")
    }).join("\n") + "\n"
    return shapeString;
  }
}
