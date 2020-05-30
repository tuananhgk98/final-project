import { Component } from '@angular/core';

@Component({
    selector: 'app-pages',
    styleUrls: ['pages.component.scss'],
    template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <div>
    <app-user></app-user>
    </div>
    `
})

export class PagesComponent {

}