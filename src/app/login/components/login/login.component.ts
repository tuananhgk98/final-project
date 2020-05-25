import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

//service
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  loginForm: FormGroup;
  fullName = '';
  isLoading = true;

  login() {
    console.log(this.loginForm.value);
    this.snackBar.open('Xin chao', 'Bo qua', { duration: 3000 });
  }
}
