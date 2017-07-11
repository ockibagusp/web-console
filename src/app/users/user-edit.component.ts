import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    moduleId: '../views/users/',
    selector: 'user-edit',
    templateUrl: 'user-form.tpl.html'
})
export class UserEditComponent implements OnInit {
    user: User;
    links: any[];

    errors: Array<{ field: string, message: string }>;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.user = new User;
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(params['userid']))
            .subscribe(
                user => this.setUpUser(user),
                error => console.log(error)
            )
    }

    save(): void {
        this.user.is_admin = this.user.is_admin ? 1: 0; 
        this.userService.save(this.user)
            .subscribe(
                user => this.router.navigate(['/users/view', user.id]),
                error => this.extractErrors(error)
            );
    }

    delete(): void {
        if(confirm("Are you sure?")) {
            this.userService.delete(this.user.url)
                .subscribe(
                    () => this.router.navigate(['/users/']),
                    error => this.extractErrors(error)
                );
        }
    }

    private setUpUser(user: User) {
        this.user = user as User;
        this.links = [
            { label: "Home", url: "/" },
            { label: "Users", url: "/users/" },
            { label: this.user.username, url: `/users/view/${user.id}` },
            { label: "Edit", is_active: true }
        ];
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