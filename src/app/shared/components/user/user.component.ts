import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IUser } from '../../interface/user.interface';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private storeService: StoreService,
    private loginService: LoginService,
    private router: Router,
    private snackBar : MatSnackBar,
    private fb : FormBuilder
  ) {
    this.user = this.storeService.getUser;
   }
  user: any;
  form : FormGroup;
  
  ngOnInit(): void {
  
  }

  logOut() {
    if (confirm('Bạn thực sự muốn đăng xuất?')) {
      this.storeService.remove('user');
      this.router.navigateByUrl('/login');
    }
  }

}

