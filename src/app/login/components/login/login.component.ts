import { Component, OnInit } from '@angular/core';

//service
import { LoginService } from '../../services/login.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router
  ) { }

  userName: string = '';
  pwd: string = '';
  fullName = '';

  ngOnInit(): void {
  }

  login() : void {
    this.loginService.login(this.userName, this.pwd).subscribe((data: any) => {
      this.fullName = data.FullName;
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('access_user', JSON.stringify(data));
      this.router.navigateByUrl('/pages/home');
    }, null, () => this.alertService.changeMessage({
      color: 'green',
      text: `Xin chào ${this.fullName}`
    }));
  }

}
