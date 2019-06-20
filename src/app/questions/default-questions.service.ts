import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Question } from './question.model';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  {providedIn: 'root'}
)
export class DefaultQuestionsService {
  userId: string;
  private questions: Question[];
  private questionsUpdated = new Subject<{questions: Question[]}>();

  constructor(private http: HttpClient) {}

  getQuestions() {
    this.http.get<{message: string, questions: any}>(BACKEND_URL)
      .pipe(map((questionData) => {
        return {
          questions: questionData.questions.map(question => {
            return {
              title: question.title,
              content: question.content,
              id: question._id
            };
          })
        };
      }))
      .subscribe(transformedQuestionData => {
        this.questions = transformedQuestionData.questions;
        this.questionsUpdated.next({
          questions: [...this.questions]
        });
      });
  }

  getQuestionsUpdatedListener() {
    return this.questionsUpdated;
  }
}
