import { QuestionsService } from './../questions.service';
import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { DefaultQuestionsService } from '../default-questions.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserQuestion } from '../user-question.model';

@Component({
  selector: 'app-default-questions',
  templateUrl: './default-questions.component.html',
  styleUrls: ['./default-questions.component.css']
})
export class DefaultQuestionsComponent implements OnInit {
  questions: Question[] = [];
  userIsAuthenticated = false;
  userId: string;
  userQuestions: Question[] = [];
  questionPresence: any = {};
  private defaultQuestionsSub: Subscription;
  private userQuestionsSub: Subscription;

  constructor(
    public defaultQuestionsService: DefaultQuestionsService,
    public authService: AuthService,
    public questionsService: QuestionsService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.defaultQuestionsService.getQuestions();
    this.defaultQuestionsSub = this.defaultQuestionsService.getQuestionsUpdatedListener()
    .subscribe((questionsData: { questions: Question[]}) => {
      this.questions = questionsData.questions;

      if (this.userId) {
        this.questionsService.getQuestions(this.userId);
        this.userQuestionsSub = this.questionsService.getQuestionsUpdatedListener()
        .subscribe((userQuestionsData: { questions: Question[]}) => {
          this.userQuestions = userQuestionsData.questions;

          this.questions.forEach(question => {
            this.userQuestions.forEach(userQuestion => {
              const questionId = question.id;
              if (question.id === userQuestion.id) {
                this.questionPresence[questionId] = true;
              }
            });
          });
        });
      }
    });
  }

  onAdd(userId: string, questionId: string, questionTitle: string, questionContent: string) {
    this.defaultQuestionsService.addQuestion(userId, questionId, questionTitle, questionContent);
  }

  onDelete(userId: string, questionId: string) {
    this.questionsService.deleteQuestion(userId, questionId);
    console.log('deleted');
  }
}
