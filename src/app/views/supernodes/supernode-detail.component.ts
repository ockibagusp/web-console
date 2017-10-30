import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalContentComponent } from '../core/modal.component';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { SupernodeService } from './supernode.service';
import { Supernode } from './supernode.model';
import { CredentialsService } from '../core/authenticate/credentials.service';

@Component({
	templateUrl: 'supernode-detail.component.html'
}) 
export class SupernodeDetailComponent implements OnInit {
	supernode: Supernode;
	public bsModalRef: BsModalRef;
	public modalSubscriptions: Subscription;

    constructor(
        private route: ActivatedRoute,
        private supernodeService: SupernodeService,
        private credentialsService: CredentialsService,
        private router: Router,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.getSupernode();
    }

    private getSupernode() {
    	this.route.params
            .switchMap((params: Params) => this.supernodeService.getSupernode(params['id']))
            .subscribe(
                supernode => this.supernode = supernode as Supernode,
                error => console.log(error)
            );
    }

	public openDeleteConfirmationModal() {
	    this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
	    this.bsModalRef.content.title = 'Delete Confirmation';
	    this.bsModalRef.content.message = 'Are you sure to perform this action?';
	    this.bsModalRef.content.is_delete = true;
        this.bsModalRef.content.is_supernode = true;
	    this.bsModalRef.content.id = this.supernode.id;
	    this.bsModalRef.content.url = this.supernode.url;
        this.bsModalRef.content.is_node = true;
	    // event fired when modal dismissed -> navigate to nodes/list
	    this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
      		if (!reason && 204 == this.bsModalRef.content.status) {
      			this.router.navigate(['/supernodes/list']);
      		}
    		this.modalSubscriptions.unsubscribe();
	    });
	    
	}
}

interface Errors {
    field: string,
    message: string
}