import { RotatingShape } from "./RotatingShape";


class I_shape {
    shape:  RotatingShape
    size: number
    constructor(shape:  RotatingShape) {
        this.shape = shape
        this.size = shape.size
    }

    rotateRight() {
        const newShape = this.shape.rotateRight()
        const lastIndex = newShape.shape.length-1
        const temp = newShape.shape[Math.floor(lastIndex/2)][lastIndex]
        newShape.shape[Math.floor(lastIndex/2)][lastIndex] = newShape.shape[Math.floor(lastIndex/2)][0]
        newShape.shape[Math.floor(lastIndex/2)][0] = temp
        return new I_shape(new RotatingShape(newShape.shape))
    }

    rotateLeft() {
        const newShape = this.shape.rotateLeft()
        const temp = newShape.shape[newShape.shape.length-1]
        newShape.shape[newShape.shape.length-1] = newShape.shape[0]
        newShape.shape[0] = temp
        return new I_shape(new RotatingShape(newShape.shape))
    }
    toString(){
        return this.shape.toString()
    }
}

class O_shape {
    shape: RotatingShape
    size: number

    constructor(shape: RotatingShape){
        this.shape = shape
        this.size = shape.size

    }
    rotateRight() {
        return new O_shape(new RotatingShape(this.shape.shape))
    }

    rotateLeft() {
        return new O_shape(new RotatingShape(this.shape.shape))
    }

    toString(){
        return this.shape.toString()
    }
}

class T_shape {
    rotatingShape: RotatingShape
    size: number
    constructor(rotatingShape: RotatingShape){
        this.rotatingShape = rotatingShape
        this.size = rotatingShape.size
    }

    rotateRight() {
        return new T_shape(new RotatingShape(this.rotatingShape.shape))
    }

    rotateLeft() {
        return new T_shape(new RotatingShape(this.rotatingShape.shape))
    }
}

export class Tetromino {
  static T_SHAPE = RotatingShape.fromString(`.T.
                                        TTT
                                        ...`)

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
