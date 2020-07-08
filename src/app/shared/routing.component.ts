import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-routing-cpn',
    template: ''
})

export class RoutingComponent {

    constructor(
        private storeService: StoreService,
        private router: Router
    ) { 
        switch (this.storeService.getRole) {
            case 'user':
                this.router.navigateByUrl('/pages');
                break;
            case 'admin':
                this.router.navigateByUrl('/admin');
                break;
        }
    }
    }
