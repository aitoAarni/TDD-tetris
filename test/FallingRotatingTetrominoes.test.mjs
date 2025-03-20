import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Falling and Rotating tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 5);
  });
  test("Falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE2);
    board.rotateRight();
    expect(board.toString()).to.equalShape(`
            ....T.....
            ...TT.....
            ....T.....
            ..........
            ..........`);
  });
  test("Falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE2);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(`
            ....T.....
            ....TT....
            ....T.....
            ..........
            ..........`);
  });
  describe("Cannot be rotated through other blocks", () => {
    test("Tetromino can't be rotated left through other blocks", () => {
      board.setBoard(`
        TTTTTTTTTT
        ..........
        ..........
        ..........
        ..........
        `);

      board.drop(Tetromino.T_SHAPE2);
      board.rotateLeft();
      expect(board.toString()).to.equalShape(`
            TTTTTTTTTT
            ...TTT....
            ....T.....
            ..........
            ..........
            `);
    });
    test("Tetromino can't be rotated right through other blocks", () => {
      board.setBoard(`
        TTTTTTTTTT
        ..........
        ..........
        ..........
        ..........
        `);
      board.drop(Tetromino.T_SHAPE2);
      board.rotateRight();
      expect(board.toString()).to.equalShape(`
        TTTTTTTTTT
        ...TTT....
        ....T.....
        ..........
        ..........
        
              `);
    });
  });
  describe("Cannot be rotated through boarders", () => {
    test("Cannot be rotated left through border", () => {
      board.setBoard(`
        ..........
        ..........
        ..........
        .......T..
        .......T..
        `);
      board.drop(Tetromino.T_SHAPE2);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.rotateRight();
      board.moveRight()
      board.tick();
      board.tick();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(`
            ..........
            ..........
            .........T
             .......TTT
             .......T.T`);
    });
    test("Cannot be rotated right through border", () => {
      board.setBoard(`
        ..........
        ..........
        ..........
        ..T.......
        ..T.......
        `);
      board.drop(Tetromino.T_SHAPE2);
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      board.moveLeft()
      board.tick();
      board.tick();
      board.rotateRight();
      expect(board.toString()).to.equalShape(`
            ..........
            ..........
            T.........
            TTT.......
            T.T.......`);
    });

  });
  describe("Wallkicks", () => {
    test("Can wallkick from right rotation", () => {
      board.drop(Tetromino.T_SHAPE2);
      board.rotateLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateRight();
      expect(board.toString()).to.equalShape(`
        ..........
        TTT.......
        .T........
        ..........
        ..........
        `);
    });
    test.skip("Can wallkick from right rotation", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.rotateRight();
      expect(board.toString()).to.equalShape(`
          ........T.
          .......TTT
          ..........
          ..........
          ..........
          `);
    });
  });
});
