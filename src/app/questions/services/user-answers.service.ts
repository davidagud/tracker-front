import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.apiUrl + '/questions/';

@Injectable(
  { providedIn: 'root' }
)
export class UserAnswersService {

  constructor(private http: HttpClient) {}

  submitAnswers(formResponse) {
    console.log('UAS', formResponse);
    this.http.put<{message: string}>(BACKEND_URL + 'submit', formResponse)
      .subscribe((responseData) => {
        console.log('Response message:', responseData.message);
      });
  }
}
