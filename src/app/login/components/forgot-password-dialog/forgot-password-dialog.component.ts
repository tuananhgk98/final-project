import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  userName : FormControl = new FormControl('');
  loading : boolean;

  ngOnInit(): void {
  }

  forgotPwd(){
    let body = {userName : this.userName.value};
    this.loading = true;
    this.userService.forgotPwd(body).pipe(finalize(() => this.loading = false)).subscribe(payload => {
        if(payload.ok){
          this.snackBar.open('Mật khẩu mới đã được gửi về mail của bạn, vui lòng đổi lại mật khẩu sau khi đăng nhập lại', 'Bỏ qua', {duration: 3000});
        }
    });
  }

  close(){
    
  }
}
