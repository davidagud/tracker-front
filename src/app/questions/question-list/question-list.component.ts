import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  userIsAuthenticated = false;
  userId: string;
  private questionsSub: Subscription;

  constructor(public questionsService: QuestionsService, public authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.questionsService.getQuestions();
    this.questionsSub = this.questionsService.getQuestionsUpdatedListener().subscribe((questionsData: { questions: Question[]}) => {
      this.questions = questionsData.questions;
    });
  }

  onAdd(userId, questionId, questionTitle, questionContent) {
    this.questionsService.addQuestion(userId, questionId, questionTitle, questionContent);
  }

}
