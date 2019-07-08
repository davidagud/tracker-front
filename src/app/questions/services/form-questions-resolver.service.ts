import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { UserAnswersService } from './user-answers.service';
import { AuthService } from '../../auth/auth.service';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root'
})
export class FormQuestionsResolverService implements Resolve<any> {
  data;
  private userId: string;

  constructor(
    private questionsService: QuestionsService,
    private authService: AuthService,
    private userAnswersService: UserAnswersService
  ) {}

  resolve(): Promise<any> {
    this.userId = this.authService.getUserId();

    const todaysDate = new Date((new Date()).setHours( 0, 0, 0, 0));
    const todaysDateParsed = Date.parse(todaysDate.toString());

    const foundDateFunction = new Promise((resolve, reject) => {
      this.userAnswersService.getDayResponse(this.userId, todaysDateParsed).then(foundDate => {
        if (foundDate !== null) {
          const dateFoundQuestionsArray = [];
          for (const key in foundDate[todaysDateParsed]) {
            if (foundDate[todaysDateParsed].hasOwnProperty(key)) {
              foundDate[todaysDateParsed][key].id = key;
              dateFoundQuestionsArray.push(foundDate[todaysDateParsed][key]);
            }
          }
          this.data = dateFoundQuestionsArray;
          this.questionsService.getQuestionsPreSubscribe(this.userId).toPromise().then(result => {
            result.forEach(question => {
              const presence = this.data.some(dataQuestion => {
                return question.id == dataQuestion.id;
              });
              if (!presence) {
                this.data.push(question);
              }
            });
            resolve(this.data);
          });
        } else {
          this.questionsService.getQuestionsPreSubscribe(this.userId).toPromise().then(result => {
            this.data = result;
            resolve(this.data);
          });
        }
      });
    });

    return foundDateFunction.then((result) => {
      return result;
    });
  }
}
