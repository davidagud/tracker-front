import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { DefaultQuestionsComponent } from './default-questions/default-questions.component';
import { DayComponent } from './day/day.component';
import { QuestionListComponent } from './question-list/question-list.component';

@NgModule({
  declarations: [
    DefaultQuestionsComponent,
    DayComponent,
    QuestionListComponent
  ],
  imports: [
    MatExpansionModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ]
})
export class QuestionsModule {}
