import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Question } from '../question.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  form: FormGroup;
  userId: string;
  userQuestions = [];
  private questionsSub: Subscription;

  constructor(public questionsService: QuestionsService, public authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();

    this.questionsService.getQuestions(this.userId);
    this.questionsSub = this.questionsService.getQuestionsUpdatedListener().subscribe((questionsData: { questions: Question[]}) => {
      this.userQuestions = questionsData.questions;
    });
  }

  onSaveDay() {}

}
