import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { DefaultQuestionsComponent } from './questions/default-questions/default-questions.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResponsesComponent } from './questions/responses/responses.component';
import { DynamicFormComponent } from './questions/form/dynamic-form/dynamic-form.component';

import { FormQuestionsResolverService } from './questions/services/form-questions-resolver.service';
import { PresenceResolverService } from './questions/services/presence-resolver.service';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '',
    component: HomePageComponent
  },
  { path: 'edit',
    component: DefaultQuestionsComponent,
    canActivate: [AuthGuard],
    resolve: { data: PresenceResolverService}
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'questions/:userId/today',
    component: DynamicFormComponent,
    canActivate: [AuthGuard],
    resolve: { data: FormQuestionsResolverService, presenceData: PresenceResolverService }
  },
  { path: 'responses/:userId',
    component: ResponsesComponent,
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
