import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IUser } from '../../interface/user.interface';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private storeService: StoreService,
    private loginService: LoginService,
    private router: Router
  ) { }
  user: IUser;
  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user: IUser) => {
      this.user = user ? user : this.storeService.get('user');
    });
  }

  logOut() {
    if (confirm('Bạn thực sự muốn đăng xuất?')) {
      this.storeService.remove('user');
      this.router.navigateByUrl('/login');
    }
  }

}

