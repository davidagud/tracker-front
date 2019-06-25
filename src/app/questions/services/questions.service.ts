import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Question } from '../question.model';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  {providedIn: 'root'}
)
export class QuestionsService {
  private questions: Question[];
  private questionsUpdated = new Subject<{questions: Question[]}>();

  constructor(private http: HttpClient) {}

  getQuestionsPreSubscribe(userId: string) {
    return this.http.get<{message: string, questionsArray: any}>(BACKEND_URL + userId)
    .pipe(map((response) => {
      if (response.questionsArray === null ) {
        return [];
      }
      return response.questionsArray.questions.map(question => {
        return {
          id: question._id,
          title: question.title,
          content: question.content,
          category: question.category,
          type: question.type,
          choices: question.choices
        };
        });
      })
    );
  }

  getQuestions(userId: string) {
    this.getQuestionsPreSubscribe(userId).subscribe(extractedQuestions => {
        this.questions = extractedQuestions;
        this.questionsUpdated.next({
          questions: [...this.questions]
        });
        console.log(this.questions);
      });
  }

  getQuestionsUpdatedListener() {
    return this.questionsUpdated;
  }

  addQuestion(
      userId: string,
      questionId: string,
      questionTitle: string,
      questionContent: string,
      questionCategory: string,
      questionType: string,
      questionChoices: object
    ) {
    let questionData: Question;
    questionData = {
      userId,
      id: questionId,
      title: questionTitle,
      content: questionContent,
      category: questionCategory,
      type: questionType,
      choices: questionChoices
    };
    console.log('Adding question', questionData);
    this.http.put<{message: string, question: Question}>(BACKEND_URL, questionData)
      .subscribe((responseData) => {
        console.log('Response data', responseData);
        this.getQuestions(userId);
      });
  }

  deleteQuestion(userId: string, questionId: string) {
    console.log('service delete');
    this.http.delete(BACKEND_URL + userId + '/' + questionId)
      .subscribe((responseData) => {
        console.log('Response data', responseData);
        this.getQuestions(userId);
      });
  }
}
