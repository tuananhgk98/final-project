import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  showSchoolInfo: boolean = false;
  showProject: boolean = false;
  showSkill: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }



}
