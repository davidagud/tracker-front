import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';

import { DefaultQuestionsComponent } from './default-questions/default-questions.component';
import { DynamicFormQuestionsComponent } from './form/dynamic-form-questions/dynamic-form-questions.component';
import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';
import { ResponsesComponent } from './responses/responses.component';

@NgModule({
  declarations: [
    DefaultQuestionsComponent,
    DynamicFormComponent,
    DynamicFormQuestionsComponent,
    ResponsesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ]
})
export class QuestionsModule {}
