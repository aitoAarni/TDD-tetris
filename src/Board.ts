export class Board {
  width: number;
  height: number;
  board: string[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = ["...", "...", "..."];
  }

  toString() {
    const boardToString = this.board.join("\n") + "\n";
    return boardToString;
  }

  drop(block: string) {
    
  }
}
