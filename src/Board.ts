export class Board {
  width: number;
  height: number;
  board: string[][];
  tetrominoFalling: boolean;
  fallingTetrominoRow: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];
    this.tetrominoFalling = false;
    this.fallingTetrominoRow = 0;
  }

  toString() {
    const boardRowsStrings = this.board.map((row: string[]) => {
      return row.join("");
    });
    const boardString = boardRowsStrings.join("\n") + "\n";
    return boardString;
  }

  drop(tetromino: string) {
    if (this.tetrominoFalling) {
      throw new Error("already falling");
    }
    this.tetrominoFalling = true;
    this.board[0][1] = tetromino;
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
