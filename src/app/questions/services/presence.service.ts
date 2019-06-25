import { DefaultQuestionsService } from './default-questions.service';
import { Injectable } from '@angular/core';
import { QuestionsService } from './questions.service';
import { Question } from '../question.model';
import { Subject } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class PresenceService {
  questions: Question[];
  defaultQuestions: Question[];
  questionPresence = {};
  private questionPresenceUpdated = new Subject();

  constructor(private questionsService: QuestionsService, private defaultQuestionsService: DefaultQuestionsService) {}

  async setPresence(userId) {
    // await this.defaultQuestionsService.getQuestionsPreSubscribe().toPromise().then(result => {
    //   this.defaultQuestions = [...result.questions];
    // });

    // await this.questionsService.getQuestionsPreSubscribe(userId).toPromise().then(result => {
    //   this.questions = [...result];
    // });

    await this.defaultQuestionsService.getQuestionsPreSubscribe().toPromise().then(result => {
      this.defaultQuestions = [...result.questions];
    });

    await this.questionsService.getQuestionsPreSubscribe(userId).toPromise().then(result => {
      this.questions = [...result];
    });

    await this.defaultQuestions.forEach(question => {
      this.questions.forEach(userQuestion => {
        const questionId = question.id;
        if (question.id === userQuestion.id) {
          this.questionPresence[questionId] = true;
        }
      });
    });

    console.log('QP', this.questionPresence);

    return this.questionPresence;
  }

  removeFromQP(questionId) {
    this.questionPresence[questionId] = false;
    this.questionPresenceUpdated[questionId] = false;
    console.log('QP remove', this.questionPresence);
  }

  addToQP(questionId) {
    this.questionPresence[questionId] = true;
    this.questionPresenceUpdated[questionId] = true;
    console.log('QP add', this.questionPresence);
  }

  getQuestionPresenceUpdated() {
    return this.questionPresenceUpdated;
  }
}
