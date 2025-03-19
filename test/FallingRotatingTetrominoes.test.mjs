import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Falling and Rotating tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 4);
  });
  test("Falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(`
            ....T.....
            ....TT....
            ....T.....
            ..........`);
  });
  test("Falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(`
            ....T.....
            ...TT.....
            ....T.....
            ..........`);
  });
  describe("Cannot be rotated through other blocks", () => {
    test("Tetromino can't be rotated left through other blocks", () => {
        board.drop(Tetromino.T_SHAPE)

    })
  })
});
