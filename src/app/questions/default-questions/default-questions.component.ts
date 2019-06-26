import { ActivatedRoute } from '@angular/router';
import { PresenceService } from '../services/presence.service';
import { QuestionsService } from '../services/questions.service';
import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { Question } from '../question.model';
import { DefaultQuestionsService } from '../services/default-questions.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-default-questions',
  templateUrl: './default-questions.component.html',
  styleUrls: ['./default-questions.component.css']
})
export class DefaultQuestionsComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  userIsAuthenticated = false;
  userId: string;
  userQuestions: Question[] = [];
  testStringDisplay: string;
  questionPresence: {} = {};
  private questionsSub: Subscription;

  constructor(
    public defaultQuestionsService: DefaultQuestionsService,
    public authService: AuthService,
    public questionsService: QuestionsService,
    public presenceService: PresenceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.defaultQuestionsService.getQuestions();
    this.questionsSub = this.defaultQuestionsService.getQuestionsUpdatedListener()
      .subscribe((defaultQuestions: {questions: Question[]}) => {
        this.questions = defaultQuestions.questions;
      });

    this.presenceService.getQuestionPresenceUpdated().subscribe((questionPresenceObj) => {
      this.questionPresence = questionPresenceObj;
    });

    if (this.userId) {
      this.questionPresence = this.route.snapshot.data.data;
    }
  }

  onAdd(
      userId: string,
      questionId: string,
      questionTitle: string,
      questionContent: string,
      questionCategory: string,
      questionType: string,
      questionChoices: object
    ) {
    this.questionsService.addQuestion(userId, questionId, questionTitle, questionContent, questionCategory, questionType, questionChoices);
    this.presenceService.addToQP(questionId);
  }

  onDelete(userId: string, questionId: string) {
    this.questionsService.deleteQuestion(userId, questionId);
    this.presenceService.removeFromQP(questionId);
    console.log('deleted');
  }

  ngOnDestroy() {
    this.questionsSub.unsubscribe();
  }
}
