import {Component, OnInit} from '@angular/core';

import DummyQuestionSet from '../../assets/dummy.questionset.json';
import {Answer} from '../common/answer.interface.js';
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
    this.ActiveQuestion = this.CurrentQuestionSet.questions[0];
  }

  onQuestionSelect(selectedQuestionData: Question) {
    this.ActiveQuestion = selectedQuestionData;
  }

  addQuestion() {
    this.CurrentQuestionSet.questions.push(
        <Question>{text: 'Question text goes here!', answers: [{}]});
    console.log(
        'Question ' + this.CurrentQuestionSet.questions.length +
        ' successfully added.');
  }
  addAnswer() {
    this.ActiveQuestion.answers.push(
        <Answer>{value: null, caseSensitivity: false});
    console.log(
        'Answer ' + this.ActiveQuestion.answers.length +
        ' successfully added.');
  }
  removeQuestion(index: number) {
    console.log('Question removal request recieved at index ' + index);
    console.log(this.CurrentQuestionSet.questions.splice(index, 1));
    console.log('Question ' + index + ' was successfully removed.');
  }
  removeAnswer(index: number) {
    console.log('Answer removal request recieved at index ' + index);
    console.log(this.ActiveQuestion.answers.splice(index, 1));
    console.log('Answer ' + index + ' was successfully removed.');
  }
  ngOnInit() {}
}
