import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { SensorService as SN_SensorService } from '../supernodes/sensor.service';
import { Supernode } from '../supernodes/supernode.model';
import { SensorService } from '../nodes/sensor.service';
import { Node } from '../nodes/node.model';
import { Sensor } from '../nodes/sensor.model';

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
            <button [disabled]="!sensor.label" type="button" class="btn btn-primary" (click)="save()">Save</button>
        </div>
    `
})
export class ModalSensorFormComponent {
    public title: string;
    public supernode: Supernode;
    public node: Node;
    public sensor: Sensor = new Sensor;
    public status: number;
    public errors: Errors[];

    public is_supernode: false;
    public is_node: false;

    constructor(private router: Router,
        public bsModalRef: BsModalRef,
        public sensorService: SensorService,
        public sn_sensorService: SN_SensorService) {
    }

    save(): void {
        if (this.is_supernode) {
            this.sn_sensorService.save(this.supernode, this.sensor)
                .subscribe(
                    () => this.setStatusAndHide(),
                    error => this.extractErrors(error)
                );
        } else if (this.is_node) {
            this.sensorService.save(this.node, this.sensor)
                .subscribe(
                    () => this.setStatusAndHide(),
                    error => this.extractErrors(error)
                );
        }
    }

    private setStatusAndHide() {
        this.status = 201;
        this.bsModalRef.hide();
    }

    private extractErrors(err: any): void {
        const errorsParse = JSON.parse(err._body);
        this.errors = [];
        for (const index in errorsParse) {
            if (errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ?
                        errorsParse[index] : errorsParse[index][0]
                })
            }
        }
    }
}
