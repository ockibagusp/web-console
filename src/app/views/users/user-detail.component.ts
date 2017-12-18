import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalContentComponent} from '../core/modal.component';
import {Subscription} from 'rxjs/Subscription';

import {UserService} from './user.service';
import {User} from './user.model';

@Component({
    templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
    public user: User;
    public breadcrumbs: any[];

    public bsModalRef: BsModalRef;
    public modalSubscriptions: Subscription;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private modalService: BsModalService) {
    }

    public ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(params['id']))
            .subscribe(
                user => {
                    this.breadcrumbs = [
                        { label: "Home", url: "/" },
                        { label: "Users", url: "/users/list" },
                        { label: user.username, is_active: true }
                    ];
                    this.user = user as User;
                },
                error => console.log(error)
            )
    }

    public openDeleteConfirmationModal() {
        this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
        this.bsModalRef.content.id = this.user.id;
        this.bsModalRef.content.url = this.user.url;
        this.bsModalRef.content.title = 'User Delete Confirmation';
        this.bsModalRef.content.message = 'Are you sure to perform this action?';
        this.bsModalRef.content.is_delete = true;
        this.bsModalRef.content.is_user = true;
        // event fired when modal dismissed -> reload sensor data
        this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
            if (!reason && 204 === this.bsModalRef.content.status) {
                this.router.navigate(['/users/list']);
            }
            this.modalSubscriptions.unsubscribe();
        });
    }
}
