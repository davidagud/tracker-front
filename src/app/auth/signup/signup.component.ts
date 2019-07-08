import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.password !== form.value.passwordCheck) {
      this.snackBar.open('Passwords don\'t match.', 'Dismiss', {duration: 3000});
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }

}
