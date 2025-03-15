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
    const rotatedShape = new Array(this.shape.length).fill(null).map(() => new Array(this.shape.length).fill(""))
    for (let i = 0; i<this.shape.length; i++){
      this.shape[i].forEach((item, index) => rotatedShape[index][this.shape.length-1-i] = item)

    }
    return new RotatingShape(rotatedShape)
  }

  rotateLeft(){
    const rotatedShape = new Array(this.shape.length).fill(null).map(() => new Array(this.shape.length).fill(""))
    for (let i = 0; i<this.shape.length; i++) {
      
      this.shape[i].forEach((item, index) => rotatedShape[this.shape.length-1 - index][i] = item);
    }
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
