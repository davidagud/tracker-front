import { DynamicFormQuestionsComponent } from './../form/dynamic-form-questions/dynamic-form-questions.component';
import { DynamicFormComponent } from './../form/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { DefaultQuestionsComponent } from './default-questions/default-questions.component';
import { DayComponent } from './day/day.component';

@NgModule({
  declarations: [
    DefaultQuestionsComponent,
    DayComponent,
    DynamicFormComponent,
    DynamicFormQuestionsComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ]
})
export class QuestionsModule {}
