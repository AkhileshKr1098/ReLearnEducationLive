import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnglishRoutingModule } from './english-routing.module';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';

import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardComponent } from './dashboard/dashboard.component';


import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { MatDividerModule } from "@angular/material/divider"
import { MatSelectModule } from "@angular/material/select";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { WeekByPageComponent } from './week-by-page/week-by-page.component';
import { NgChartsModule } from 'ng2-charts';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question/question.component';
import { TopicsComponent } from './topics/topics.component';
import { LetterTrackingComponent } from './QuestionType/letter-tracking/letter-tracking.component';
import { MCQComponent } from './QuestionType/mcq/mcq.component';
import { LetterMatchComponent } from './QuestionType/letter-match/letter-match.component';
import { BlendWordsComponent } from './QuestionType/blend-words/blend-words.component';
import { ListenWordsComponent } from './QuestionType/listen-words/listen-words.component';
import { QTypeComponent } from './QuestionType/qtype/qtype.component';
import { OopsDialogComponent } from './QuestionType/oops-dialog/oops-dialog.component';
import { ConfirmDialogComponent } from './QuestionType/confirm-dialog/confirm-dialog.component';
import { CorrectBoxComponent } from './correct-box/correct-box.component';
import { OppsBoxComponent } from './opps-box/opps-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    WeekByPageComponent,
    QuestionComponent,
    TopicsComponent,
    LetterTrackingComponent,
    MCQComponent,
    LetterMatchComponent,
    BlendWordsComponent,
    ListenWordsComponent,
    QTypeComponent,
    OopsDialogComponent,
    ConfirmDialogComponent,
    CorrectBoxComponent,
    OppsBoxComponent],
  imports: [
    CommonModule,
    EnglishRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    NgChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 15,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule

  ],

})
export class EnglishModule { }
