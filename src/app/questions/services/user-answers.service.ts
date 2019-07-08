import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  { providedIn: 'root' }
)
export class UserAnswersService {
  returnedDayResponse;

  constructor(private http: HttpClient) {}

  submitAnswers(formResponse) {
    this.http.put<{message: string}>(BACKEND_URL + 'submit', formResponse)
      .subscribe((responseData) => {
      });
  }

  getDayResponse(userId, date) {
    return this.http.get<{message: string, day: object}>(BACKEND_URL + userId + '/' + date).toPromise().then(result => {
      return result.day;
    })
    .catch(() => {
      return null;
    });
  }
}
