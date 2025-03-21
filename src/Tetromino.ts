const alternate = [1, 0]

class I_shape {
    shapeNumber: number
    shape: string[][]
    size: number
    static shapes = [
        [[".", ".", ".", "."],["I", "I", "I", "I"],[".", ".", ".", "."],[".", ".", ".", "."]],
        [
        [".", ".", "I", "."],
        [".", ".", "I", "."],
        [".", ".", "I", "."],
        [".", ".", "I", "."]
    ],
    ];
    constructor(shapeNumber: number){
        this.shapeNumber = shapeNumber
        this.shape = I_shape.shapes[this.shapeNumber]
        this.size = 4
    }
    toString() {
      const shapeString = this.shape.map((row) => {
        return row.join("")
        }
    )
    .join("\n") + "\n"
    return shapeString;
    }
    rotateRight() {
        return new I_shape(alternate[this.shapeNumber])
    }
    rotateLeft() {
        return new I_shape(alternate[this.shapeNumber])
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

}

export type TetrominoShape = I_shape | O_shape | T_shape

export class Tetromino {

  static T_SHAPE =  new T_shape(0)

  static I_SHAPE = new I_shape(0)
                                 
    static O_SHAPE = new O_shape(0)

}
