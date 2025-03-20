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
    test.skip("Cannot be rotated right through border", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.rotateRight();
      expect(board.toString()).to.equalShape(`
               .........T
               ........TT
               .........T
               ..........
               ..........`);
    });
    test.skip("Cannot be rotated right or left through bottom border", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.moveDown();
      board.moveDown();
      board.moveDown();
      board.rotateRight();
      expect(board.toString()).to.equalShape(`
                 ..........
                 ..........
                 ..........
                 ....T.....
                 ...TTT....`);
      board.rotateLeft();
      expect(board.toString()).to.equalShape(`
        ..........
        ..........
        ..........
        ....T.....
        ...TTT....`);
    });
  });
  describe("Wallkicks", () => {
    test.skip("Can wallkick from left rotation", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(`
        .T........
        TTT.......
        ..........
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
