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
  
  rotateRight(){
    const rotatedShape = new Array(this.shape.length).fill(null).map(() => new Array(this.shape.length).fill(""))
    for (let i = 0; i<this.shape.length; i++){
      this.shape[i].forEach((item, index) => rotatedShape[index][this.shape.length-1-i] = item)

    }
    return new RotatingShape(rotatedShape)
  }


}
