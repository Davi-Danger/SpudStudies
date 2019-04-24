import {Component, Input, OnInit} from '@angular/core';
import sort from 'fast-sort';

import DummyQuestionSet from '../../assets/dummy.questionset.json';

import {Question} from '../common/question.interface';
import {QuestionSet} from '../common/question_set.class';

import {UncertaintyHandler} from './uncertaintyHandler.class';

// const levenshtein = require('fast-levenshtein');

/* TODO:
1. Add case sensitivity option to questions (should be on by default)
2. Replace scores with uncertainty handler's data
3. Add JSON upload
4. Add casual spelling mode to questions (allows a letter or two to be
incorrect)
*/

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  public LocalUncertaintyHandler:
      UncertaintyHandler;  // Object which tracks uncertainty

  private QuestionSet: QuestionSet;   // Current set of questions
  private CurrentQuestion: Question;  // Current question being displayed

  private scoreAverage = 0;  // Average score of all questions

  public answerGuess = '';
  private userIsBeingCorrected = false;
  private correctionText = '';

  constructor() {  // Set QuestionSet as dummy data
    this.QuestionSet = DummyQuestionSet;

    // Set current question as a placeholder
    this.CurrentQuestion = {text: '', answers: null};

    this.LocalUncertaintyHandler =
        new UncertaintyHandler(this.CurrentQuestion.answers);
    this.prepareQuestionData();
  }

  ngOnInit() {
    this.CurrentQuestion = this.QuestionSet.questions[0];
  }

  prepareQuestionData() {
    for (const item of this.QuestionSet.questions) {
      item.score = 0;
    }
  }
  sortQuestions() {
    sort(this.QuestionSet.questions).by([
      {asc: 'score'}, {desc: 'timesCalled'}, {asc: 'text'}
    ]);
    console.log(this.QuestionSet.questions);
  }
  pickQuestion() {  // Selects the next question to display
    this.sortQuestions();
    this.CurrentQuestion = this.QuestionSet.questions[0];
  }

  getScoresAverage() {  // Get the average of question scores
    let total = 0;
    for (const item of this.QuestionSet.questions) {
      total += item.score;
    }
    console.log(total / this.QuestionSet.questions.length);
    return total / this.QuestionSet.questions.length;
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
      // Clear the placeholder text
      this.correctionText = '';
    }
  }
  answerCheck() {  // Checks if an answer is correct
    // Log the answers to the question in the console
    console.log(this.CurrentQuestion.answers);
    // Log the submitted answer
    console.log(this.answerGuess);

    // check each answer for correctness
    for (const correctAnswer of this.CurrentQuestion.answers) {
      // if the answer is correct, return true.
      if (this.answerGuess === correctAnswer.value) {
        return true;
      }
    }
    // if no answers are correct, return false
    return false;
  }
  submitAnswer() {  // Submit answer (obviously)

    // Check if answer is correct
    if (this.answerCheck()) {
      // if so, run the "correct" script
      this.answerCorrect();
    } else {  // otherwise...
      if (this.CurrentQuestion.score >= 1) {
        /* If the score can go any lower,
        reduce it by one and record the old score */
        this.CurrentQuestion.score--;
      }
      // Alert user of the most correct answer when they are incorrect
      this.userIsBeingCorrected = true;
      this.correctionText = this.CurrentQuestion.answers[0].value;
    }
    // Update average score
    this.scoreAverage = Math.floor(this.getScoresAverage());

    // Get next question
    this.pickQuestion();

    // Reset the textbox and Uncertainty Calculator
    this.answerGuess = '';
    this.LocalUncertaintyHandler.timePassed = 0;
  }
}
