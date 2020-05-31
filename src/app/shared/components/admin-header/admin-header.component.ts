import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor() { }

  routeSnapshot: string[];

  ngOnInit(): void {
    this.routeSnapshot = window.location.href.split('/');
  }

}
