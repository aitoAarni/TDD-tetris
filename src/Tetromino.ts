import { RotatingShape } from "./RotatingShape";


class I_shape2 {
    
    static shape = [
        [[".", ".", ".", "."],["I", "I", "I", "I"],[".", ".", ".", "."],[".", ".", ".", "."]]
    ];
    constructor(shapeNumber: number){

    }
    toString() {
      const shapeString = I_shape2.shape[0].map((row) => {
        return row.join("")
        }
    )
    .join("\n") + "\n"
    return shapeString;
    }
  }

class I_shape {
    rotatingShape: RotatingShape
    shape: string[][]
    size: number
    constructor(rotatingShape:  RotatingShape) {
        this.rotatingShape = rotatingShape
        this.shape = rotatingShape.shape
        this.size = rotatingShape.size
    }

    rotateRight() {
        const newShape = this.rotatingShape.rotateRight()
        const lastIndex = newShape.shape.length-1
        const temp = newShape.shape[Math.floor(lastIndex/2)][lastIndex]
        newShape.shape[Math.floor(lastIndex/2)][lastIndex] = newShape.shape[Math.floor(lastIndex/2)][0]
        newShape.shape[Math.floor(lastIndex/2)][0] = temp
        return new I_shape(new RotatingShape(newShape.shape))
    }

    rotateLeft() {
        const newShape = this.rotatingShape.rotateLeft()
        const temp = newShape.shape[newShape.shape.length-1]
        newShape.shape[newShape.shape.length-1] = newShape.shape[0]
        newShape.shape[0] = temp
        return new I_shape(new RotatingShape(newShape.shape))
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

class O_shape {
    shape: string[][]
    shapeNumber: number
    size: number
    static SHAPES = [
        [[".", ".", ".", "."], [".", "O", "O", "."], [".", "O", "O", "."], [".", ".", ".", "."]]
    ]
    constructor(shapeNumber: number){
        this.shapeNumber = shapeNumber
        this.shape = O_shape.SHAPES[this.shapeNumber]
        this.size = 4
    }
    toString(){
        const shapeString = this.shape.map((row) => {
            return row.join("")
        }
      )
        .join("\n") + "\n"
        return shapeString;
    }
    
    rotateRight() {
        return new O_shape(0)
    }
    
    rotateLeft() {
        return new O_shape(0)
    }
}

 
class T_shape {
    shape: string[][];
    shapeNumber: number
    size : number
    static SHAPES = [
        [[".", ".", ".", "."],["T", "T", "T", "."], [".", "T", ".", "."], [".", ".", ".", "."]],
        [[".", "T", ".", "."], ["T", "T", ".", "."], [".", "T", ".", "."], [".", ".", ".", "."]],
        [[".", ".", ".", "."], [".", "T", ".", "."], ["T", "T", "T", "."], [".", ".", ".", "."]],
        [[".", "T", ".", "."], [".", "T", "T", "."], [".", "T", ".", "."], [".", ".", ".", "."]],
    ]
    constructor(shapeNumber: number) {
        this.shapeNumber = this.handleShapeNumber(shapeNumber)
        this.shape = T_shape.SHAPES[this.shapeNumber]
        this.size = 4
    }
    handleShapeNumber(number: number) {
        if (number < 0) return 3
        if (number > 3) return 0
        return number
    }
    rotateRight() {
        return new T_shape(this.shapeNumber + 1)
    }
    rotateLeft() {
        return new T_shape(this.shapeNumber - 1)
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

export class ANY_shape {
    rotatingShape: RotatingShape
    shape: string[][]
    size: number
    constructor(rotatingShape: RotatingShape){
        this.rotatingShape = rotatingShape
        this.shape = rotatingShape.shape
        this.size = rotatingShape.size
    }

    rotateRight() {
        return new T_shape(0)
    }

    rotateLeft() {
        return new T_shape(0)
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

export type TetrominoShape = I_shape | O_shape | T_shape

export class Tetromino {

  static T_SHAPE =  new T_shape(0)

  static I_SHAPE = new I_shape(RotatingShape.fromString(`.....
                                            .....
                                            IIII.
                                            .....
                                            .....`))

    static O_SHAPE = new O_shape(0)

    static I_SHAPE2 = new I_shape2(0)
}
