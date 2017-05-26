import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { User } from '../../users/user.model';
import { AuthenticateService } from '../authenticate/authenticate.service';

@Component({
    moduleId: '../views/core/register/',
    selector: 'register',
    templateUrl: 'register.tpl.html',
    styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
    user: User;
    errors: Array<{field: string, message: string}>

    constructor(
        private router: Router, 
        private registerService: RegisterService,
        private authenticateService: AuthenticateService
    ) {}

    ngOnInit() {
        if (this.authenticateService.isAuth()) {
            this.router.navigate(['/']);
        }

        this.user = new User;
        this.user.username = 'milea';
        this.user.email = 'milea@example.com';
        this.user.first_name = 'Milea';
        this.user.last_name = 'Adnan Nasution';
    }

    register(): void {
        this.registerService.register(this.user)
            .then(res => this.router.navigate(['/login']))
            .catch(error => this.extractErrors(error))
    } 

    private extractErrors(err: any): void {
        let errorsParse = err;
        this.errors = [];
        for(let index in errorsParse) {
            if(errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: errorsParse[index]
                })
            }
        }
    }

    public closeAlert(alert: any) {
        const index: number = this.errors.indexOf(alert);
        this.errors.splice(index, 1);
    }
}