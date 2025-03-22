
export default class Scoring {
    totalScore: number
    constructor() {
        this.totalScore = 0
    }

addScore(score: number) {
    this.totalScore += score;
    }
    calculateScore(linesRemoved: number) {
    const scores = [0, 40, 100, 300, 1200];
    return scores[linesRemoved];
    }
}
    