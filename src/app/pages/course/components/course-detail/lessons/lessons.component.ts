import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent {
  isShow: boolean = false;
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {
  }

  showTestCase() {
    this.isShow = true;
  }
  goBack() {
    this.isShow = false;
  }
}

