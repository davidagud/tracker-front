import { DynamicFormQuestionsComponent } from './../form/dynamic-form-questions/dynamic-form-questions.component';
import { DynamicFormComponent } from './../form/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { DefaultQuestionsComponent } from './default-questions/default-questions.component';
import { DayComponent } from './day/day.component';
import { ResponsesComponent } from './responses/responses.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DefaultQuestionsComponent,
    DayComponent,
    DynamicFormComponent,
    DynamicFormQuestionsComponent,
    ResponsesComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    RouterModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class QuestionsModule {}
