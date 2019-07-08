import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { QuestionsService } from './questions.service';
import { DefaultQuestionsService } from './default-questions.service';

import { Question } from '../question.model';

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
    return this.questionPresence;
  }

  removeFromQP(questionId) {
    this.questionPresence[questionId] = false;
    this.questionPresenceUpdated[questionId] = false;
  }

  addToQP(questionId) {
    this.questionPresence[questionId] = true;
    this.questionPresenceUpdated[questionId] = true;
  }

  getQuestionPresenceUpdated() {
    return this.questionPresenceUpdated;
  }
}
