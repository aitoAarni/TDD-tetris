export class Board {
  width: number;
  height: number;
  board: string[];
  tetrominoFalling: boolean;
  tickCounter: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = ["...", "...", "..."];
    this.tetrominoFalling = false;
    this.tickCounter = 0;
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
    if (this.tickCounter >= this.height - 1) {
      this.tetrominoFalling = false;
      return false;
    }
    this.tickCounter++;
    this.board.splice(0, 0, "...");
    this.board.pop();
  }
  hasFalling() {
    if (this.tetrominoFalling) {
      return true;
    } else return false;
  }
}
