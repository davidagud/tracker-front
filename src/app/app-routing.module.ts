import { DefaultQuestionsComponent } from './questions/default-questions/default-questions.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DayComponent } from './questions/day/day.component';
import { FormQuestionsResolverService } from './questions/services/form-questions-resolver.service';
import { PresenceResolverService } from './questions/services/presence-resolver.service';

const routes: Routes = [
  { path: '',
    component: DefaultQuestionsComponent,
    canActivate: [AuthGuard],
    resolve: { data: PresenceResolverService}
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'questions/:userId/today',
    component: DayComponent,
    canActivate: [AuthGuard],
    resolve: { data: FormQuestionsResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
