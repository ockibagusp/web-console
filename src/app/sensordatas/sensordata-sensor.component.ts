import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { NodeService } from '../nodes/node.service';
import { SensorService } from '../sensors/sensor.service';
import { SensorDataService } from './sensordata.service';
import { Node } from '../nodes/node.model';
import { Sensor } from '../sensors/sensor.model';
import { SensorData } from './sensordata.model';

import { CredentialsService } from '../core/authenticate/credentials.service';
import { AuthenticateService } from '../core/authenticate/authenticate.service';
import { IsResearcherComponent } from '../core/authenticate/authenticate.component';

@Component({
    selector: 'sensordata-sensor',
    templateUrl: './sensordata.tpl.html'
})
export class SensorDataSensorComponent extends IsResearcherComponent implements OnInit {
    node: Node;
    sensor: Sensor;
    sensordatas: SensorData[];
    links: any[];
    title: string;
    page = 1;
    maxSize = 10;
    collectionSize: number;
    is_mine: boolean; // 'edit' button visibility

    date_start: string;
    date_end: string;

    constructor(
        private nodeService: NodeService,
        private sensorService: SensorService,
        private sensorDataService: SensorDataService,
        private route: ActivatedRoute,
        private credentialsService: CredentialsService,
        public router: Router,
        public authenticateService: AuthenticateService
    ) {
        super(router, authenticateService);
        super.ngOnInit();
    }

    ngOnInit() {
        this.links = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/" }
        ];
        this.getNode();
    }

    getNode(): void {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['nodeid']))
            .subscribe(
                node => {
                    this.node = node as Node;
                    // show 'edit' button only when node is owned by this auth user
                    this.is_mine = (node.user == this.credentialsService.getUser().username) ?
                        true: false;
                    this.getSensor();
                },
                error => console.log(error)
            );
    }

    getSensor(): void {
        this.route.params
            .switchMap((params: Params) => this.sensorService.getSensor(params['nodeid'], params['sensorid']))
            .subscribe(
                sensor => {
                    this.sensor = sensor as Sensor;
                    this.links.push(
                        { label: this.node.label, url: `/nodes/view/${this.node.id}` },
                        { label: "Sensors", url: `/nodes/${this.node.id}/sensors` },
                        { label: sensor.label, is_active: true }
                    );
                    this.getSensorData();
                },
                error => console.log(error)
            );
    }

    getSensorData(): void {
        this.route.params
            .switchMap((params: Params) => this.sensorDataService.getSensorDataBySensor(
                this.page, params['nodeid'], params['sensorid'], this.date_start, this.date_end
            ))
            .subscribe(
                sensordatas => {
                    this.collectionSize = sensordatas.count;
                    this.sensordatas = sensordatas.results as SensorData[];
                },
                error => console.log(error)
            );
    }

    pageChange(): void {
        this.router.navigateByUrl(
            `sensordata/node/${this.node.id}/sensor/${this.sensor.id}?page=${this.page}`
        );
        this.getSensorData();
    }

    filter(): void {
        this.page = 1;
        this.pageChange();
    }

    clearFilter() {
        this.page = 1;
        this.date_start = "";
        this.date_end = "";
        this.pageChange();
    }
}