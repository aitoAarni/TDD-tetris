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
    const newFirstRow = this.board[0].split("")
    newFirstRow[1] = block
    this.board[0] = newFirstRow.join("")
  }
  tick(){
    this.board.splice(0, 0, "...")
    this.board.pop()
  }
}
