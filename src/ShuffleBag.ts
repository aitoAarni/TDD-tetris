import { TetrominoShape } from "./Tetromino";

export default class ShuffleBag {
  tetrominoes: TetrominoShape[];
  tetrominoCount: number;
  indexes: number[];
  index: number;
  constructor(tetrominoes: TetrominoShape[]) {
    this.tetrominoes = tetrominoes;
    this.tetrominoCount = tetrominoes.length;
    this.indexes = Array(this.tetrominoCount * 4)
      .fill(0)
      .map((_, index) => index % this.tetrominoCount);
    this.index = -1;
  }

  shuffle() {
    for (let i = this.indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.indexes[i], this.indexes[j]] = [this.indexes[j], this.indexes[i]];
    }
  }

  next() {
    if (this.index < 0 || this.index >= 4 * this.tetrominoCount) {
      this.index = 0;
      this.shuffle();
    }
    return this.tetrominoes[this.indexes[this.index++]];
  }
}
