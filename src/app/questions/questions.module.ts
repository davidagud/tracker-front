import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { DefaultQuestionsComponent } from './default-questions/default-questions.component';
import { DayComponent } from './day/day.component';

@NgModule({
  declarations: [
    DefaultQuestionsComponent,
    DayComponent
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
