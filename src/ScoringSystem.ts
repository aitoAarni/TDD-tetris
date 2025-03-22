export default class ScoringSystem {
  score: number;
  level: number;
  linesRemoved: number;
  constructor() {
    this.score = 0;
    this.level = 1;
    this.linesRemoved = 0;
  }

  addLinesRemoved(removedLines: number) {
    this.linesRemoved += removedLines
  }

  addScore(score: number) {
    this.score += score;
  }
  calculateScore(linesRemoved: number) {
    const scores = [0, 40, 100, 300, 1200];
    return scores[linesRemoved];
  }

  update(linesRemoved: number) {
    const score = this.calculateScore(linesRemoved);
    this.addScore(score);
  }
}
