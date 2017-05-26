import { Injectable } from '@angular/core';
import { CredentialsService } from './credentials.service';

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