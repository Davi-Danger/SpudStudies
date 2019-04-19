import {Component} from '@angular/core';

import DummyQuestionSet from '../assets/dummy.questionset.json';

import {Question} from './common/question.interface';
import {QuestionSet} from './common/question_set.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpudStudies';
  public QuestionSet: QuestionSet;  // Current set of questions

  constructor() {  // Set QuestionSet as dummy data
    this.QuestionSet = DummyQuestionSet;
  }
}
