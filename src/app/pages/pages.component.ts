import { Component } from '@angular/core';

@Component({
    selector: 'app-pages',
    styleUrls: ['pages.component.scss'],
    // template: `
    // <div class="d-flex">
    //     <div class="menuLeft"><app-menu-bar></app-menu-bar></div>
    //     <div class="main"><router-outlet></router-outlet></div>
    //     <app-notifications></app-notifications>
    // </div>
    // `
    template: `
    <div class="d-flex main-page">
        <div class="main-page-content">
            <app-menu-bar></app-menu-bar>
            <div class="user-login">
                <app-user></app-user>
            </div>
            <div class="main-page-table">
                <router-outlet></router-outlet>
            </div>
            <app-notifications></app-notifications>
        </div>
    </div>
    `
})

export class PagesComponent {

}