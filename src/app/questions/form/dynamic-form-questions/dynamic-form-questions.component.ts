import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-dynamic-form-questions',
  templateUrl: './dynamic-form-questions.component.html',
  styleUrls: ['./dynamic-form-questions.component.css']
})
export class DynamicFormQuestionsComponent {

  @Input() question: QuestionBase<any>;

  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.question.id].valid; }

}
