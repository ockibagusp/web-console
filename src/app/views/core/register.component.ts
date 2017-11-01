import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';
import {User} from '../users/user.model';
import {AuthenticateService} from './authenticate/authenticate.service';

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    user: User;
    errors: Array<{ field: string, message: string }>;

    constructor(private router: Router,
                private registerService: RegisterService,
                private authenticateService: AuthenticateService) {
    }

    public ngOnInit() {
        if (this.authenticateService.isAuth()) {
            this.router.navigate(['/']);
        }

        this.user = new User;
        this.user.username = 'milea';
        this.user.email = 'milea@example.com';
        this.user.first_name = 'Milea';
        this.user.last_name = 'Adnan Nasution';
    }

    public register(): void {
        this.registerService.register(this.user)
            .then(res => this.router.navigate(['/page/login']))
            .catch(error => this.extractErrors(error))
    }

    private extractErrors(err: any): void {
        const errorsParse = err;
        this.errors = [];
        for (const index in errorsParse) {
            if (errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: errorsParse[index]
                })
            }
        }
    }
}
