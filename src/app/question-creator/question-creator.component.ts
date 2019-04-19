import {Component, OnInit} from '@angular/core';

import DummyQuestionSet from '../../assets/dummy.questionset.json';

import {Question} from '../common/question.interface';
import {QuestionSet} from '../common/question_set.interface';

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.scss']
})
export class QuestionCreatorComponent implements OnInit {
  public CurrentQuestionSet: QuestionSet;  // Current set of questions
  private ActiveQuestion: Question;

  constructor() {
    this.CurrentQuestionSet = DummyQuestionSet;
  }

  onQuestionSelect(selectedQuestionData: Question) {
    this.ActiveQuestion = selectedQuestionData;
  }

  ngOnInit() {}
}
