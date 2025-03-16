import { RotatingShape } from "./RotatingShape";


class I_shape {
    shape:  RotatingShape

    constructor(shape:  RotatingShape) {
        this.shape = shape}

    rotateRight() {
        return this.shape.rotateRight()
    }

    rotateLeft() {
        const newShape = this.shape.rotateLeft()
        const temp = newShape.shape[newShape.shape.length-1]
        newShape.shape[newShape.shape.length-1] = newShape.shape[0]
        newShape.shape[0] = temp
        return newShape
    }
    toString(){
        return this.shape.toString()
    }
}

export class Tetromino {
  static T_SHAPE = RotatingShape.fromString(`.T.
                                        TTT
                                        ...`);
  static I_SHAPE = new I_shape(RotatingShape.fromString(`.....
                                            .....
                                            IIII.
                                            .....
                                            .....`))
}
