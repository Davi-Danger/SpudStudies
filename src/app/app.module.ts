import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    QuestionCreatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
