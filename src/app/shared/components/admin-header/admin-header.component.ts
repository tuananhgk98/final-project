import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements DoCheck {

  constructor() { }

  routeSnapshot: string[];

  ngDoCheck(): void {
    this.routeSnapshot = window.location.href.split('/');
  }

}
