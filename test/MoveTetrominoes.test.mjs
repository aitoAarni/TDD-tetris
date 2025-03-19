import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

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
      board.drop(Tetromino.T_SHAPE);
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
    test("It cannot be moved right beyond the board", () => {
      board.drop(Tetromino.T_SHAPE);
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
    test("It cannot be moved right beyond the board", () => {
      board.drop(Tetromino.T_SHAPE);
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
    test("Tetromino cannot be moved left through other blocks", () => {
      board.drop(Tetromino.T_SHAPE.rotateLeft());
      board.moveLeft();
      board.moveLeft();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
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
    test("Tetromino cannot be moved right through other blocks", () => {
      board.drop(Tetromino.T_SHAPE.rotateRight());
      board.moveRight();
      board.moveRight();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
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
  });
});
