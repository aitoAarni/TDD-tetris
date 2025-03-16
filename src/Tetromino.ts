import { RotatingShape } from "./RotatingShape";


class I_shape {
    shape:  RotatingShape
    
    constructor(shape:  RotatingShape) {
        this.shape = shape}

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
