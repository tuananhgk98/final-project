import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBaz: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      userName: [null, Validators.required],
      pwd: [null, Validators.required],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      imageUrl: [''],
      email : [null, Validators.required]
    });
  }

  registerForm: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
  }

  register() {
    this.isLoading = true;
    this.loginService.register(this.registerForm.value).pipe(finalize(() => this.isLoading = false)).subscribe(data => {
      if (data.ok) {
        this.snackBaz.open(data.msg, 'bỏ qua', { duration: 3000 });
        this.router.navigateByUrl('/login');
      } else { this.snackBaz.open(data.msg, 'bỏ qua', { duration: 3000 }); }
    }, err => {
      this.snackBaz.open('Đã có lỗi xảy ra, vui lòng thử lại sau', 'bỏ qua', { duration: 3000 });
    });
  }

}
