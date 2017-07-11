import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { NodeService } from '../nodes/node.service';
import { SensorService } from './sensor.service';
import { Node } from '../nodes/node.model';
import { Sensor } from './sensor.model';

import { CredentialsService } from '../core/authenticate/credentials.service';

@Component({
    moduleId: '../views/sensors/',
    selector: 'sensor-edit',
    templateUrl: 'sensor-form.tpl.html'
})
export class SensorEditComponent implements OnInit {
    parentNode: Node;
    sensor: Sensor;
    links: any[];

    errors: Array<{ field: string, message: string }>;

    constructor(
        private nodeService: NodeService,
        private sensorService: SensorService,
        private route: ActivatedRoute,
        private credentialsService: CredentialsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getNode();
    }

    getNode() {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['nodeid']))
            .subscribe(
                node => {
                    this.setUpNode(node);
                    this.getSensor();
                },
                error => console.log(error)
            );
    }

    getSensor() {
        this.route.params
            .switchMap((params: Params) => this.sensorService.getSensor(params['nodeid'], params['sensorid']))
            .subscribe(
                sensor => this.setUpSensor(sensor),
                error => console.log(error)
            );
    }

    save(): void {
        this.sensorService.save(this.parentNode, this.sensor)
            .subscribe(
                sensor => this.router.navigate(['/nodes/', this.parentNode.id, 'sensors']),
                error => this.extractErrors(error)
            );
    }

    delete(): void {
        if(confirm("Are you sure?")) {
            this.sensorService.delete(this.sensor.url)
                .subscribe(
                    () => this.router.navigate(['/nodes/', this.parentNode.id, 'sensors']),
                    error => this.extractErrors(error)
                );
        }
    }

    private setUpNode(node: Node) {
        this.parentNode = node;
        // raise 403 when node is not owned by this auth user
        if (node.user != this.credentialsService.getUser().username) {
            this.router.navigateByUrl('/403', { skipLocationChange: true });
        }
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" },
            { label: node.label, url: `/nodes/view/${node.id}` },
            { label: "Sensors", url: `/nodes/${node.id}/sensors` },
        ];
    }

    private setUpSensor(sensor: Sensor) {
        this.sensor = sensor as Sensor;
        this.links.push(
            { label: sensor.label, url: `/sensordata/node/${this.parentNode.id}/sensor/${sensor.id}` },
            { label: "Edit", is_active: true }
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

    public closeAlert(alert: any) {
        const index: number = this.errors.indexOf(alert);
        this.errors.splice(index, 1);
    }
}