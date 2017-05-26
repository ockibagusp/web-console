import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class CredentialsService {
    constructor(
        private cookieService: CookieService
    ) {}

    setUser(user: Object): void {
        this.cookieService.putObject('user', user);
    }

    setToken(token: any): void {
        this.cookieService.putObject('token', token);
    }

    getUser(): any {
        return this.cookieService.getObject('user');
    }

    getToken(): any {
        return this.cookieService.getObject('token');
    }

    deleteAll(): void {
        this.cookieService.removeAll();
    }
}