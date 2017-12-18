import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalContentComponent } from '../core/modal.component';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { SupernodeService } from './supernode.service';
import { SensorService } from './sensor.service';
import { Supernode } from './supernode.model';
import { Sensor } from './sensor.model';
import { CredentialsService } from '../core/authenticate/credentials.service';

import { ModalSensorFormComponent } from '../shared/modalsensorform.component';

@Component({
    templateUrl: 'supernode-detail.component.html'
})
export class SupernodeDetailComponent implements OnInit {
    supernode: Supernode;
    sensors: Sensor[];

    public breadcrumbs: any[];
    public bsModalRef: BsModalRef;
    public modalSubscriptions: Subscription;

    constructor(private route: ActivatedRoute,
                private supernodeService: SupernodeService,
                private sensorService: SensorService,
                private credentialsService: CredentialsService,
                private router: Router,
                private modalService: BsModalService) {
    }

    ngOnInit() {
        this.getSupernode();
    }

    private getSupernode() {
        this.route.params
            .switchMap((params: Params) => this.supernodeService.getSupernode(params['id']))
            .subscribe(
                supernode => {
                    this.supernode = supernode as Supernode;
                    this.breadcrumbs = [
                        { label: "Home", url: "/" },
                        { label: "Supernodes", url: "/supernodes/list" },
                        { label: supernode.label, is_active: true }
                    ];
                    this.getSupernodeSensor();
                },
                error => console.log(error)
            );
    }

    private getSupernodeSensor(page=1) {
        this.sensorService.getSensors(this.supernode.id)
            .subscribe(
                sensors => this.sensors = sensors.results as Sensor[]
            )
    }

    public openDeleteConfirmationModal(sensor = null) {
        this.bsModalRef = this.modalService.show(ModalContentComponent, {'class': 'modal-danger'});
        this.bsModalRef.content.title = 'Delete Confirmation';
        this.bsModalRef.content.message = 'Are you sure to perform this action?';
        this.bsModalRef.content.is_delete = true;
        this.bsModalRef.content.is_supernode = true;
        this.bsModalRef.content.id = this.supernode.id;
        this.bsModalRef.content.url = this.supernode.url;
        this.bsModalRef.content.is_node = true;
        if (null != sensor) {
            this.bsModalRef.content.id = sensor.id;
            this.bsModalRef.content.url = sensor.url;
            this.bsModalRef.content.is_sensor = true;
            // event fired when modal dismissed -> reload sensor data
            this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
                if (!reason && 204 === this.bsModalRef.content.status) {
                    this.router.navigateByUrl(`/supernodes/view/${this.supernode.id}?sensor-page=1`);
                    this.getSupernodeSensor();
                }
                this.modalSubscriptions.unsubscribe();
            });
        } else {
            // event fired when modal dismissed -> navigate to nodes/list
            this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
                if (!reason && 204 === this.bsModalRef.content.status) {
                    this.router.navigate(['/supernodes/list']);
                }
                this.modalSubscriptions.unsubscribe();
            });
        }
    }

    public openSensorFormModal(sensor = null) {
        this.bsModalRef = this.modalService.show(ModalSensorFormComponent, {'class': 'modal-primary'});
        this.bsModalRef.content.title = (sensor ? 'Edit' : 'New') + ' Sensor Form';
        this.bsModalRef.content.supernode = this.supernode;
        this.bsModalRef.content.is_supernode = true;
        const _sensor = new Sensor();
        // is modal form action is update
        if (sensor) {
            /*
             * create new sensor instance from existing obj,
             * avoid referring the same object in sensors list table
             */
            _sensor.id = sensor.id;
            _sensor.url = sensor.url;
            _sensor.label = sensor.label;
            _sensor.subscriptions_list = sensor.subscriptions_list;
        }
        this.bsModalRef.content.sensor = _sensor;
        // event fired when modal dismissed -> reload sensor data
        this.modalSubscriptions = this.modalService.onHidden.subscribe((reason: string) => {
            if (!reason && 201 === this.bsModalRef.content.status) {
                this.getSupernodeSensor();
            }
            this.modalSubscriptions.unsubscribe();
        });
    }
}
