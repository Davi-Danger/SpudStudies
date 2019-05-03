import {Component, Input, OnInit} from '@angular/core';
import sort from 'fast-sort';

import DefaultQuestionSet from '../../assets/default.questionset.json';

import {Question} from '../common/question.interface';
import {QuestionSet} from '../common/question_set.interface';

import {UncertaintyHandler} from './uncertaintyHandler.class';

// const levenshtein = require('fast-levenshtein');

/* TODO:
Add JSON upload to practice mode

Add JSON upload to edit mode

Add data validation before download in edit mode

Replace scores with uncertainty handler data

Add nice styling

Add casual spelling mode to questions (allows a letter or two to be
incorrect)

Make new answers auto-selected in editor
*/

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  public QuestionSet: QuestionSet;   // Current set of questions
  public CurrentQuestion: Question;  // Current question being displayed

  public scoreAverage = 0;  // Average score of all questions

  public answerGuess = '';  // Answer currently entered
  public correctionText =
      '';  // Placeholder text for textbox / Most correct answer

  constructor() {  // Set QuestionSet as dummy data
    this.QuestionSet = DefaultQuestionSet;

    // Set current question as a placeholder
    this.CurrentQuestion = this.QuestionSet[0];

    // Set optional property values
    this.prepareQuestionData();
  }

  ngOnInit() {
    // Set the current question to the first in the set
    this.CurrentQuestion = this.QuestionSet.questions[0];
    this.cleanValues();
  }

  cleanValues() {
    for (const question of this.QuestionSet.questions) {
      if (!question.score || question.score === NaN) {
        console.warn(
            'Unscored question "' + question.text +
            '" had an invalid score, which was set to 0');
        question.score = 0;
      }
      if (question.answers.length <= 0 || !question.answers) {
        this.QuestionSet = DefaultQuestionSet;
        console.error('Unacceptable answers. Question set was set to default.');
      }
      for (const answer of question.answers) {
        if (!answer.caseSensitivity || answer.caseSensitivity == null) {
          answer.caseSensitivity = false;
          console.warn(
              'Undetermined case sensitivity found in answer "' + answer.value +
              '" of question "' + question.text +
              '". Case sensitivity was set to false');
        }
      }
    }
    if (!this.scoreAverage || this.scoreAverage === NaN) {
      this.scoreAverage = 0;
      console.warn('Score average was unacceptable, so it was set to 0.');
    }
  }
  prepareQuestionData() {  // Adds missing question data
    for (const item of this.QuestionSet.questions) {
      item.score = 0;  // set question score
      if (!item.text) {
        item.text = 'No text received';
        console.warn(
            'Question text could not be found! Placeholder data was used instead.');
      }
    }
    this.cleanValues();
  }

  uploadSet(event) {
    console.log('New set was uploaded');
    const fileReader = new FileReader();
    if (event.target.files &&
        event.target.files.length > 0) {   // if there are actually files there
      const file = event.target.files[0];  // set the loaded file
      fileReader.readAsText(file);         // read file data
      fileReader.onload = () => {
        console.log(<string>fileReader.result);
        this.QuestionSet = JSON.parse(<string>fileReader.result);
      };
      this.prepareQuestionData();      // Reset question set
      console.info(this.QuestionSet);  // log all question data in the console
    }
    this.cleanValues();
  }
  sortQuestions() {
    this.cleanValues();
    sort(this.QuestionSet.questions).by([
      {asc: 'score'}, {desc: 'timesCalled'}, {asc: 'text'}
    ]);
    console.info(this.QuestionSet
                     .questions);  // log the newly sorted list in the console
  }
  pickQuestion() {  // Selects the next question to display
    this.sortQuestions();
    this.CurrentQuestion = this.QuestionSet.questions[0];
  }

  getScoresAverage() {  // Get the average of question scores
    console.log('Calculating average score...');
    let total = 0;
    for (const item of this.QuestionSet.questions) {
      if (item.score !== NaN) {
        total += item.score;
      }
    }
    if (this.QuestionSet.questions.length <= 0) {
      console.error('Not enough questions received!');
    }
    console.info(
        'Average score is ' + (total / this.QuestionSet.questions.length));
    return total / this.QuestionSet.questions.length;
  }

  answerCorrect() {  // Action on correct answer
    // If score is at or above the goal, the session is complete
    this.CurrentQuestion.score += 5;
    // Clear the placeholder text
    this.correctionText = '';
    console.info(`Question's score is now ${this.CurrentQuestion.score}.`);
  }
  answerCheck() {  // Checks if an answer is correct
    // Log the answers to the question in the console
    console.log('Checking answer...');
    console.info(this.CurrentQuestion.answers);
    // Log the submitted answer
    console.info(this.answerGuess);

    // check each answer for correctness
    for (const correctAnswer of this.CurrentQuestion.answers) {
      if (correctAnswer.caseSensitivity) {
        if (this.answerGuess === correctAnswer.value) {
          // if the answer is correct, return true.
          return true;
        }
      } else {
        if (this.answerGuess.toUpperCase() ===
            correctAnswer.value.toUpperCase()) {
          // if the answer is correct, return true.
          return true;
        }
      }
    }
    // if no answers are correct, return false
    return false;
  }
  submitAnswer() {
    console.log('Answer submitted');

    // Check if answer is correct
    if (this.answerCheck()) {
      // if so, run the "correct" script
      this.answerCorrect();
    } else {  // otherwise...
      this.CurrentQuestion.score--;
      // Alert user of the most correct answer when they are incorrect
      this.correctionText = this.CurrentQuestion.answers[0].value;
    }
    // Update score average
    this.scoreAverage = Math.floor(this.getScoresAverage());

    // Get next question
    this.pickQuestion();

    // Reset the textbox
    this.answerGuess = '';
  }
}
