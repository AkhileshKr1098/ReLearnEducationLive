import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeekByPageComponent } from './week-by-page/week-by-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { TopicsComponent } from './topics/topics.component';
import { BlendWordsComponent } from './QuestionType/blend-words/blend-words.component';
import { LetterMatchComponent } from './QuestionType/letter-match/letter-match.component';
import { LetterTrackingComponent } from './QuestionType/letter-tracking/letter-tracking.component';
import { ListenWordsComponent } from './QuestionType/listen-words/listen-words.component';
import { QTypeComponent } from './QuestionType/qtype/qtype.component';

const routes: Routes = [
  // { path: '', component: LetterMatchComponent },

  {
    path: '', component: HomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'weeks', component: WeekByPageComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'question', component: QuestionComponent },

      // for question type
      { path: 'qtype', component: QTypeComponent },
      { path: 'BlendWords', component: BlendWordsComponent },
      { path: 'lettermatch', component: LetterMatchComponent },
      { path: 'lettertracking', component: LetterTrackingComponent },
      { path: 'ListenWords', component: ListenWordsComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnglishRoutingModule { }
