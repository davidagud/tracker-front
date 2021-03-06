import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ]
})
export class AuthModule {}
