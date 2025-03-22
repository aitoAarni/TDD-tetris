import { TetrominoShape } from "./Tetromino";

export default class ShuffleBag {
  tetrominoes: TetrominoShape[];
  tetrominoCount: number
  indexes: number[]
  constructor(tetrominoes: TetrominoShape[]) {
    this.tetrominoes = tetrominoes;
    this.tetrominoCount = tetrominoes.length
    this.indexes = Array(this.tetrominoCount * 4).fill(0).map((_, index) => (index % this.tetrominoCount))
    
  }
}
