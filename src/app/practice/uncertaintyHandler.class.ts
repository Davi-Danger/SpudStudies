import {HostListener} from '@angular/core';

export class UncertaintyHandler {
  public uncertainty = 100;  // Total detected uncertainty

  private penalty = .01; /* Penalty for uncertain behaviors (said behaviors
                          will be different depending on the question type)*/
  private keypressCount = 0;

  public timePassed = 0;         // Total time passed in milliseconds
  private timePenalty = 0;       // penalty per millisecond
  private timePenaltyTotal = 0;  // total amount of time-related uncertainty

  private Answers;  // Array of correct answers

  constructor(answers) {
    this.Answers = answers;

    setInterval(() => {
      this.timePassed++;
      if (this.timePassed % 100 === 0) {
        // Display penalty in console every hundred milliseconds
        // console.log(`Time Penalty is ${this.timePenalty}, total is ${
        //    this.timePenaltyTotal}`);
      }
      this.timePenaltyAlgorithm();
    }, 1);
  }

  timePenaltyAlgorithm() {
    this.timePenalty = (Math.pow(1.000001, this.timePassed) - 1);
    this.timePenaltyTotal += this.timePenalty;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(
      event: KeyboardEvent) {  // Extra keypress indicates uncertainty
    this.keypressCount++;
    if (this.keypressCount > this.Answers[0].length + 3) {
      this.penalize(1);
    }
  }

  penalize(multiplier = 1.5) {
    console.log(`Uncertainty detected, new penalty is ${this.penalty}`);
    this.penalty += (this.penalty * multiplier);
    this.penalty *= multiplier;
  }
}
