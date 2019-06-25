import { UserAnswersService } from '../../questions/services/user-answers.service';
import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../question-base';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { QuestionsService } from 'src/app/questions/services/questions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ QuestionsService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() userQuestions: QuestionBase<any>[] = [];
  form: FormGroup;
  formObject: object;
  userId;

  constructor(
    private userAnswersService: UserAnswersService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();

    const group = {};

    this.userQuestions = [...this.route.snapshot.data.data];

    this.userQuestions.forEach(question => {
      group[question.id] = new FormControl(question.answer || '');
    });

    this.form = new FormGroup(group);

    this.form.addControl('date', new FormControl(null, {}));

    this.userQuestions.forEach(question => {
      this.form.addControl(question.id, new FormControl(null, {}));
    });
  }

  onSubmit() {
    const formQuestionObjectsObj = {};

    this.userQuestions.forEach( question => {
      formQuestionObjectsObj[question.id] = {
            title: question.title,
            content: question.content,
            category: question.category,
            type: question.type,
            choices: question.choices,
            answer: this.form.value[question.id]
        };
    });

    this.formObject = { userId: this.userId, date: this.form.value.date, questions: formQuestionObjectsObj};
    this.userAnswersService.submitAnswers(this.formObject);
  }

}
