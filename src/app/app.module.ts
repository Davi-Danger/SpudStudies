import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {EditorComponent} from './editor/editor.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PracticeComponent} from './practice/practice.component';
import {QuestionCreatorComponent} from './question-creator/question-creator.component';
import {TabsComponent} from './tabs/tabs.component';

const appRoutes: Routes = [
  {path: 'edit', component: EditorComponent},
  {path: 'practice', component: PracticeComponent},
  {path: '', redirectTo: '/practice', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent, EditorComponent, QuestionCreatorComponent, PracticeComponent,
    TabsComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(
        appRoutes, {enableTracing: true}  // <-- debugging purposes only
        )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
