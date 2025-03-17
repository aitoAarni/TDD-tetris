import { RotatingShape } from "./RotatingShape";

export class Board {
  width: number;
  height: number;
  board: string[][];
  tetrominoFalling: boolean;
  fallingTetrominoRow: number;
  fallingTetromino: RotatingShape | null;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill(null).map(() => new Array(width).fill("."));
    this.tetrominoFalling = false;
    this.fallingTetrominoRow = 0;
    this.fallingTetromino = null;
  }

  toString() {
    const boardRowsStrings = this.board.map((row: string[]) => {
      return row.join("");
    });
    const boardString = boardRowsStrings.join("\n") + "\n";
    return boardString;
  }

  drop(tetromino: RotatingShape) {
    if (this.tetrominoFalling) {
      throw new Error("already falling");
    }
    this.fallingTetromino = tetromino;
    this.tetrominoFalling = true;
    const columnStart = Math.floor((this.width - tetromino.size) / 2);
    tetromino.shape.forEach((row, rowIndex) =>
      row.forEach((block, columnIndex) => {
        if (block !== ".") {
          this.board[rowIndex][columnStart + columnIndex] = block;
          this.fallingTetrominoRow = rowIndex;
        }
      })
    );
  }

  tick() {
    if (
      this.fallingTetrominoRow >= this.height - 1 ||
      this.board[this.fallingTetrominoRow + 1].filter((block, columnIndex) => {
        if (block !== "." && this.board[this.fallingTetrominoRow][columnIndex] !== ".") return true;
        return false;
      }).length
    ) {
      this.tetrominoFalling = false;
      this.fallingTetrominoRow = 0;
      return false;
    }
    this.fallingTetrominoRow++;
    this.moveFallingTetromino();
  }

  removeFallingTetromino() {
    if (this.fallingTetromino === null) {
      return;
    }
    const rowStart = this.fallingTetrominoRow - this.fallingTetromino.size;
    const columnStart = Math.floor((this.width - this.fallingTetromino?.size) / 2);
    this.fallingTetromino.shape.forEach((row, rowIndex) => {
      row.forEach((block, columnIndex) => {
        if (block == ".") return;
        this.board[rowStart + rowIndex][columnStart + columnIndex] = ".";
      });
    });
  }

  moveFallingTetromino() {
    if (!this.fallingTetromino) return;
    const columnStart = Math.floor((this.width - this.fallingTetromino.size) / 2);
    this.fallingTetromino.shape.slice().forEach((row, rowIndex) => {
      row.forEach((block, columnIndex) => {
        if (block !== ".") {
          this.board[this.fallingTetrominoRow - rowIndex - 1][columnStart + columnIndex] = ".";
          this.board[this.fallingTetrominoRow - rowIndex][columnStart + columnIndex] = block;
        }
      });
    });
  }

  hasFalling() {
    if (this.tetrominoFalling) {
      return true;
    } else return false;
  }
}
