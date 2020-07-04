import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StoreService } from 'src/app/shared/services/store.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  showSchoolInfo: boolean = false;
  showProject: boolean = false;
  showSkill: boolean = false;
  form: FormGroup;
  user: any;
  userId: string;
  updating: boolean;
  updatingPwd: boolean;
  hide = true;
  constructor(
    private storeService: StoreService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      name: [''],
      pwd: [''],
      email: [''],
      userName: [{ value: '', disabled: true }],
      imageUrl: [''],
      phone: ['']
    });
    this.userId = this.storeService.getUserId;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.get(this.userId).subscribe(payload => {
      if (payload.ok) {
        this.user = payload.data;
        this.form.patchValue(this.user);
      }
    })
  }

  updateInfo() {
    this.updating = true;
    this.userService.update(this.user._id, this.form.value).pipe(finalize(() => this.updating = false)).subscribe(payload => {
      if (payload.ok) {
        this.loadData();
        this.storeService.set('user', this.user);
        this.snackBar.open('Cập nhật thành công', 'Bỏ qua', { duration: 3000 });
      }
    });
  }

  updatePwd() {
    this.updatingPwd = true;
    const body = { pwd: this.form.value.pwd };
    this.userService.updatePwd(this.user._id, body).pipe(finalize(() => this.updatingPwd = false)).subscribe(payload => {
      if (payload.ok) {
        this.loadData();
        this.snackBar.open('Cập nhật mật khẩu thành công', 'Bỏ qua', { duration: 3000 });
      }
    })
  }

}
