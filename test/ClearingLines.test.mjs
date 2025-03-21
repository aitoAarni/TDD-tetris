import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Clearing lines test", () => {
    let board
    beforeEach(() => {
        board = new Board(6, 6)
    })
    test("Clear a certain line from board", () => {
        board.setBoard(`
            a.....
            b.....
            c..TT.
            d.....
            e.....
            f.....
            `)
        board.clearLine(2)
        expect(board.toString()).to.equalShape(`
            ......
            a.....
            b.....
            d.....
            e.....
            f.....
            `)
    })
    test("Clears board with a single", () => {
        board.setBoard(`
            ......
            ...T..
            .T....
            ..TT..
            .TTTTT
            TTTTTT
            `)
        board.clearLines()
        expect(board.toString()).to.equalShape(`
            ......
            ......
            ...T..
            .T....
            ..TT..
            .TTTTT
            `)
    })
    
    test("Clears board after block has landed", () => {
        board.setBoard(`
            ......
            .....T
            .....I
            .....O
            T...TT
            TT.TTT
            `)
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        expect(board.toString()).to.equalShape(`
            ......
            ......
            ......
            .....T
            .....I
            .....O
            `)
    })
})