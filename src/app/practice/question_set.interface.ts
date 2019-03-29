import {Question} from './question.interface';

export interface QuestionSet {
  version: string|number;
  questions: Question[];
}
