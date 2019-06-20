import { PresenceService } from './../presence.service';
import { QuestionsService } from './../questions.service';
import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { Question } from '../question.model';
import { DefaultQuestionsService } from '../default-questions.service';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserQuestion } from '../user-question.model';

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

  // private _testString = new BehaviorSubject('My value');
  // private _testString = new Subject<string>();

  constructor(
    public defaultQuestionsService: DefaultQuestionsService,
    public authService: AuthService,
    public questionsService: QuestionsService,
    public presenceService: PresenceService
  ) { }

  // @Input()
  // set testString(value) {
  //   this._testString.next('Blah');
  // }

  // get testString() {
  //   return this._testString.getValue();
  // }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.defaultQuestionsService.getQuestions();
    this.questionsSub = this.defaultQuestionsService.getQuestionsUpdatedListener()
      .subscribe((defaultQuestions: {questions: Question[]}) => {
        this.questions = defaultQuestions.questions;
      });

    // this._testString.subscribe(value => {
    //   this.testStringDisplay = value;
    // });
    // console.log(this._testString);

    if (this.userId) {
      this.presenceService.setPresence(this.userId);
      this.getQuestionPresence();
    }
  }

  getQuestionPresence() {
    this.presenceService.getQuestionPresenceUpdated().subscribe((questionPresenceObj) => {
      console.log('QP', questionPresenceObj);
      this.questionPresence = questionPresenceObj;
    });
  }

  // onFireTestString() {
  //   this._testString.next('No');
  // }

  onAdd(userId: string, questionId: string, questionTitle: string, questionContent: string) {
    this.questionsService.addQuestion(userId, questionId, questionTitle, questionContent);
  }

  onDelete(userId: string, questionId: string) {
    this.questionsService.deleteQuestion(userId, questionId);
    console.log('deleted');
  }

  ngOnDestroy() {
    this.questionsSub.unsubscribe();
  }
}
