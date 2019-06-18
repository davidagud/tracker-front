import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Question } from './question.model';
import { Subject } from 'rxjs';
import { UserQuestion } from './user-question.model';
import { AuthService } from '../auth/auth.service';
import { QuestionsService } from './questions.service';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  {providedIn: 'root'}
)
export class DefaultQuestionsService {
  userId: string;
  private questions: Question[];
  private userQuestions: Question[];
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
    return this.questionsUpdated.asObservable();
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
}
