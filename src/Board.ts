import { TetrominoShape } from "./Tetromino";

interface Observer {
  update(rowsCleared: number): void;
}
export class Board {
  width: number;
  height: number;
  board: string[][];
  tetrominoFalling: boolean;
  fallingTetrominoRow: number;
  fallingTetromino: TetrominoShape | null;
  observers: Observer[];
  tetrominoStartColumn: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill(null).map(() => new Array(width).fill("."));
    this.tetrominoFalling = false;
    this.fallingTetrominoRow = 0;
    this.fallingTetromino = null;
    this.tetrominoStartColumn = 0;
    this.observers = [];
  }

  setBoard(string: string) {
    this.tetrominoFalling = false;
    this.fallingTetromino = null;
    const newBoard = string
      .split(/\s/g)
      .filter((item) => item.length > 0)
      .map((row) => row.split(""));
    let wrongSize = false;
    if (newBoard.length !== this.height) wrongSize = true;
    newBoard.forEach((row) => {
      if (row.length !== this.width) wrongSize = true;
    });
    if (wrongSize) throw new Error("String doesn't match board dimensions");
    this.board = newBoard;
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
  }

  notifyObservers(rowsCleared: number) {
    this.observers.forEach((observer) => {
      observer.update(rowsCleared);
    });
  }

  toString() {
    const boardRowsStrings = this.board.map((row: string[]) => {
      return row.join("");
    });
    const boardString = boardRowsStrings.join("\n") + "\n";
    return boardString;
  }

  clearLine(index: number) {
    this.board.splice(index, 1);
    const arr = Array(this.width)
      .fill(null)
      .map(() => ".");
    this.board.splice(0, 0, arr);
  }

  clearLines() {
    const clearLines: number[] = [];
    this.board.forEach((row, rowIndex) => {
      if (1 === row.join("").split(".").length) clearLines.push(rowIndex);
    });
    clearLines.forEach((index) => this.clearLine(index));
    return clearLines.length;
  }

  drop(tetromino: TetrominoShape) {
    if (this.tetrominoFalling) {
      throw new Error("already falling");
    }
    this.fallingTetromino = tetromino;
    this.tetrominoStartColumn = Math.floor((this.width - this.fallingTetromino.size) / 2);
    this.tetrominoFalling = true;
    this.placeFallingTetromino();
  }

  tick() {
    if (!this.fallingTetromino) return;

    const moveDown = this.canMoveDown();
    if (!moveDown || !this.tetrominoFalling) {
      this.tetrominoFalling = false;
      this.fallingTetrominoRow = 0;
      const linesRemoved = this.clearLines();
      if (linesRemoved > 0) this.notifyObservers(linesRemoved);
      return;
    }
    this.moveDown();
  }

  moveRight() {
    const touchingRightBorder = this.touchingRightBorder();

    const blockOnRight = this.touchingBlockOnRight();
    if (touchingRightBorder || blockOnRight) return;
    this.removeFallingTetromino();
    this.tetrominoStartColumn++;
    this.placeFallingTetromino();
  }

  touchingRightBorder() {
    let touchingBorder = false;
    this.iterateTetrominoShape((block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      if (this.tetrominoStartColumn + columnIndex >= this.width - 1) touchingBorder = true;
    });
    return touchingBorder;
  }

  touchingBlockOnRight() {
    let blockOnRight = false;
    if (this.fallingTetromino === null) return;
    this.iterateTetrominoShape((block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      if (
        columnIndex < (this.fallingTetromino as TetrominoShape).size - 1 &&
        this.fallingTetromino?.shape[rowIndex][columnIndex + 1] !== "."
      )
        return;
      if (
        this.tetrominoStartColumn + columnIndex < this.width - 1 &&
        this.board[this.fallingTetrominoRow + rowIndex][this.tetrominoStartColumn + columnIndex + 1] !== "."
      ) {
        blockOnRight = true;
      }
    });
    return blockOnRight;
  }

  moveLeft() {
    const touchingLeftBorer = this.touchingLeftBorer();
    const blockOnLeft = this.touchingBlockOnLeft();
    if (touchingLeftBorer || blockOnLeft) return;
    this.removeFallingTetromino();
    this.tetrominoStartColumn--;
    this.placeFallingTetromino();
  }

  touchingLeftBorer() {
    let touchingBorder = false;
    this.iterateTetrominoShape((block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      if (this.tetrominoStartColumn + columnIndex <= 0) touchingBorder = true;
    });
    return touchingBorder;
  }

  touchingBlockOnLeft() {
    if (!this.fallingTetromino) return;
    let blockOnLeft = false;
    this.iterateTetrominoShape((block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      if (columnIndex > 0 && this.fallingTetromino?.shape[rowIndex][columnIndex - 1] !== ".") return;
      if (
        this.tetrominoStartColumn + columnIndex > 0 &&
        this.board[this.fallingTetrominoRow + rowIndex][this.tetrominoStartColumn + columnIndex - 1] !== "."
      ) {
        blockOnLeft = true;
      }
    });
    return blockOnLeft;
  }

  moveDown() {
    const canMoveDown = this.canMoveDown();
    if (canMoveDown) {
      this.removeFallingTetromino();
      this.fallingTetrominoRow++;
      this.placeFallingTetromino();
    }
  }

  removeFallingTetromino() {
    if (this.fallingTetromino === null) {
      return;
    }
    const columnStart = this.tetrominoStartColumn;
    const removeBlock = (block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      this.board[this.fallingTetrominoRow + rowIndex][columnStart + columnIndex] = ".";
    };
    this.iterateTetrominoShape(removeBlock);
  }

  hasFalling() {
    if (this.tetrominoFalling) {
      return true;
    } else return false;
  }

  iterateTetrominoShape(callback: (block: string, rowIndex: number, columnIndex: number) => void) {
    if (!this.fallingTetromino) return;
    this.fallingTetromino as TetrominoShape;
    this.fallingTetromino.shape.forEach((row, rowIndex) => {
      row.forEach((block, columnIndex) => {
        callback(block, rowIndex, columnIndex);
      });
    });
  }

  canMoveDown() {
    if (!this.fallingTetromino) return false;
    let canMoveDownBool = true;
    const columnStart = this.tetrominoStartColumn;
    const CheckBlock = (block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      if (this.height - 1 <= rowIndex + this.fallingTetrominoRow) {
        canMoveDownBool = false;
      } else if (
        (this.fallingTetromino as TetrominoShape).size - 1 > rowIndex &&
        this.fallingTetromino?.shape[rowIndex + 1][columnIndex] !== "."
      )
        return;
      else if (this.board[this.fallingTetrominoRow + rowIndex + 1][columnStart + columnIndex] !== ".") {
        canMoveDownBool = false;
      }
    };
    this.iterateTetrominoShape(CheckBlock);
    return canMoveDownBool;
  }

  placeFallingTetromino() {
    if (!this.fallingTetromino) return;
    const columnStart = this.tetrominoStartColumn;
    const drawBlock = (block: string, rowIndex: number, columnIndex: number) => {
      if (block !== ".") {
        this.board[this.fallingTetrominoRow + rowIndex][columnStart + columnIndex] = block;
      }
    };
    this.iterateTetrominoShape(drawBlock);
  }
  rotateRight() {
    if (!this.fallingTetromino) return;
    this.removeFallingTetromino();
    const currentShape = this.fallingTetromino;
    this.fallingTetromino = this.fallingTetromino.rotateRight();
    const intertwinedBlocks = this.intertwinedBlocks();
    if (intertwinedBlocks) {
      const successfulWallkick = this.wallKick();
      if (!successfulWallkick) {
        this.fallingTetromino = currentShape;
      }
    }
    this.placeFallingTetromino();
  }
  rotateLeft() {
    if (!this.fallingTetromino) return;
    this.removeFallingTetromino();
    const currentShape = this.fallingTetromino;
    this.fallingTetromino = this.fallingTetromino.rotateLeft();
    const intertwinedBlocks = this.intertwinedBlocks();
    if (intertwinedBlocks) {
      const successfulWallkick = this.wallKick();
      if (!successfulWallkick) {
        this.fallingTetromino = currentShape;
      }
    }
    this.placeFallingTetromino();
  }
  intertwinedBlocks() {
    let intertwinedBlocks = false;
    this.iterateTetrominoShape((block: string, rowIndex: number, columnIndex: number) => {
      if (block === ".") return;
      const boardRowIndex = this.fallingTetrominoRow + rowIndex;
      const boardColumnIndex = this.tetrominoStartColumn + columnIndex;
      if (0 > boardRowIndex || this.height <= boardRowIndex || 0 > boardColumnIndex || this.width <= boardColumnIndex) {
        intertwinedBlocks = true;
      } else if (this.board[boardRowIndex][boardColumnIndex] !== ".") {
        intertwinedBlocks = true;
      }
    });
    return intertwinedBlocks;
  }
  wallKick() {
    if (!this.fallingTetromino) return;
    const origianlColumn = this.tetrominoStartColumn;
    this.tetrominoStartColumn = origianlColumn + 1;
    if (!this.intertwinedBlocks()) return true;
    this.tetrominoStartColumn = origianlColumn - 1;
    if (!this.intertwinedBlocks()) return true;
    this.tetrominoStartColumn = origianlColumn;
  }
}
