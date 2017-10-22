import { Injectable } from '@angular/core';
import { CredentialsService } from './credentials.service';
import { Router, CanActivate } from '@angular/router'

@Injectable()
export class AuthenticateService {
    constructor(
        private credentialsService: CredentialsService
    ) {}

    isAuth(): boolean {
        var user = JSON.stringify(this.credentialsService.getUser());
        var token = JSON.stringify(this.credentialsService.getToken());
        return !!((undefined !== user && "" !== user) && undefined !== token && "" !== token);
    }

    isAdmin(): boolean {
        if(!this.isAuth()) {
            return false;
        }

        return 1 == this.credentialsService.getUser().is_admin;
    }

    isResearcher(): boolean {
        if(!this.isAuth()) {
            return false;
        } else {
            return 0 == this.credentialsService.getUser().is_admin;
        }
    }
}

@Injectable()
export class BaseCanActivate implements CanActivate {
    constructor(
        public authenticateService: AuthenticateService,
        public router: Router
    ) {}

    canActivate() {
        if (this.authenticateService.isAuth()) {
            return true;
        }
        this.router.navigate(['/page/login']);
        return false;
    }
}

@Injectable() 
export class CanActivateAdmin extends BaseCanActivate {
    constructor(
        public authenticateService: AuthenticateService,
        public router: Router
    ) {
        super(authenticateService, router);
    }

    canActivate() {
        if (this.authenticateService.isAdmin()) {
            return true;
        }
        this.router.navigateByUrl('/page/403', { skipLocationChange: true });
        return false;
    }
}

@Injectable() 
export class CanActivateResearcher extends BaseCanActivate {
    constructor(
        public authenticateService: AuthenticateService,
        public router: Router
    ) {
        super(authenticateService, router);
    }

    canActivate() {
        if (this.authenticateService.isResearcher()) {
            return true;
        }
        this.router.navigateByUrl('/page/403', { skipLocationChange: true });
        return false;
    }
}