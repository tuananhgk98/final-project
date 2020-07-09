import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginService } from 'src/app/login/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      userName: [''],
      pwd: [''],
      phone: [''],
      role: [''],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.loading = true;
    this.loginService.register(this.form.value).pipe(finalize(() => this.loading = false)).subscribe((payload: any) => {
      if (payload.ok) {
        this.snackBar.open('Thêm mới tài khoản học viên thành công', 'Bỏ qua', { duration: 3000 });
        this.navigateToList();
      }
    })
  }

  setValue(control, value){
    this.form.get(control).patchValue(value);
  }

  navigateToList() {
    this.router.navigateByUrl('/admin/user');
  }

}
