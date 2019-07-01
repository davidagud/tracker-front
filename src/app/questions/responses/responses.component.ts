import { UserAnswersService } from './../services/user-answers.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  minDate;
  userId;
  submittedQuestionsObj = {};
  finalCount = [];
  isLoading: boolean;
  displayedColumns: string[] = ['response', 'quantity'];
  form: FormGroup;

  constructor(private authService: AuthService, private userAnswersService: UserAnswersService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    const group = {};
    group['startDate'] = new FormControl('startDate');
    group['endDate'] = new FormControl('endDate');

    this.form = new FormGroup(group);
  }

  dateChange(event) {
    this.minDate = event;
  }

  onSubmit() {
    this.isLoading = true;
    this.submittedQuestionsObj = {};
    this.finalCount = [];
    const startDate = Date.parse(this.form.value.startDate);
    const endDate = Date.parse(this.form.value.endDate);

    const dateArray = [startDate];

    for (let i = startDate; i < endDate; i += 86400000 ) {
      const date = i + 86400000;
      dateArray.push(date);
    }

    const dateArrayLoop = async () => {
      for (const date of dateArray) {
        await this.findDate(date);
      }
    };

    dateArrayLoop().then(() => {
      this.populateFinalCount();
      this.isLoading = false;
    });
  }

  async findDate(date) {
    const foundDate = await this.userAnswersService.getDayResponse(this.userId, date);
    if (foundDate !== null) {
     for (const key in foundDate[date]) {
        if (foundDate[date].hasOwnProperty(key)) {
          foundDate[date][key].id = key;
          if (!this.submittedQuestionsObj[key]) {
            this.submittedQuestionsObj[key] = {
              content: foundDate[date][key].content,
              answers: {}
            };
          }
          if (this.submittedQuestionsObj[key].answers[foundDate[date][key].answer]) {
            this.submittedQuestionsObj[key].answers[foundDate[date][key].answer] += 1;
          } else {
            this.submittedQuestionsObj[key].answers[foundDate[date][key].answer] = 1;
          }
        }
      }
    }
  }

  populateFinalCount() {
    for (const key in this.submittedQuestionsObj) {
      if (this.submittedQuestionsObj.hasOwnProperty(key)) {
        const answerObjArray = [];
        for (const answer in this.submittedQuestionsObj[key].answers) {
          if (this.submittedQuestionsObj[key].answers.hasOwnProperty(answer)) {
            answerObjArray.push(
              [
                answer,
                this.submittedQuestionsObj[key].answers[answer]
              ]
            );
          }
        }
        this.finalCount.push(
          [this.submittedQuestionsObj[key].content, answerObjArray]
        );
      }
    }
  }
}
