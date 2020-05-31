import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IUser } from '../../interface/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }
  user: IUser;
  ngOnInit(): void {
    this.user = this.storeService.get('user');
  }

  logOut() {
    if (confirm('Bạn thực sự muốn đăng xuất?')) {
      this.storeService.remove('user');
      this.router.navigateByUrl('/login');
    }
  }

}

