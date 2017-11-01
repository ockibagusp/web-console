import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
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
	public maxSize:number = 5;
	public itemsPerPage:number = 10;
	public currentPage:number = 1;
	public totalItems:number;
	public activeTab:string;
	public bsModalRef: BsModalRef;
	private modalSubscriptions: Subscription;

  	constructor(
        private supernodeService: SupernodeService,
        public route: ActivatedRoute,
        public router: Router,
        private modalService: BsModalService
    ) {}
    
    ngOnInit(): void {
    	this.activeTab = '';
    	this.getSupernode();
    }

    private getSupernode(): void {
    	this.route.params
            .switchMap((params: Params) => this.supernodeService.getSupernode(params['id']))
            .subscribe(
                supernode => {
                    this.supernode = supernode as Supernode;
                    this.getNodes();
                },
                error => console.log(error)
            );
    }

    private getNodes(role:string="", page:number=1): void {
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
		this.activeTab = tab_id;
        this.getNodes(tab_id);
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
      		if (!reason && 204 == this.bsModalRef.content.status) {
      			this.getNodes(this.activeTab);
      		}
    		this.modalSubscriptions.unsubscribe();
	    });
	}

	public pageChanged(event:any):void {
		this.router.navigateByUrl(`/supernodes/list?page=${event.page}`);
		this.getNodes(this.activeTab, event.page);
	}
}