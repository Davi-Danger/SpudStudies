import {Component, OnInit} from '@angular/core';

import DefaultQuestionSet from '../../assets/default.questionset.json';
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
  private SelectedQuestion: Question;      // Currently selected question

  constructor() {
    this.CurrentQuestionSet = DefaultQuestionSet;  // load blank questionset
    this.SelectedQuestion =
        this.CurrentQuestionSet
            .questions[0];  // automatically select first question
  }

  onQuestionSelect(selectedQuestionData: Question) {
    this.SelectedQuestion =
        selectedQuestionData;  // select the clicked question
  }

  addQuestion() {
    this.CurrentQuestionSet.questions.push(
        <Question>{text: null, answers: [{}]});
    console.log(
        'Question ' + this.CurrentQuestionSet.questions.length +
        ' successfully added.');
  }
  addAnswer() {
    // Append a blank answer to the end of the list of acceptable answers
    this.SelectedQuestion.answers.push(
        <Answer>{value: null, caseSensitivity: false});
  }
  removeQuestion(index: number) {  // remove a specific answer from the list
    console.log('Question removal request recieved at index ' + index);
    console.log(this.CurrentQuestionSet.questions.splice(index, 1));
    console.log('Question ' + index + ' was successfully removed.');
  }
  removeAnswer(index:
                   number) {  // remove a specific answer from the current list
    console.log(this.SelectedQuestion.answers.splice(index, 1));
  }

  saveSetAsJson() {  // Save the current set as a Json data file
    console.log(JSON.stringify(this.CurrentQuestionSet));

    const sanitizedTitle: string =
        this.CurrentQuestionSet.title.replace(/[^a-z0-9]/gi, '_')
            .toLowerCase();  // Make a safe filename

    const dataStr: string = 'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(
            this.CurrentQuestionSet));  // Get the data as a string

    const downloadNode = document.createElement('a');  // Download file as json
    downloadNode.setAttribute('href', dataStr);
    downloadNode.setAttribute('download', sanitizedTitle + '.json');
    document.body.appendChild(downloadNode);  // required for firefox
    downloadNode.click();
    downloadNode.remove();
  }

  ngOnInit() {}
}
