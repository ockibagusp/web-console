import {Component} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {UserService} from '../users/user.service';
import {SupernodeService} from '../supernodes/supernode.service';
import {NodeService} from '../nodes/node.service';
import {SensorService} from '../nodes/sensor.service';


export const MODAL = {
    ACTION: {
        DUPLICATE: 1,
        RESET: 2,
        DELETE: 3
    },
    DELETE_TARGET: {
        USER: 1,
        SUPERNODE: 2,
        NODE: 3,
        SENSOR: 4
    }
};

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
            {{ message }}
            <form *ngIf="action==MODAL.ACTION.DUPLICATE" class="form-horizontal">
                <div class="form-group">
                    <label for="label">Duplicate count</label>
                    <input type="number" name="duplicate_count" class="form-control" min="1"
                        [(ngModel)]="duplicate_count">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="bsModalRef.hide()">No</button>
            <button type="button" class="btn btn-primary" *ngIf="action==MODAL.ACTION.DUPLICATE" 
                (click)="duplicate()">Duplicate</button>
            <button type="button" class="btn btn-warning" *ngIf="action==MODAL.ACTION.RESET" 
                (click)="reset()">Reset</button>
            <button type="button" class="btn btn-danger" *ngIf="action==MODAL.ACTION.DELETE" 
                (click)="delete()">Delete</button>
        </div>
    `
})
export class ModalContentComponent {
    public id: string;
    public title: string;
    public url: string;
    public message: string;
    public status: number;
    public errors: Errors[];
    public duplicate_count: number = 1;

    // perform different action
    public action: number;
    // perform diferent delete target
    public delete_target: number;
    // redeclare MODAL so in this component template we can access it
    public MODAL = MODAL;

    constructor(public bsModalRef: BsModalRef,
                private userService: UserService,
                private supernodeService: SupernodeService,
                private nodeService: NodeService,
                private sensorService: SensorService) {
    }

    duplicate(): void {
        this.nodeService.duplicate(this.id, this.duplicate_count)
            .subscribe(
            () => {
                this.status = 200;
                this.bsModalRef.hide();
            },
            error => this.extractErrors(error)
            );
    }

    reset(): void {
        this.nodeService.reset(this.id)
            .subscribe(
                () => {
                    this.status = 200;
                    this.bsModalRef.hide();
                },
                error => this.extractErrors(error)
            );
    }

    delete(): void {
        if (this.delete_target = MODAL.DELETE_TARGET.SUPERNODE) {
            this.supernodeService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => this.extractErrors(error)
                );
        } else if (this.delete_target = MODAL.DELETE_TARGET.NODE) {
            this.nodeService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => this.extractErrors(error)
                );
        } else if (this.delete_target = MODAL.DELETE_TARGET.SENSOR) {
            this.sensorService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => this.extractErrors(error)
                );
        } else if (this.delete_target = MODAL.DELETE_TARGET.USER) {
            this.userService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => this.extractErrors(error)
                );
        }
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
