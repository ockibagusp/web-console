import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';

import { SupernodeService } from './supernode.service';
import { Supernode } from './supernode.model';

import { ModalContentComponent } from '../core/modal.component';

@Component({
    templateUrl: 'supernode.component.html'
})
export class SupernodeComponent implements OnInit {
    public supernodes: Supernode[];
    public breadcrumbs: any[];
    public maxSize = 5;
    public itemsPerPage = 10;
    public currentPage = 1;
    public totalItems: number;
    public bsModalRef: BsModalRef;
    private modalSubscriptions: Subscription;

    constructor(private supernodeService: SupernodeService,
                public router: Router,
                private modalService: BsModalService) {
    }

    ngOnInit(): void {
        this.breadcrumbs = [
            { label: "Home", url: "/" },
            { label: "Supernodes", url: "/supernodes/list"},
            { label: "List", is_active: true }
        ];
        this.getSupernodes();
    }

    private getSupernodes(page: number = 1): void {
        this.supernodeService.getSupernodes(page)
            .subscribe(
                res => {
                    this.totalItems = res.count;
                    this.supernodes = res.results as Supernode[];
                },
                error => console.log(error)
            );
    }

    public openDeleteConfirmationModal(supernode: Supernode) {
        this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
        this.bsModalRef.content.id = supernode.id;
        this.bsModalRef.content.url = supernode.url;
        this.bsModalRef.content.title = 'Delete Confirmation';
        this.bsModalRef.content.message = 'Are you sure to perform this action?';
        this.bsModalRef.content.is_delete = true;
        this.bsModalRef.content.is_supernode = true;
        // event fired when modal dismissed -> reload sensor data
        this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
            if (!reason && 204 === this.bsModalRef.content.status) {
                this.router.navigateByUrl('/supernodes/list');
                this.getSupernodes();
            }
            this.modalSubscriptions.unsubscribe();
        });
    }

    public pageChanged(event: any): void {
        this.router.navigateByUrl(`/supernodes/list?page=${event.page}`);
        this.getSupernodes(event.page);
    }
}
