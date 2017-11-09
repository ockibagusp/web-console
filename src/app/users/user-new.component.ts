import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';


@Component({
    moduleId: '../views/users/',
    selector: 'user-new',
    templateUrl: 'user-form.tpl.html'
})
export class UserNewComponent implements OnInit {
    is_new: boolean = true;
    user: User;
    links: any[];

    errors: Array<{ field: string, message: string }>;

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.links = [
            { label: "Home", url: "/" },
            { label: "Users", url: "/users/" },
            { label: "New", is_active: true }
        ];
        this.user = new User;
    }

    save() {
        this.user.is_admin = this.user.is_admin ? 1 : 0; 
        this.userService.save(this.user)
            .subscribe(
                () => this.router.navigate(['/users']),
                error => this.extractErrors(error)
            );
    }

    private extractErrors(err: any): void {
        let errorsParse = JSON.parse(err._body);
        this.errors = [];
        for(let index in errorsParse) {
            if(errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ? 
                        errorsParse[index]: errorsParse[index][0]
                })
            }
        }
    }

    public closeAlert(alert: any) {
        const index: number = this.errors.indexOf(alert);
        this.errors.splice(index, 1);
    }
}