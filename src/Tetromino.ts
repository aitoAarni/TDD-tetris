import { RotatingShape } from "./RotatingShape";


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
    rotatingShape: RotatingShape
    shape: string[][]
    size: number

    constructor(rotatingShape: RotatingShape){
        this.rotatingShape = rotatingShape
        this.shape = rotatingShape.shape
        this.size = rotatingShape.size

    }
    rotateRight() {
        return new O_shape(new RotatingShape(this.rotatingShape.shape))
    }

    rotateLeft() {
        return new O_shape(new RotatingShape(this.rotatingShape.shape))
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

class T_shape {
    rotatingShape: RotatingShape
    shape: string[][]
    shapes: string[][][]
    size: number
    constructor(rotatingShape: RotatingShape){
        this.rotatingShape = rotatingShape
        this.shape = rotatingShape.shape
        this.shapes = [
            [["."],["."],["."],["."],
            ["T"],["T"],["T"],["."],
            ["."],["T"],["."],["."],
            ["."],["."],["."],["."]],

            [["."],["."],["."],["."],
            ["."],["."],["."],["."],
            ["."],["."],["."],["."],
            ["."],["."],["."],["."]],
        ]
        this.size = rotatingShape.size
    }

    rotateRight() {
        return new T_shape(this.rotatingShape.rotateRight())
    }

    rotateLeft() {
        return new T_shape(this.rotatingShape.rotateLeft())
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
        return new T_shape(this.rotatingShape.rotateRight())
    }

    rotateLeft() {
        return new T_shape(this.rotatingShape.rotateLeft())
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
  static T_SHAPE = new T_shape(RotatingShape.fromString(`.T.
                                        TTT
                                        ...`))

  static I_SHAPE = new I_shape(RotatingShape.fromString(`.....
                                            .....
                                            IIII.
                                            .....
                                            .....`))

    static O_SHAPE = new O_shape(RotatingShape.fromString(`.OO
        .OO
        ...`)
    )
}
