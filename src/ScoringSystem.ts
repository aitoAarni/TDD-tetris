export default class ScoringSystem {
  score: number;
  level: number;
  constructor() {
    this.score = 0;
    this.level = 1;
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
