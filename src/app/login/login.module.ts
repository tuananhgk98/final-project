import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SharedModule } from '../shared/shared.module';
import { NgxSocialLoginModule } from 'ng8-social-login';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordDialogComponent],
  entryComponents : [ForgotPasswordDialogComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    NgxSocialLoginModule.init(
      {
        google: {
          client_id: '980432911492-mt13je8t7hoqmie1mdilur17ole447m1.apps.googleusercontent.com'
        }
      }
    )
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginModule { }
