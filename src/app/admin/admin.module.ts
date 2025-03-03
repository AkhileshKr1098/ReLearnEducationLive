import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudenListComponent } from './studen-list/studen-list.component';
import { StudenAddFormComponent } from './studen-add-form/studen-add-form.component';
import { ConfirmBoxComponentComponent } from './confirm-box-component/confirm-box-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeekComponent } from './Questions/week/week.component';
import { AddWeekComponent } from './Questions/add-week/add-week.component';
import { DayListComponent } from './Questions/day-list/day-list.component';
import { AddDayComponent } from './Questions/add-day/add-day.component';
import { TopicsListComponent } from './Questions/topics-list/topics-list.component';
import { AddTopicsComponent } from './Questions/add-topics/add-topics.component';
import { ClassesComponent } from './Questions/classes/classes.component';
import { AddClassesComponent } from './Questions/add-classes/add-classes.component';
import { UnitListComponent } from './Questions/unit-list/unit-list.component';
import { AddUnitComponent } from './Questions/add-unit/add-unit.component';
import { SubTopicsListComponent } from './Questions/sub-topics-list/sub-topics-list.component';
import { AddSubTopicsComponent } from './Questions/add-sub-topics/add-sub-topics.component';
import { QuestionListComponent } from './Questions/question-list/question-list.component';
import { AddQuestionComponent } from './Questions/add-question/add-question.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    StudenListComponent,
    StudenAddFormComponent,
    ConfirmBoxComponentComponent,
    WeekComponent,
    AddWeekComponent,
    DayListComponent,
    AddDayComponent,
    TopicsListComponent,
    AddTopicsComponent,
    ClassesComponent,
    AddClassesComponent,
    UnitListComponent,
    AddUnitComponent,
    SubTopicsListComponent,
    AddSubTopicsComponent,
    QuestionListComponent,
    AddQuestionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
 ]
})
export class AdminModule { }
