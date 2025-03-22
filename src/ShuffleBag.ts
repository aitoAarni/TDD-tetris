import { TetrominoShape } from "./Tetromino";

export default class ShuffleBag {
  tetrominoes: TetrominoShape[];
  tetrominoCount: number
  constructor(tetrominoes: TetrominoShape[]) {
    this.tetrominoes = tetrominoes;
    this.tetrominoCount = tetrominoes.length
  }
}
