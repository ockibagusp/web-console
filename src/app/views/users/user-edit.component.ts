import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    templateUrl: 'user-form.component.html'
})
export class UserEditComponent implements OnInit {
    public user: User;
    public is_new = false;
    public breadcrumbs: any[];

    errors: Array<{ field: string, message: string }>;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.user = new User;
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(params['id']))
            .subscribe(
                user => {
                    this.breadcrumbs = [
                        { label: "Home", url: "/" },
                        { label: "Users", url: "/users/list" },
                        { label: user.username, url: `/users/view/${user.id}` },
                        { label: "Edit", is_active: true }
                    ];
                    this.user = user as User;
                },
                error => console.log(error)
            )
    }

    save(): void {
        this.user.is_admin = this.user.is_admin ? 1 : 0;
        this.userService.save(this.user)
            .subscribe(
                user => this.router.navigate(['/users/view', user.id]),
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
