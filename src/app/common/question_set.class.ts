import {Title} from '@angular/platform-browser';

import {Question} from './question.interface';

export class QuestionSet {
  Title?: string;
  version: string|number;
  questions: Question[];
}
