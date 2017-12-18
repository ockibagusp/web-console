import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';

import { SupernodeService } from './supernode.service';
import { Supernode } from './supernode.model';
import { Node } from '../nodes/node.model';

import { ModalContentComponent } from '../core/modal.component';

@Component({
    templateUrl: 'node-list.component.html'
})
export class SupernodeNodeComponent {
    public supernode: Supernode;
    public nodes: Node[];
    public breadcrumbs: any[];
    public maxSize = 5;
    public itemsPerPage = 10;
    public currentPage = 1;
    public publicCurrentPage = 1;
    public privateCurrentPage = 1;
    public globalCurrentPage = 1;
    public totalItems: number;
    public activeTab: string;
    // reset subsperdayremain flash info
    public flash_message: string;
    public bsModalRef: BsModalRef;
    private modalSubscriptions: Subscription;

    constructor(private supernodeService: SupernodeService,
                public route: ActivatedRoute,
                public router: Router,
                private modalService: BsModalService) {
    }

    ngOnInit(): void {
        this.activeTab = 'all';
        this.getSupernode();
    }

    private getSupernode(): void {
        this.route.params
            .switchMap((params: Params) => this.supernodeService.getSupernode(params['id']))
            .subscribe(
                supernode => {
                    this.router.navigateByUrl(`/supernodes/view/${supernode.id}/nodes`);
                    this.supernode = supernode as Supernode;
                    this.breadcrumbs = [
                        { label: "Home", url: "/" },
                        { label: "Supernodes", url: "/supernodes/list" },
                        { label: `${supernode.label}'s`, url: `/supernodes/view/${supernode.id}` },
                        { label: 'Nodes', is_active: true }
                    ];
                    this.getNodes();
                },
                error => console.log(error)
            );
    }

    private getNodes(role: string = '', page: number = 1): void {
        this.supernodeService.getNodes(this.supernode.id, role, page)
            .subscribe(
                res => {
                    this.totalItems = res.count;
                    this.nodes = res.results as Node[];
                },
                error => console.log(error)
            );
    }

    public selectTab(tab_id: string) {
        this.router.navigateByUrl(`/supernodes/view/${this.supernode.id}/nodes?visibility=${tab_id}`);
        this.totalItems = 0;
        this.currentPage = 1;
        this.publicCurrentPage = 1;
        this.privateCurrentPage = 1;
        this.globalCurrentPage = 1;
        this.activeTab = tab_id;
        this.getNodes(tab_id);
    }

    public openResetConfirmationModal(node: Node) {
        this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-warning'});
        this.bsModalRef.content.id = node.id;
        this.bsModalRef.content.title = 'Reset Confirmation';
        this.bsModalRef.content.message = 'Are you sure to reset publish per day remaining?';
        // event fired when modal dismissed -> reload sensor data
        this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
            if (!reason && 200 === this.bsModalRef.content.status) {
                this.getNodes(this.activeTab);
                this.flash_message = node.label;
            }
            this.modalSubscriptions.unsubscribe();
        });
    }

    public openDeleteConfirmationModal(supernode: Supernode) {
        this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
        this.bsModalRef.content.id = supernode.id;
        this.bsModalRef.content.url = supernode.url;
        this.bsModalRef.content.title = 'Delete Confirmation';
        this.bsModalRef.content.message = 'Are you sure to perform this action?';
        this.bsModalRef.content.is_delete = true;
        this.bsModalRef.content.is_node = true;
        // event fired when modal dismissed -> reload sensor data
        this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
            if (!reason && 204 === this.bsModalRef.content.status) {
                this.getNodes(this.activeTab);
            }
            this.modalSubscriptions.unsubscribe();
        });
    }

    public pageChanged(event: any): void {
        this.router.navigateByUrl(
            `/supernodes/view/${this.supernode.id}/nodes?visibility=${this.activeTab}&&page=${event.page}`
        );
        this.getNodes(this.activeTab, event.page);
    }
}
