import { Component, OnInit, DoCheck } from '@angular/core';

import { menuItem } from './menu-item';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit, DoCheck {

  constructor() {
    this.menuItem = menuItem;
  }

  splitedUrl: Array<string>;
  menuItem: Array<object>;


  ngDoCheck() {
    this.splitedUrl = window.location.href.split('/');
  }

  ngOnInit(): void {
    this.splitedUrl = window.location.href.split('/');
  }

}
