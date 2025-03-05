import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeekByPageComponent } from './week-by-page/week-by-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'weeks', component: WeekByPageComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'question', component: QuestionComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnglishRoutingModule { }
