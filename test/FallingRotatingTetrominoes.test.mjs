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
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(`
            ....T.....
            ....TT....
            ....T.....
            ..........
            ..........`);
  });
  test("Falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(`
            ....T.....
            ...TT.....
            ....T.....
            ..........
            ..........`);
  });
  describe("Cannot be rotated through other blocks", () => {
    test("Tetromino can't be rotated left through other blocks", () => {
      board.drop(Tetromino.O_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.tick();
      board.tick();
      board.tick();
      board.tick();

      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.tick();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(`
            ..........
            ...T......
            ..TTT.....
            ..OOOO....
            ..OOOO....
            `);
    });
    test("Tetromino can't be rotated right through other blocks", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();
      expect(board.toString()).to.equalShape(`
              ....T.....
              ...TTT....
              ....T.....
              ...TT.....
              ....T.....
              `);
    });
  });
  describe("Cannot be rotated through boarders", () => {
    test("Cannot be rotated left through border", () => {
      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.tick();
      board.tick();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(`
            ..........
            ..........
            T.........
             TTOO......
             T.OO......`);
    });
    test("Cannot be rotated right through border", () => {
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
    test("Cannot be rotated right or left through bottom border", () => {
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
    test("Can wallkick from left rotation", () => {
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
    test("Can wallkick from right rotation", () => {
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
      })
  });
});
