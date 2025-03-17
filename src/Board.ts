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
    this.fallingTetrominoRow = tetromino.size - 1;
    this.tetrominoFalling = true;
    const columnStart = Math.floor((this.width - tetromino.size) / 2);
    tetromino.shape.forEach((row, rowIndex) =>
      row.forEach((block, columnIndex) => {
        if (block !== ".") {
          this.board[rowIndex][columnStart + columnIndex] = block;
        }
      })
    );
  }

  tick() {
    if (!this.fallingTetromino) return;
    const columnStart = Math.floor((this.width - this.fallingTetromino.size) / 2);
    const rowStart = this.fallingTetrominoRow - (this.fallingTetromino.size - 1);
    const CheckBlock = (block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      if (this.height - 1 <= rowIndex + rowStart) {
        this.tetrominoFalling = false;
      } else if (
        (this.fallingTetromino as RotatingShape).size - 1 > rowIndex &&
        this.fallingTetromino?.shape[rowIndex + 1][columnIndex] !== "."
      )
        return;
      else if (this.board[rowStart + rowIndex + 1][columnStart + columnIndex] !== ".") {
        this.tetrominoFalling = false;
      }
    };
    this.iterateTetrominoShape(CheckBlock);
    const moveDown = this.canMoveDown()
    if (!moveDown || !this.tetrominoFalling) {
      this.tetrominoFalling = false
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
    const removeBlock = (block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      this.board[rowStart + rowIndex][columnStart + columnIndex] = ".";
    };
    this.iterateTetrominoShape(removeBlock);
  }

  moveFallingTetromino() {
    if (!this.fallingTetromino) return;
    this.removeFallingTetromino();
    const columnStart = Math.floor((this.width - this.fallingTetromino.size) / 2);
    this.fallingTetromino.shape
      .slice()
      .reverse()
      .forEach((row, rowIndex) => {
        row.forEach((block, columnIndex) => {
          if (block !== ".") {
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

  iterateTetrominoShape(callback: (block: string, rowIndex: number, columnIndex: number) => void) {
    if (!this.fallingTetromino) return;
    this.fallingTetromino as RotatingShape;
    this.fallingTetromino.shape.forEach((row, rowIndex) => {
      row.forEach((block, columnIndex) => {
        callback(block, rowIndex, columnIndex);
      });
    });
  }
  canMoveDown() {
    if (!this.fallingTetromino) return false;
    let canMoveDownBool = true;
    const columnStart = Math.floor((this.width - this.fallingTetromino.size) / 2);
    const rowStart = this.fallingTetrominoRow - (this.fallingTetromino.size - 1);
    const CheckBlock = (block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      if (this.height - 1 <= rowIndex + rowStart) {
        canMoveDownBool = false;
      } else if (
        (this.fallingTetromino as RotatingShape).size - 1 > rowIndex &&
        this.fallingTetromino?.shape[rowIndex + 1][columnIndex] !== "."
      )
        return;
      else if (this.board[rowStart + rowIndex + 1][columnStart + columnIndex] !== ".") {
        canMoveDownBool = false;
      }
    };
    return canMoveDownBool;
  }
}
