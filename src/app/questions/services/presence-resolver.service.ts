import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { PresenceService } from './presence.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceResolverService implements Resolve<any> {
  userId;
  questionPresence;

  constructor(
    private authService: AuthService,
    private presenceService: PresenceService
  ) {}

  resolve(): Observable<any> {
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.questionPresence = this.presenceService.setPresence(this.userId);
      return this.questionPresence;
    } else {
      return;
    }
  }
}
