import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from './user.service';
import {User} from './user.model';

@Component({
    templateUrl: 'user-form.component.html'
})
export class UserNewComponent implements OnInit {
    is_new = true;
    user: User;
    links: any[];

    errors: Array<{ field: string, message: string }>;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.user = new User;
        // initial for example purpose
        this.user.username = 'milea';
        this.user.email = 'milea@example.com';
        this.user.first_name = 'Milea Adnan';
        this.user.last_name = 'Nasution';
        this.user.is_admin = 0;
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
        const errorsParse = JSON.parse(err._body);
        this.errors = [];
        for (const index in errorsParse) {
            if (errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ?
                        errorsParse[index] : errorsParse[index][0]
                })
            }
        }
    }
}
