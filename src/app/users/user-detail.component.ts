import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    moduleId: '../views/users/',
    selector: 'user-detail',
    templateUrl: 'user-detail.tpl.html'
})
export class UserDetailComponent implements OnInit {
    user: User;
    links: any[]; // breadcrumb

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(params['userid']))
            .subscribe(
                user => this.setUpUser(user),
                error => console.log(error)
            )
    }

    edit(): void {
        this.router.navigate(['/users/edit', this.user.id]);
    }

    private setUpUser(user: User): void {
        this.user = user;
        this.links = [
            { label: "Home", url: "/" },
            { label: "Users", url: "/users" },
            { label: this.user.username , is_active: true}
        ];
    }
}