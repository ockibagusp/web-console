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

    public duplicate_count = 0;

    // perform different action
    public action: number;
    // perform diferent delete target
    public delete_target: number;
    // redeclare MODAL so in this component template we can access it
    private MODAL = MODAL;

    constructor(public bsModalRef: BsModalRef,
                private userService: UserService,
                private supernodeService: SupernodeService,
                private nodeService: NodeService,
                private sensorService: SensorService) {
    }

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
        if (this.delete_target = MODAL.DELETE_TARGET.SUPERNODE) {
            this.supernodeService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => null
                );
        } else if (this.delete_target = MODAL.DELETE_TARGET.NODE) {
            this.nodeService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => null
                );
        } else if (this.delete_target = MODAL.DELETE_TARGET.SENSOR) {
            this.sensorService.delete(this.url)
                .subscribe(
                    () => {
                        this.status = 204;
                        this.bsModalRef.hide();
                    },
                    error => null
                );
        } else if (this.delete_target = MODAL.DELETE_TARGET.USER) {
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
