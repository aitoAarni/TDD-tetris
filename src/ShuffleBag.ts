import { TetrominoShape } from "./Tetromino";

export default class ShuffleBag {
  tetrominoes: TetrominoShape[];
  constructor(tetrominoes: TetrominoShape[]) {
    this.tetrominoes = tetrominoes;
  }
}
