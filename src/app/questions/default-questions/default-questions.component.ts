import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { PresenceService } from '../services/presence.service';
import { QuestionsService } from '../services/questions.service';
import { DefaultQuestionsService } from '../services/default-questions.service';
import { AuthService } from 'src/app/auth/auth.service';

import { Question } from '../question.model';

@Component({
  selector: 'app-default-questions',
  templateUrl: './default-questions.component.html',
  styleUrls: ['./default-questions.component.css']
})
export class DefaultQuestionsComponent implements OnInit, OnDestroy {
  // questions: Question[] = [];
  userIsAuthenticated = false;
  userId: string;
  // userQuestions: Question[] = [];
  questionPresence: {} = {};
  objOfCategoryArrays = {};
  private questionsSub: Subscription;

  constructor(
    public defaultQuestionsService: DefaultQuestionsService,
    public authService: AuthService,
    public questionsService: QuestionsService,
    public presenceService: PresenceService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.defaultQuestionsService.getQuestions();
    this.questionsSub = this.defaultQuestionsService.getQuestionsUpdatedListener()
      .subscribe((defaultQuestions: {questions: Question[]}) => {
        defaultQuestions.questions.forEach(question => {
          const category = question.category;
          if (!this.objOfCategoryArrays[category]) {
            this.objOfCategoryArrays[category] = [];
          }
          this.objOfCategoryArrays[category].push(question);
        });
      });

    this.presenceService.getQuestionPresenceUpdated().subscribe((questionPresenceObj) => {
      this.questionPresence = questionPresenceObj;
    });

    if (this.userId) {
      this.questionPresence = this.route.snapshot.data.data;
    }
  }

  toggleTracking(
      questionPresence: boolean,
      userId: string,
      questionId: string,
      questionTitle: string,
      questionContent: string,
      questionCategory: string,
      questionType: string,
      questionChoices: object
    ) {
    if (questionPresence) {
      // Delete
      this.questionsService.deleteQuestion(userId, questionId);
      this.presenceService.removeFromQP(questionId);
    }
    if (!questionPresence) {
      // Add
      this.questionsService.addQuestion(
        userId,
        questionId,
        questionTitle,
        questionContent,
        questionCategory,
        questionType,
        questionChoices
      );
      this.presenceService.addToQP(questionId);
    }
  }

  backClicked() {
    this._location.back();
  }

  ngOnDestroy() {
    this.questionsSub.unsubscribe();
  }
}
