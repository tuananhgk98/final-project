import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }

  logout() {
    confirm('Bạn có thực sự muốn đăng xuất không?') == true && this.router.navigateByUrl('/login');
  }

}

