import { beforeEach, describe, test, vi, expect } from "vitest";
import { Board } from "../src/Board";

// has subscribers variable that can be added to
// has a function that updates subscribers
// has remove subscribers method
// Fires updates to subscribers when rows have been deleted

describe("Board as an subject class tests", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });
  test("Has subsribers that can be added", () => {
    const observer1 = vi.fn();
    const observer2 = vi.fn();
    board.addObserver(observer1);
    board.addObserver(observer2);
    expect(board.observers).to.deep.equal([observer1, observer2]);
  });

  test("Has a function to notify all the observers", () => {
    const observer1 = { update: vi.fn() };
    const observer2 = { update: vi.fn() };
    board.addObserver(observer1)
    board.addObserver(observer2)
    board.notifyObservers(1)
    expect(observer1.update).toHaveBeenCalledWith(1)
    expect(observer2.update).toHaveBeenCalledWith(1)
  });

  test("Has a remove subscriber method", () => {

    const observer1 = vi.fn();
    const observer2 = vi.fn();
    board.addObserver(observer1);
    board.addObserver(observer2);
    board.removeObserver(observer1)
    expect(board.observers).to.deep.equal([observer2])
  })
});
