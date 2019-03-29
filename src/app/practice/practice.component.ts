import {Component, OnInit} from '@angular/core';

import * as questionSet from './dummy.questions.json';
import {Question} from './question.interface';
import {UncertaintyHandler} from './uncertaintyHandler.class';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  public LocalUncertaintyHandler: UncertaintyHandler;
  public score = 1;
  private previousScore;

  public guessDetectionScore = 0;

  public answerGuess = '';
  public questionText = '[Error, no question text given!]';
  public answers: string[] = ['Mama', 'mama'];

  constructor() {
    this.LocalUncertaintyHandler = new UncertaintyHandler(this.answers);
    this.questionText = questionSet.questions[0].text;
    this.answers = questionSet.questions[0].answers;
  }

  ngOnInit() {}

  submitAnswer() {
    if (this.answerCheck()) {
      this.answerCorrect();
    } else {
      if (this.score >= 1) {
        this.previousScore = this.score;
        this.score--;
      }
      alert(`The correct answer was "${this.answers[0]}"`);
    }
    console.log(`Predicted time until mastery: seconds`);
    this.answerGuess = '';
    this.LocalUncertaintyHandler.timePassed = 0;
  }

  answerCheck() {
    console.log(this.answers);
    console.log(this.answerGuess);
    for (const correctAnswer of this.answers) {
      if (this.answerGuess === correctAnswer) {
        return true;
      }
    }
    return false;
  }

  answerCorrect() {
    if (this.score >= 100) {
      alert('You win');
      this.score = 0;
    } else {
      this.previousScore = this.score;
      this.score += 5;
    }
  }
}
