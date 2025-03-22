import { beforeEach, describe, test, expect } from "vitest";
import ScoringSystem from "../src/ScoringSystem";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

// Has an initial score of 0
// starts from level 1
// score can be increased
// levels increase when lines removed
// calculates score based on Lines removed x level
// update function increases score
// score is increased when rows/lines are removed

describe("Scoring system test", () => {
  let scoring;
  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("Scoring has a total score", () => {
    expect(scoring.score).toBe(0);
  });

  test("Initial level is 1", () => {
    expect(scoring.level).toBe(1);
  });
  test("Lines removed is 0 at start", () => {
    expect(scoring.linesRemoved).toBe(0);
  });
  test("Score can be increased with method", () => {
    scoring.addScore(100);
    scoring.addScore(200);
    expect(scoring.score).toBe(300);
  });

  test("Lines can be added", () => {
    scoring.addLinesRemoved(4);
    scoring.addLinesRemoved(2);
    expect(scoring.linesRemoved).toBe(6);
  });

  test("Score gets calculated by lines removed", () => {
    expect(scoring.calculateScore(1)).toBe(40);
    expect(scoring.calculateScore(2)).toBe(100);
    expect(scoring.calculateScore(3)).toBe(300);
    expect(scoring.calculateScore(4)).toBe(1200);
  });

  test("Score update increases score", () => {
    scoring.update(3);
    expect(scoring.score).toBe(300);
  });
  describe("Updates score", () => {
    test("Updates score when Scoring observer of board", () => {
      const board = new Board(10, 6);
      board.addObserver(scoring);
      board.setBoard(`
            ..........
            ..........
            TTT...TTTT
            TTTT.TTTTT
            TTTTTTT.TT
            TTTTTTT.TT
            `);
      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.tick();
      expect(scoring.score).toBe(100);
    });
  });
});
