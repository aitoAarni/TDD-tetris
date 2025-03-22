import { beforeEach, describe, test, expect, vi } from "vitest";
import ShuffleBag from "../src/ShuffleBag";
import { before } from "lodash";

// Can take tetrominoes as variables
// Has a variable for length of tetominoes
// Creates a list for indexes of tetrominoes
// can randomizes a list of variables
// has a next method that returns next tetrominoe in indexed order
// indexes list is randomized at first next() call and when index out of range

describe("ShuffleBag tests", () => {
  let shuffleBag;
  let Tetromino1 = vi.fn();
  let Tetromino2 = vi.fn();
  let Tetromino3 = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
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
  test("Randomizes the list of indexes", () => {
    vi.spyOn(Math, "random").mockImplementation(() => 0);
    shuffleBag.shuffle();
    expect(shuffleBag.indexes).to.deep.equal([1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0]);
  });
  test(" method returns next Tetromino in random order", () => {
    vi.spyOn(Math, "random").mockImplementation(() => 0);
    expect(shuffleBag.next()).toBe(Tetromino2);
    expect(shuffleBag.next()).toBe(Tetromino3);
    expect(shuffleBag.next()).toBe(Tetromino1);
  });

  test("next method return index to 0 and shuffle again if index too big", () => {
    vi.spyOn(Math, "random").mockImplementation(vi.fn(() => 0));
    shuffleBag.next();
    shuffleBag.index = 12;
    vi.clearAllMocks()
    shuffleBag.next();
    expect(shuffleBag.index).toBe(1);
    expect(Math.random).toHaveBeenCalledTimes(11);
  });
});
