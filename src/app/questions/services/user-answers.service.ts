import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  { providedIn: 'root' }
)
export class UserAnswersService {
  returnedDayResponse;

  constructor(private http: HttpClient) {}

  submitAnswers(formResponse) {
    console.log('UAS', formResponse);
    this.http.put<{message: string}>(BACKEND_URL + 'submit', formResponse)
      .subscribe((responseData) => {
        console.log('Response message:', responseData.message);
      });
  }

  getDayResponse(userId, date) {
    return this.http.get<{message: string, day: object}>(BACKEND_URL + userId + '/' + date).toPromise().then(result => {
      return result.day;
    })
    .catch(err => {
      return null;
    });
  }


}
