import { RotatingShape } from "./RotatingShape";


class I_shape {
    shape:  RotatingShape

    constructor(shape:  RotatingShape) {
        this.shape = shape}

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
