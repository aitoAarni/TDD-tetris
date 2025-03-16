import { RotatingShape } from "./RotatingShape";

export class Board {
  width: number;
  height: number;
  board: string[][];
  tetrominoFalling: boolean;
  fallingTetrominoRow: number;
  fallingTetromino: RotatingShape | null
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill(null).map(() => new Array(width).fill("."))
    this.tetrominoFalling = false;
    this.fallingTetrominoRow = 0;
    this.fallingTetromino = null
  }

  toString() {
    const boardRowsStrings = this.board.map((row: string[]) => {
      return row.join("");
    });
    const boardString = boardRowsStrings.join("\n") + "\n";
    return boardString;
  }

  drop(tetromino: RotatingShape  ) {
    if (this.tetrominoFalling) {
      throw new Error("already falling");
    }
    this.tetrominoFalling = true;
    const columnStart = Math.floor((this.width -tetromino.size) / 2) 
    tetromino.shape.forEach((row, rowIndex) => row.forEach((block, columnIndex) => {
      if (block !== "") {
        this.board[rowIndex][columnStart+columnIndex] = block
        this.fallingTetrominoRow = rowIndex
      }
    }))
  }
  tick() {
    if (this.fallingTetrominoRow >= this.height - 1 || this.board[this.fallingTetrominoRow + 1][1] !== ".") {
      this.tetrominoFalling = false;
      this.fallingTetrominoRow = 0;
      return false;
    }
    this.fallingTetrominoRow++;
    this.moveFallingTetromino();
  }
  moveFallingTetromino() {
    this.board[this.fallingTetrominoRow][1] = this.board[this.fallingTetrominoRow - 1][1];
    this.board[this.fallingTetrominoRow - 1][1] = ".";
  }
  hasFalling() {
    if (this.tetrominoFalling) {
      return true;
    } else return false;
  }
}
