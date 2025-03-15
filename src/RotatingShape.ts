export class RotatingShape {
  shape: string[][];
  constructor(shape: string[][] = [[""]]) {
    this.shape = shape;
  }
  static fromString(str: string) {
    const shape = str.split(/\s/g).filter(item => item.length>0).map(row => row.split(""));
    return new RotatingShape(shape);
  }
  
  rotateRight(){
    const rotatedShape = [["", "",""], ["", "",""], ["", "",""]]
    this.shape[0].forEach((item, index) => rotatedShape[index][2] = item)
    this.shape[1].forEach((item, index) => rotatedShape[index][1] = item)
    this.shape[2].forEach((item, index) => rotatedShape[index][0] = item)
    return new RotatingShape(rotatedShape)
  }

  rotateLeft(){
  const rotatedShape = [["", "", ""], ["", "", ""], ["", "", ""]]
  this.shape[0].forEach((item, index) => (rotatedShape[2 - index][0] = item));
  this.shape[1].forEach((item, index) => (rotatedShape[2 - index][1] = item));
  this.shape[2].forEach((item, index) => (rotatedShape[2 - index][2] = item));
  return new RotatingShape(rotatedShape)
}

toString() {
    const shapeString = this.shape.map((row) => {
        return row.join("")
    }
  )
    .join("\n") + "\n"
    return shapeString;
  }
}
