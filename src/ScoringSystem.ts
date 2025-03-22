export default class ScoringSystem {
  totalScore: number;
  constructor() {
    this.totalScore = 0;
  }

  addScore(score: number) {
    this.totalScore += score;
  } 
}