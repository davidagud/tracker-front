import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  { providedIn: 'root' }
)
export class UserAnswersService {
  returnedDayResponse;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  submitAnswers(formResponse) {
    this.http.put<{message: string}>(BACKEND_URL + 'submit', formResponse)
      .subscribe((responseData) => {
        if (responseData.message == 'Updated day entry successfully') {
          this.snackBar.open('Successfully saved responses', 'Dismiss', {duration: 3000});
        }
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
