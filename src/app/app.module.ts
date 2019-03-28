import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {EditorComponent} from './editor/editor.component';
import {PracticeComponent} from './practice/practice.component';
import {QuestionCreatorComponent} from './question-creator/question-creator.component';

@NgModule({
  declarations: [
    AppComponent, EditorComponent, QuestionCreatorComponent, PracticeComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
