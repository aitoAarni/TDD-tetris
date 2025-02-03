export class Board {
  width: number;
  height: number;
  board: string[];
  tetrominoFalling: boolean;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = ["...", "...", "..."];
    this.tetrominoFalling = false;
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
    this.board.splice(0, 0, "...");
    this.board.pop();
  }
  hasFalling() {
    if (this.tetrominoFalling) {
      return true;
    }
  }
}
