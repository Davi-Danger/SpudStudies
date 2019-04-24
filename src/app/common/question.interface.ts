import {Answer} from './answer.interface';

export interface Question {
  text: string|string[];
  answers: Answer[];
  score?: number;
  timesCalled?: number;
}
