import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

import { AgriHub } from '../../global/agrihub';

@Component({
    selector: 'is-auth',
    template: ''
})
export class IsAuthComponent implements OnInit {
    constructor(
        public authenticateService: AuthenticateService
    ) {}

    ngOnInit() {
        if(!this.authenticateService.isAuth()) {
            window.location.href = AgriHub.BASE_URL + 'login';
        }
    }
}

@Component({
    selector: 'is-admin',
    template: ''
})
export class IsAdminComponent implements OnInit {
    constructor(
        public router: Router,
        public authenticateService: AuthenticateService
    ) {}

    ngOnInit() {
        if(!this.authenticateService.isAuth()) {
            window.location.href = AgriHub.BASE_URL + 'login';
        } else if(!this.authenticateService.isAdmin()) {
            this.router.navigateByUrl('/403', { skipLocationChange: true });
        }
    }
}

@Component({
    selector: 'is-researcher',
    template: ''
})
export class IsResearcherComponent implements OnInit {
    constructor(
        public router: Router,
        public authenticateService: AuthenticateService
    ) {}

    ngOnInit() {
        if(!this.authenticateService.isAuth()) {
            window.location.href = AgriHub.BASE_URL + 'login';
        } else if(!this.authenticateService.isResearcher()) {
            this.router.navigateByUrl('/403', { skipLocationChange: true });
        }
    }
}