import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

const callCallback8Times = (callback) => {
    for (let i = 0; i<10; i++){
        callback()
    }
}

describe("Move tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });
  test("Falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
             ..TTT.....
             ..........
             ..........
             ..........
             ..........`
    );
  });

  test("Falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
             ....TTT...
             ..........
             ..........
             ..........
             ..........`
    );
  });
  test("Falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
             ....T.....
             ...TTT....
             ..........
             ..........
             ..........
             `
    );
  });
  describe("Tetromino can't be moved beyond board", () => {

    test("It cannot be moved left beyond the board", () => {

    })
  })
});