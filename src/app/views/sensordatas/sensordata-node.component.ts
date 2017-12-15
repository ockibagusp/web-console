import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { NodeService } from '../nodes/node.service';
import { SensordataService } from './sensordata.service';
import { Node } from '../nodes/node.model';
import { Sensordata } from './sensordata.model';

@Component({
    templateUrl: 'sensordata-node.component.html'
})
export class SensordataNodeComponent implements OnInit {
    node: Node;
    sensordatas: Sensordata[];
    title: string;
    page = 1;
    maxSize = 10;
    totalItems: number;

    date_start: string;
    date_end: string;

    constructor(
        private nodeService: NodeService,
        private sensorDataService: SensordataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.getNode();
    }

    getNode() {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['nodeid']))
            .subscribe(
            node => {
                this.node = node;
                this.title = node.label;
                this.getSensorData();
            },
            error => console.log(error)
            );
    }

    getSensorData(page=1): void {
        this.route.params
            .switchMap((params: Params) => this.sensorDataService.getSensorDataByNode(
                page, params['nodeid'], this.date_start, this.date_end
            ))
            .subscribe(
            sensordatas => {
                this.totalItems = sensordatas.count;
                this.sensordatas = sensordatas.results as Sensordata[];
            },
            error => console.log(error)
            );
    }

    pageChanged(event: any): void {
        this.router.navigateByUrl(`/sensordata/node/${this.node.id}?page=${event.page}`);
        this.getSensorData(event.page);
    }
}