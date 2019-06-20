import { DefaultQuestionsService } from './default-questions.service';
import { Injectable } from '@angular/core';
import { QuestionsService } from './questions.service';
import { UserQuestion } from './user-question.model';
import { Question } from './question.model';
import { Subject } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class PresenceService {
  presence = {};
  questions: UserQuestion[];
  defaultQuestions: Question[];
  questionPresence: {} = {};
  private questionPresenceUpdated = new Subject();

  constructor(private questionsService: QuestionsService, private defaultQuestionsService: DefaultQuestionsService) {}

  setPresence(userId) {
    this.questionsService.getQuestions(userId);
    this.defaultQuestionsService.getQuestions();

    this.defaultQuestionsService.getQuestionsUpdatedListener().subscribe(
      (questionsData: { questions: Question[]}) => {
        this.defaultQuestions = questionsData.questions;
        console.log('Default questions', this.defaultQuestions);

        this.questionsService.getQuestionsUpdatedListener().subscribe(
          (userQuestionsData: { questions: UserQuestion[]}) => {
            this.questions = userQuestionsData.questions;
            console.log('User Questions', this.questions);
            this.questionPresence = {};
            this.defaultQuestions.forEach(question => {
              console.log('Here');
              this.questions.forEach(userQuestion => {
                const questionId = question.id;
                if (question.id === userQuestion.id) {
                  this.questionPresence[questionId] = true;
                }
              });
            });
            console.log('Next', this.questionPresence);
            this.questionPresenceUpdated.next(this.questionPresence);
          });
      });
  }

  getQuestionPresenceUpdated() {
    return this.questionPresenceUpdated;
  }
}
