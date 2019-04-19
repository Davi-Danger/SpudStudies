import {Title} from '@angular/platform-browser';

import {Question} from './question.interface';

export interface QuestionSet {
  Title?: string;
  version: string|number;
  questions: Question[];
}
