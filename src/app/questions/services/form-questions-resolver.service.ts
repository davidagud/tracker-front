import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root'
})
export class FormQuestionsResolverService implements Resolve<any> {
  private userId: string;

  constructor(private questionsService: QuestionsService, private authService: AuthService) {}

  resolve(): Observable<any> {
    this.userId = this.authService.getUserId();

    return this.questionsService.getQuestionsPreSubscribe(this.userId);
  }
}
