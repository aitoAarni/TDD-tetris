import { beforeEach, describe, test, vi } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";

// has subscribers variable that can be added to
// has a function that updates subscribers
// has remove subscribers method
// Fires updates to subscribers when rows have been deleted

describe("Board as an subject class tests", () => {
    let board
    beforeEach(() => {
        board = new Board(10, 6)
    })
    test("Has subsribers that can be added", () => {
        const observer1 = vi.fn()
        const observer2 = vi.fn()
        board.addObserver(observer1)
        board.addObserver(observer2)
        expect(board.observers).to.deep.equal([observer1, observer2])
    })

    


})