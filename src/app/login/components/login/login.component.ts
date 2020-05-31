import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

//service
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { StoreService } from '../../../shared/services/store.service';
import { SocialLoginService, Provider } from 'ng8-social-login';
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
    private socialLogin: SocialLoginService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  loginForm: FormGroup;
  isLoading: boolean;

  login() {
    this.isLoading = true;
    this.loginService.login(this.loginForm.value).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      this.storeService.set('user', res.data);
      this.router.navigateByUrl('/pages/course');
      this.snackBar.open(`Xin chào ${res.data.name}`, 'Bỏ qua', { duration: 3000 })
    });
  }

  loginWithGoogle() {
    this.socialLogin.login(Provider.GOOGLE).subscribe(user => {
      console.log(user);
    });
  }
}
