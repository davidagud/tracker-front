import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Question } from './question.model';
import { Subject } from 'rxjs';
import { UserQuestion } from './user-question.model';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  {providedIn: 'root'}
)
export class QuestionsService {
  private questions: UserQuestion[];
  private questionsUpdated = new Subject<{questions: UserQuestion[]}>();

  constructor(private http: HttpClient) {}

  getQuestions(userId: string) {
    this.http.get<{message: string, questionsArray: any}>(BACKEND_URL + userId)
      .pipe(
        map((response) => {
          return response.questionsArray.questions.map(question => {
              return {
                title: question.title,
                id: question._id,
                content: question.content
              }
            })
        })
      )
      .subscribe(extractedQuestions => {
        this.questions = extractedQuestions;
        this.questionsUpdated.next({
          questions: [...this.questions]
        });
      });
  }

  getQuestionsUpdatedListener() {
    return this.questionsUpdated.asObservable();
  }

  getQuestionPresence() {

  }

  getQuestionPresenceListener() {

  }

  addQuestion(userId: string, questionId: string, questionTitle: string, questionContent: string) {
    let questionData: UserQuestion;
    questionData = {
      userId,
      id: questionId,
      title: questionTitle,
      content: questionContent
    };
    console.log('Adding question', questionData);
    this.http.put<{message: string, question: UserQuestion}>(BACKEND_URL, questionData)
      .subscribe((responseData) => {
        console.log('Response data', responseData);
      });
  }

  deleteQuestion(userId: string, questionId: string) {
    console.log('service delete');
    return this.http.delete(BACKEND_URL + userId + '/' + questionId)
      .subscribe((responseData) => {
        console.log('Response date', responseData);
      });
  }
}
