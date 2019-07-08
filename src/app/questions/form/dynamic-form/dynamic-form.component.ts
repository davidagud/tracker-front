import { UserAnswersService } from '../../services/user-answers.service';
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
  resolvedData;
  questionPresence = {};
  userId;
  objOfCategoryArrays;

  constructor(
    private userAnswersService: UserAnswersService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();

    this.questionPresence = this.route.snapshot.data.presenceData;

    this.resolvedData = [...this.route.snapshot.data.data];

    const todaysDate = new Date((new Date()).setHours( 0, 0, 0, 0));
    // const todaysDateParsed = Date.parse(todaysDate.toString());

    this.formCreation(this.resolvedData, todaysDate);
  }

  formCreation(dataSource, date) {
    const group = {};

    this.userQuestions = dataSource;

    // Just added
    this.objOfCategoryArrays = {};

    this.userQuestions.forEach(question => {
      const category = question.category;
      if (!this.objOfCategoryArrays[category]) {
        this.objOfCategoryArrays[category] = [];
      }
      this.objOfCategoryArrays[category].push(question);

      group[question.id] = new FormControl(question.answer || '');
    });
    // End just added

    this.form = new FormGroup(group);

    if (date == null) {
      this.form.addControl('date', new FormControl(null, {}));
    } else {
      this.form.addControl('date', new FormControl(date, {}));
    }

    this.userQuestions.forEach(question => {
      this.form.addControl(question.id, new FormControl(null, {}));
    });
  }

  async dateChange(event) {
    const enteredDate = Date.parse(event);
    const foundDate = await this.userAnswersService.getDayResponse(this.userId, enteredDate);
    if (foundDate !== null) {
      const dateFoundQuestionsArray = [];

      for (const key in foundDate[enteredDate]) {
        if (foundDate[enteredDate].hasOwnProperty(key)) {
          foundDate[enteredDate][key].id = key;
          dateFoundQuestionsArray.push(foundDate[enteredDate][key]);
        }
      }

      this.resolvedData.forEach(resolvedQuestion => {
        const presence = dateFoundQuestionsArray.every(question => {
          return question.id !== resolvedQuestion.id;
        });
        if (presence) {
          dateFoundQuestionsArray.push(resolvedQuestion);
        }
      });

      this.dateFound(dateFoundQuestionsArray, enteredDate);
    } else {
      const resolvedDataUpdated = [];
      this.resolvedData.forEach(resolvedQuestion => {
        if (this.questionPresence[resolvedQuestion.id]) {
          delete resolvedQuestion.answer;
          resolvedDataUpdated.push(resolvedQuestion);
        }
      });
      this.formCreation(resolvedDataUpdated, event);
    }
  }

  dateFound(dayData, enteredDate) {
    const extractedDate = new Date(enteredDate);

    this.formCreation(dayData, extractedDate);
  }

  onSubmit() {
    const formQuestionObjectsObj = {};

    this.userQuestions.forEach( question => {
      if (this.form.value[question.id] === '') {
        this.form.value[question.id] = null;
      }
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
