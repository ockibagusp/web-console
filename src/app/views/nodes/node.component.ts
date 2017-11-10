import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {Subscription} from 'rxjs/Subscription';

import {NodeService} from './node.service';
import {Node} from './node.model';

import {ModalContentComponent} from '../core/modal.component';

@Component({
    templateUrl: 'node.component.html'
})
export class NodeComponent implements OnInit {
    public nodes: Node[];
    public maxSize = 5;
    public itemsPerPage = 10;
    public totalItems: number;
    public currentPage = 1;
    public numPages = 0;
    public activeTab: string;
    // reset subsperdayremain flash info
    public flash_message: string;
    public bsModalRef: BsModalRef;
    private modalSubscriptions: Subscription;


    constructor(private nodeService: NodeService,
                public router: Router,
                private modalService: BsModalService) {
    }

    ngOnInit(): void {
        this.activeTab = '';
        this.getNodes();
    }

    private getNodes(role: string = '', page: number = 1): void {
        this.nodeService.getNodes(role, page)
            .subscribe(
                res => {
                    this.totalItems = res.count;
                    this.nodes = res.results as Node[];
                },
                error => console.log(error)
            );
    }

    public selectTab(tab_id: string) {
        this.router.navigateByUrl(`/nodes/list?visibility=${tab_id}`);
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

    public openDeleteConfirmationModal(node: Node) {
        this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
        this.bsModalRef.content.id = node.id;
        this.bsModalRef.content.url = node.url;
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
        this.router.navigateByUrl(`/nodes/list?visibility=${this.activeTab}&&page=${event.page}`);
        this.getNodes(this.activeTab, event.page);
    }
}
