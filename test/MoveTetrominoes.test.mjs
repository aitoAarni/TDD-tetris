import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Move tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
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
  test("Falling tetromino can be moved down", () => {
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
             ..........
             ...TTT....
             ....T.....
             ..........
             ..........
             `
    );
  });
  describe("Tetromino can't be moved beyond board", () => {
    test("It cannot be moved left beyond the board", () => {
      for (let i = 0; i < 10; i++) {
        board.moveLeft();
      }
      expect(board.toString()).to.equalShape(
        `..........
      TTT.......
      .T........
      ..........
      ..........
      ..........`
      );
    });
    test("It cannot be moved right beyond the board", () => {
      for (let i = 0; i < 10; i++) {
        board.moveRight();
      }
      expect(board.toString()).to.equalShape(
        `..........
        .......TTT
        ........T.
        ..........
        ..........
        ..........`
      );
    });
    test("It cannot be moved down beyond the board", () => {
      for (let i = 0; i < 10; i++) {
        board.moveDown();
      }
      expect(board.toString()).to.equalShape(
        `
             ..........
             ..........
             ..........
             ..........
             ...TTT....
             ....T.....
`
      );
    });
  });
  describe("Tetromino cannot be moved through other blocks", () => {
    test("Tetromino cannot be moved left through other blocks", () => {
      board.setBoard(`..T.......
        ..T.......
        ..T.......
        ..T.......
        ..T.......
        ..T.......`);
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `
        ..T.......
        ..TTTT....
        ..T.T.....
        ..T.......
        ..T.......
        ..T.......
`
      );
    });
    test("Tetromino cannot be moved right through other blocks", () => {
      board.setBoard(`
            ........T.
            ........T.
            ........T.
            ........T.
            ........T.
            ........T.`);
      board.drop(Tetromino.T_SHAPE)
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `
            ........T.
            .....TTTT.
            ......T.T.
            ........T.
            ........T.
            ........T.`
      );
    });
    test("Tetromino cannot be moved down through other blocks", () => {
      board.setBoard(`..........
            ..........
            ..........
            ..........
            ....T.....
            ...TTT....`)
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.moveDown();
      board.moveDown();
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `
            ..........
            ..........
            ...TTT....
            ....T.....
            ....T.....
            ...TTT....`
      );
    });
  });
});
