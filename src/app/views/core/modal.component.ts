import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { UserService } from '../users/user.service';
import { SupernodeService } from '../supernodes/supernode.service';
import { NodeService } from '../nodes/node.service';
import { SensorService } from '../nodes/sensor.service';

@Component({
  	selector: 'modal-content',
  	template: `
	    <div class="modal-header">
	      	<h4 class="modal-title pull-left">{{ title }}</h4>
	      	<button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
	        	<span aria-hidden="true">&times;</span>
	      	</button>
	    </div>
	    <div class="modal-body">
		    {{ message }}
	    </div>
	    <div class="modal-footer">
	      	<button type="button" class="btn btn-secondary" (click)="bsModalRef.hide()">No</button>
			<button type="button" class="btn btn-warning" *ngIf="!is_delete" (click)="reset()">Reset</button>
			<button type="button" class="btn btn-danger" *ngIf="is_delete" (click)="delete()">Delete</button>
	    </div>
	`
})
export class ModalContentComponent {
  	public id: string;
  	public title: string;
  	public url: string;
  	public message: string;
    public status: number;
    // in case of reset pubs per day remain, is_delete should be false
  	public is_delete: boolean = false;
    // perform diferent delete action
    public is_supernode: boolean = false;
    public is_node: boolean = false;
  	public is_sensor: boolean = false;
    public is_user: boolean = false;

  	constructor(
  		public bsModalRef: BsModalRef,
        private userService: UserService,
        private supernodeService: SupernodeService,
        private nodeService: NodeService,
        private sensorService: SensorService
    ) {}

  	reset(): void {
  		this.nodeService.reset(this.id)
            .subscribe(
                () => {
                    this.status = 200;
                    this.bsModalRef.hide();
                },
                error => null
            );
  	}

  	delete(): void {
        if (this.is_supernode) {
            this.supernodeService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => null
                );
        } else if(this.is_node) {
            this.nodeService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => null
                );
        } else if(this.is_sensor) {
            this.sensorService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => null
                );
        } else if(this.is_user) {
            this.userService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => null
                );
        }
  	}
}