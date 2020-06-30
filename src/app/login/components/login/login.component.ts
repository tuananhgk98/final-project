import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

//service
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { StoreService } from '../../../shared/services/store.service';
import { SocialLoginService, Provider } from 'ng8-social-login';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private storeService: StoreService,
    private socialLogin: SocialLoginService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  loginForm: FormGroup;
  loading: boolean;

  login() {
    this.loading = true;
    this.loginService.login(this.loginForm.value).pipe(
      finalize(() => this.loading = false)
    ).subscribe(payload => {
      if (payload.ok) {
        this.storeService.set('user', payload.data);
        this.router.navigateByUrl('/pages/course');
        this.snackBar.open(`Xin chào ${payload.data.name}`, 'Bỏ qua', { duration: 3000 });
      }
      else {
        this.snackBar.open(`Sai tên tk hoặc mật khẩu, vui lòng thử lại`, 'Bỏ qua', { duration: 3000 });
      }
    });
  }

  loginWithGoogle() {
    this.socialLogin.login(Provider.GOOGLE).subscribe(user => {
      console.log(user);
    });
  }

  forgotPwd() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent,
      {
        maxWidth: '95vw',
        width: '500px'
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
