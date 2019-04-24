import {Question} from './question.interface';

export class QuestionSet {
  title: string;
  version: string|number;
  questions: Question[];
}
