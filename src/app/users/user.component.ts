import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    moduleId: '../views/users/',
    selector: 'users',
    templateUrl: 'user.tpl.html'
})
export class UserComponent implements OnInit {
    users: User[];
    links: any[]; // breadcrumb

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.links = [
            { label: "Home", url: "/" },
            { label: "Users", url: "/users" , is_active: true}
        ]
        this.getUsers("admin");
    }

    getUsers(type="") {
        this.userService.getUsers(type)
            .subscribe(
                users => this.users = users.results as User[],
                error => console.log(error)
            );
    }

    tabChange($event: NgbTabChangeEvent): void {
        this.router.navigateByUrl(`/users?type=${$event.nextId}`);
        this.getUsers($event.nextId);
    }
}