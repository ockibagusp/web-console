import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './core/authenticate/authenticate.service';

import '../assets/css/bootstrap.min.css';

@Component({
    selector: 'main-app',
    template: ''
})
export class MainAppComponent {
    constructor(
        private router: Router,
        private authenticateService: AuthenticateService
    ) {}

    ngOnInit() {
        if(!this.authenticateService.isAuth()) {
            this.router.navigate(['/login']);
        } else if(this.authenticateService.isAdmin()) {
            this.router.navigate(['/users']);
        } else if(this.authenticateService.isResearcher()) {
            this.router.navigate(['/nodes']);
        }
    }
}

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
