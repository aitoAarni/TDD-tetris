import { beforeEach, describe, test, vi, expect } from "vitest";
import Scoring from "../src/Scoring";

// Has an initial score of 0
// score can be increased
// update function increases score
// score is increased when rows/lines are removed

describe("Scoring system test", () => {
  let scoring;
  beforeEach(() => {
    scoring = new Scoring();
  });
  test("Scoring has a total score", () => {
    expect(scoring.totalScore).toBe(0);
  });

  test("Score can be increased with method", () => {
    scoring.addScore(100)
    scoring.addScore(200)
    expect(scoring.totalScore).toBe(300)
  })
});
