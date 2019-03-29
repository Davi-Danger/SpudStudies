import {Component, OnInit} from '@angular/core';

import * as QuestionSet from './dummy.questions.json';
import {Question} from './question.interface';
import {UncertaintyHandler} from './uncertaintyHandler.class';

const levenshtein = require('fast-levenshtein');

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  public LocalUncertaintyHandler: UncertaintyHandler;
  public CurrentQuestion: Question;
  public score = 1;

  public answerGuess = '';
  public questionText = '[Error, no question text given!]';

  constructor() {
    // Set current question to the first in the set
    this.CurrentQuestion = QuestionSet.questions[0];
  }

  ngOnInit() {}

  submitAnswer() {  // Submit answer (obviously)

    // Check if answer is correct
    if (this.answerCheck()) {
      // if so, run the "correct" script
      this.answerCorrect();
    } else {
      if (this.score >= 1) {
        /* If the score can go any lower,
        reduce it by one and record the old score */
        this.previousScore = this.score;
        this.score--;
      }
      // Alert user of the most correct answer when they are incorrect
      alert(`The correct answer was "${this.CurrentQuestion.answers[0]}"`);
    }
    // Reset the textbox and Uncertainty Calculator
    this.answerGuess = '';
    this.LocalUncertaintyHandler.timePassed = 0;
  }

  answerCheck() {  // Checks if an answer is correct

    // Log the answers to the question in the console
    console.log(this.CurrentQuestion.answers);
    // Log the submitted answer
    console.log(this.answerGuess);

    // check each answer for correctness
    for (const correctAnswer of this.CurrentQuestion.answers) {
      // if the answer is correct, return true.
      if (this.answerGuess === correctAnswer) {
        return true;
      }
    }
    // if no answers are correct, return false
    return false;
  }

  answerCorrect() {  // Action on correct answer
    // If score is at or above the goal, the session is complete
    if (this.score >= 100) {
      // Alert user of session completion
      alert('You win');
      // Reset score for development purposes
      this.score = 0;
    } else {
      // Otherwise, add to the score and log previous score
      this.previousScore = this.score;
      this.score += 5;
    }
  }
}
