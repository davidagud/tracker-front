import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  userId: string;
  questions: Question[] = [];
  private questionsSub: Subscription;

  constructor(public questionsService: QuestionsService, public authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();

    this.questionsService.getQuestions(this.userId);
    this.questionsSub = this.questionsService.getQuestionsUpdatedListener().subscribe((questionsData: { questions: Question[]}) => {
      this.questions = questionsData.questions;
    });
  }

}
