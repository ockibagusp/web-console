import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalContentComponent } from '../core/modal.component';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { NodeService } from './node.service';
import { SensorService } from './sensor.service';
import { Node } from '../nodes/node.model';
import { Sensor } from './sensor.model';
import { CredentialsService } from '../core/authenticate/credentials.service';

@Component({
	templateUrl: 'node-detail.component.html'
}) 
export class NodeDetailComponent implements OnInit {
	node: Node;
	sensors: Sensor[];
  is_mine: boolean; // 'edit' button visibility
	public bsModalRef: BsModalRef;
	public modalSubscriptions: Subscription;

    constructor(
        private route: ActivatedRoute,
        private nodeService: NodeService,
        private sensorService: SensorService,
        private credentialsService: CredentialsService,
        private router: Router,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.getNode();
        this.getSensors();
    }

    private getNode() {
    	this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['id']))
            .subscribe(
                node => this.setUpNode(node),
                error => console.log(error)
            );
    }
    
    private getSensors() {
        this.route.params
            .switchMap((params: Params) => this.sensorService.getSensors(params['id']))
            .subscribe(
                sensors => this.sensors = sensors.results as Sensor[],
                error => console.log(error)
            );
    }

    private setUpNode(node: Node): void {
        this.node = node;
        // show 'edit' button only when node is owned by this auth user
        this.is_mine = (node.user == this.credentialsService.getUser().username) ?
            true: false;
    }

  	public openResetConfirmationModal() {
	    this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-warning'});
	    this.bsModalRef.content.id = this.node.id;
	    this.bsModalRef.content.title = 'Reset Confirmation';
	    this.bsModalRef.content.message = 'Are you sure to reset publish per day remaining?';
	}

	public openDeleteConfirmationModal(sensor = null) {
	    this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
	    this.bsModalRef.content.title = 'Delete Confirmation';
	    this.bsModalRef.content.message = 'Are you sure to perform this action?';
	    this.bsModalRef.content.is_delete = true;
	    if (null != sensor) {
	    	this.bsModalRef.content.id = sensor.id;
	    	this.bsModalRef.content.url = sensor.url;
	    	this.bsModalRef.content.is_sensor = true;
	    	// event fired when modal dismissed -> reload sensor data
		    this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
	      		if (!reason && 204 == this.bsModalRef.content.status) {
	      			this.getSensors();
	      		}
	    		this.modalSubscriptions.unsubscribe();
		    });
	    } else {
		    this.bsModalRef.content.id = this.node.id;
		    this.bsModalRef.content.url = this.node.url;
            this.bsModalRef.content.is_node = true;
		    // event fired when modal dismissed -> navigate to nodes/list
		    this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
	      		if (!reason && 204 == this.bsModalRef.content.status) {
	      			this.router.navigate(['/nodes/list']);
	      		}
	    		this.modalSubscriptions.unsubscribe();
		    });
	    }
	}

	public openSensorFormModal() {
	    this.bsModalRef = this.modalService.show(ModalSensorFormComponent, {'class': 'modal-primary'});
	    this.bsModalRef.content.title = 'New Sensor Form';
	    this.bsModalRef.content.node = this.node;
	    // event fired when modal dismissed -> reload sensor data
	    this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
      		if (!reason && 201 == this.bsModalRef.content.status) {
      			this.getSensors();
      		}
    		this.modalSubscriptions.unsubscribe();
	    });
	}
}

interface Errors {
    field: string,
    message: string
}

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
	    	<p *ngFor="let error of errors">
	            <alert [type]="'danger'" dismissible="true">
	                <strong>{{ error.field }}:</strong> {{ error.message }}
	            </alert>
	        </p>
		    <form class="form-horizontal">
				<div class="form-group">
			        <label for="label">Label</label>
			        <input type="text" name="label" class="form-control" [(ngModel)]="sensor.label" 
							placeholder="Enter Node Label..">
		      	</div>
		    </form>
	    </div>
	    <div class="modal-footer">
	      	<button type="button" class="btn btn-secondary" (click)="bsModalRef.hide()">Cancel</button>
			<button type="button" class="btn btn-primary" (click)="save()">Save</button>
	    </div>
	`
})
export class ModalSensorFormComponent {
  	public title: string;
  	public node: Node;
  	public sensor: Sensor = new Sensor;
  	public status: number;
  	public errors: Errors[];
  	constructor(
  		private router: Router,
  		public bsModalRef: BsModalRef,
  		public sensorService: SensorService
  	) {}

  	save(): void {
  		this.sensorService.save(this.node, this.sensor)
                .subscribe(
                    () => {
                    	this.status = 201;
                        this.bsModalRef.hide();
                    },
                    error => this.extractErrors(error)
                );
  	}

  	private extractErrors(err: any): void {
        let errorsParse = JSON.parse(err._body);
        this.errors = [];
        for(let index in errorsParse) {
            if(errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ? 
                        errorsParse[index]: errorsParse[index][0]
                })
            }
        }
    }
}