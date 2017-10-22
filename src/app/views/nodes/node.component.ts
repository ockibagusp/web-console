import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';

import { NodeService } from './node.service';
import { Node } from './node.model';

import { ModalContentComponent } from '../core/modal.component';

@Component({
    templateUrl: 'node.component.html'
})
export class NodeComponent {
	public nodes: Node[];
	public maxSize:number = 5;
	public itemsPerPage:number = 10;
	public totalItems:number = 75;
	public currentPage:number = 1;
	public numPages:number = 0;
	public activeTab:string;
	public bsModalRef: BsModalRef;
	private modalSubscriptions: Subscription;

  	constructor(
        private nodeService: NodeService,
        public router: Router,
        private modalService: BsModalService
    ) {}
    
    ngOnInit(): void {
    	this.activeTab = '';
        this.getNodes();
    }

    private getNodes(role: string=""): void {
        this.nodeService.getNodes(role)
            .subscribe(
                res => this.nodes = res.results as Node[],
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
      		if (!reason && 204 == this.bsModalRef.content.status) {
      			this.getNodes(this.activeTab);
      		}
    		this.modalSubscriptions.unsubscribe();
	    });
	}

	public pageChanged(event:any):void {
	    console.log('Page changed to: ' + event.page);
	    console.log('Number items per page: ' + event.itemsPerPage);
	}
}