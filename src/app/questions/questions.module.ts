import { QuestionListComponent } from './question-list/question-list.component';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    QuestionListComponent
  ],
  imports: [
    MatExpansionModule,
    CommonModule
  ]
})
export class QuestionsModule {}
