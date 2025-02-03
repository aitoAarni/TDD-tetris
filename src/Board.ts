export class Board {
  width: number;
  height: number;
  board: string[];
  tetrominoFalling: boolean;
  fallingTetrominoRow: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = ["...", "...", "..."];
    this.tetrominoFalling = false;
    this.fallingTetrominoRow = 0;
  }

  toString() {
    const boardToString = this.board.join("\n") + "\n";
    return boardToString;
  }

  drop(tetromino: string) {
    if (this.tetrominoFalling) {
      throw new Error("already falling");
    }
    this.tetrominoFalling = true;
    const newFirstRow = this.board[0].split("");
    newFirstRow[1] = tetromino;
    this.board[0] = newFirstRow.join("");
  }
  tick() {
    if (this.fallingTetrominoRow >= this.height - 1) {
      this.tetrominoFalling = false;
      this.fallingTetrominoRow = 0;
      return false;
    }
    this.fallingTetrominoRow++;
    const oldRow = this.board[this.fallingTetrominoRow - 1].split("");
    const newRow = this.board[this.fallingTetrominoRow].split("");
    newRow[1] = oldRow[1];
    oldRow[1] = ".";
    this.board[this.fallingTetrominoRow - 1] = oldRow.join("");
    this.board[this.fallingTetrominoRow] = newRow.join("");
  }
  moveFallingTetromino() {
    
  }
  hasFalling() {
    if (this.tetrominoFalling) {
      return true;
    } else return false;
  }
}
