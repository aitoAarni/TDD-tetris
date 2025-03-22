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
    this.linesRemoved += removedLines;
  }

  updateLevel() {
    const level = Math.floor(this.linesRemoved / 10) + 1;
    this.level = level <= 10 ? level : 10;
  }

  addScore(score: number) {
    this.score += score;
  }
  calculateScore(linesRemoved: number) {
    const scores = [0, 40, 100, 300, 1200];
    return this.level * scores[linesRemoved];
  }

  update(linesRemoved: number) {
    const score = this.calculateScore(linesRemoved);
    this.addScore(score);
    this.addLinesRemoved(linesRemoved)
  }
}
