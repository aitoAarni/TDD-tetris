import { beforeEach, describe, test, expect, vi } from "vitest";
import ShuffleBag from "../src/ShuffleBag";
import { before } from "lodash";

// Can take tetrominoes as variables
// Has a variable for length of tetominoes
// Creates a list for indexes of tetrominoes
// can randomizes a list of variables
// has a next method that returns next tetrominoe in random order
// if list runs out a new random order is created

describe("ShuffleBag tests", () => {
  let shuffleBag;
  let Tetromino1 = vi.fn();
  let Tetromino2 = vi.fn();
  let Tetromino3 = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    shuffleBag = new ShuffleBag([Tetromino1, Tetromino2, Tetromino3]);
  });
  test("Shuffle bag takes list of tetrominoes as a variable", () => {
    expect(shuffleBag.tetrominoes).to.deep.equal([Tetromino1, Tetromino2, Tetromino3]);
  });

  test("Length of tetromino list is same as actual length", () => {
    expect(shuffleBag.tetrominoCount).toBe(3);
  });
  test("List of indexes for tetrominoes is correct", () => {
    expect(shuffleBag.indexes).to.have.members([0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]);
  });
});
