import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';


import { ModalContentComponent } from '../core/modal.component';

@Component({
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
    public users: User[];
    public maxSize:number = 5;
    public itemsPerPage:number = 10;
    public totalItems:number = 75;
    public currentPage:number = 1;
    public numPages:number = 0;
    public activeTab: string;
    public bsModalRef: BsModalRef;
    public modalSubscriptions: Subscription;

    constructor(
        private userService: UserService,
        private router: Router,
        private modalService: BsModalService
    ) {}

    public ngOnInit() {
        this.activeTab = "admin";
        this.getUsers(this.activeTab);
    }

    private getUsers(type="") {
        this.userService.getUsers(type)
            .subscribe(
                users => this.users = users.results as User[],
                error => console.log(error)
            );
    }

    public selectTab(tab_type: string) {
        this.router.navigateByUrl(`/users/list?role=${tab_type}`);
        this.activeTab = tab_type;
        this.getUsers(tab_type);
    }

    public openDeleteConfirmationModal(user: User) {
        this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
        this.bsModalRef.content.id = user.id;
        this.bsModalRef.content.url = user.url;
        this.bsModalRef.content.title = 'User Delete Confirmation';
        this.bsModalRef.content.message = 'Are you sure to perform this action?';
        this.bsModalRef.content.is_delete = true;
        this.bsModalRef.content.is_user = true;
        // event fired when modal dismissed -> reload sensor data
        this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
              if (!reason && 204 == this.bsModalRef.content.status) {
                  this.getUsers(this.activeTab);
              }
            this.modalSubscriptions.unsubscribe();
        });
    }

    public pageChanged(event:any):void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }
}