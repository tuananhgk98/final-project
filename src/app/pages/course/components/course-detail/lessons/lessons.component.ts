import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  isShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  showTestCase() {
    this.isShow = true;
  }
}
