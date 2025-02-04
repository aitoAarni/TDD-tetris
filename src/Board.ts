export class Board {
  width: number;
  height: number;
  board: string[] | string[][];
  tetrominoFalling: boolean;
  fallingTetrominoRow: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = [[".", ".", "."],[".", ".", "."],[".", ".", "."]];
    this.tetrominoFalling = false;
    this.fallingTetrominoRow = 0;
  }

  toString() {
    this.board = convert(this.board)
    const boardRowsStrings = this.board.map((row: string[]) => {return row.join("")})
    const boardString = boardRowsStrings.join("\n") + "\n"
    return boardString
  }

  drop(tetromino: string) {
    this.board = convert(this.board);
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
    this.board = convert(this.board);
    this.board[this.fallingTetrominoRow][1] = this.board[this.fallingTetrominoRow - 1][1];
    this.board[this.fallingTetrominoRow - 1][1] = ".";
  }
  hasFalling() {
    if (this.tetrominoFalling) {
      return true;
    } else return false;
  }
}

function convert(board: string[] | string[][]) {
  if (typeof board[0] === "string") {
    const newBoard = (board as string[]).map((rowString) => rowString.split(""));
    return newBoard;
  } else {
    return board as string[][];
  }
}
