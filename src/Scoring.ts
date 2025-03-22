
export default class Scoring {
    totalScore: number
    constructor() {
        this.totalScore = 0
    }

    addScore(score: number) {
        this.totalScore += score
    }
}