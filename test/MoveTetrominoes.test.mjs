import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Move tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE2)
  });
  test("Falling tetromino can be moved left", () => {
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
             ..TTT.....
             ...T......
             ..........
             ..........
             ..........`
    );
  });

  test("Falling tetromino can be moved right", () => {
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
             ....TTT...
             .....T....
             ..........
             ..........
             ..........`
    );
  });
  test.skip("Falling tetromino can be moved down", () => {
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
    test.skip("It cannot be moved left beyond the board", () => {
      for (let i = 0; i < 10; i++) {
        board.moveLeft();
      }
      expect(board.toString()).to.equalShape(
        `.T........
      TTT.......
      ..........
      ..........
      ..........
      ..........`
      );
    });
    test.skip("It cannot be moved right beyond the board", () => {
      for (let i = 0; i < 10; i++) {
        board.moveRight();
      }
      expect(board.toString()).to.equalShape(
        `........T.
        .......TTT
        ..........
        ..........
        ..........
        ..........`
      );
    });
    test.skip("It cannot be moved right beyond the board", () => {
      for (let i = 0; i < 10; i++) {
        board.moveDown();
      }
      expect(board.toString()).to.equalShape(
        `
             ..........
             ..........
             ..........
             ..........
             ....T.....
             ...TTT....
`
      );
    });
  });
  describe("Tetromino cannot be moved through other blocks", () => {
    test.skip("Tetromino cannot be moved left through other blocks", () => {
      board.moveLeft();
      board.moveLeft();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.moveLeft();
      board.tick();
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ..........
        ..T.T.....
        .TTTTT....
        ..T.......
`
      );
    });
    test.skip("Tetromino cannot be moved right through other blocks", () => {
      board.moveRight();
      board.moveRight();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.moveRight();
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `
            ..........
            ..........
            ....T.....
            ...TTTT...
            ......TT..
            ......T...`
      );
    });
    test.skip("Tetromino cannot be moved down through other blocks", () => {
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.moveDown()
      expect(board.toString()).to.equalShape(
        `
            ..........
            ..........
            ....T.....
            ...TTT....
            ....T.....
            ...TTT....`
      );
    });
  });
});
