import {Component, OnInit} from '@angular/core';

import * as DummyQuestionSet from './dummy.questions.json';
import {Question} from './question.interface';
import {QuestionSet} from './question_set.interface.js';
import {UncertaintyHandler} from './uncertaintyHandler.class';

// const levenshtein = require('fast-levenshtein');

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  public LocalUncertaintyHandler: UncertaintyHandler;
  public QuestionSet: QuestionSet;
  public CurrentQuestion: Question;

  private scoreAverage: number;

  public answerGuess = '';
  public questionText = '[Error, no question text given!]';

  constructor() {  // Set QuestionSet as dummy data
    this.QuestionSet = DummyQuestionSet;

    // Set current question to the first in the set
    this.CurrentQuestion = this.QuestionSet.questions[0];
  }

  ngOnInit() {}

  prepareQuestionData() {
    for (const item of this.QuestionSet.questions) {
      item.score = 0;
    }
  }
  pickQuestion() {}

  submitAnswer() {  // Submit answer (obviously)

    // Check if answer is correct
    if (this.answerCheck()) {
      // if so, run the "correct" script
      this.answerCorrect();
    } else {
      if (this.CurrentQuestion.score >= 1) {
        /* If the score can go any lower,
        reduce it by one and record the old score */
        this.CurrentQuestion.score--;
      }
      // Alert user of the most correct answer when they are incorrect
      alert(`The correct answer was "${this.CurrentQuestion.answers[0]}"`);
    }
    // Update average score
    this.scoreAverage = this.getScoresAverage();

    // Reset the textbox and Uncertainty Calculator
    this.answerGuess = '';
    this.LocalUncertaintyHandler.timePassed = 0;
  }
  getScoresAverage() {  // Get the average of question scores
    let total: number;
    for (const item of this.QuestionSet.questions) {
      total += item.score;
    }
    return total / this.QuestionSet.questions.length;
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
    if (this.CurrentQuestion.score >= 100) {
      // Alert user of session completion
      alert('You win');
      // Reset score for development purposes
      this.CurrentQuestion.score = 0;
    } else {
      // Otherwise, add to the score and log previous score
      this.CurrentQuestion.score += 5;
    }
  }
}
