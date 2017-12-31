import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from "rxjs/Subscription";

import { NodeService } from '../nodes/node.service';
import { SensorService } from '../nodes/sensor.service';
import { SensordataService } from './sensordata.service';
import { Node } from '../nodes/node.model';
import { Sensor } from '../nodes/sensor.model';
import { Sensordata } from './sensordata.model';

interface ChartData {
    data: Array<any>,
    label: string
}

@Component({
    templateUrl: 'sensordata-node.component.html'
})
export class SensordataNodeComponent implements OnInit, OnDestroy {
    public node: Node;
    public sensors: Sensor[];
    public sensordatas_array: Array<Sensordata[]> = [];
    public title: string;
    public breadcrumbs: any[];
    page = 1;
    maxSize = 10;
    totalItems: Array<number> = [];
    currentPage: Array<number> = [];

    date_start: string;
    date_end: string;

    // sensordatas polling observables
    private subscriptions: Array<ISubscription> = [];

    constructor(
        private nodeService: NodeService,
        private sensorService: SensorService,
        private sensorDataService: SensordataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.getNode();
    }

    private getNode() {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['nodeid']))
            .subscribe(
            node => {
                this.breadcrumbs = [
                    { label: "Home", url: "/" },
                    { label: "Nodes", url: "/nodes/list" },
                    { label: node.label, url: `/nodes/view/${node.id}` },
                    { label: "Sensordatas", is_active: true }
                ];
                this.node = node;
                this.title = node.label;
                this.getSensors();
            },
            error => console.log(error)
            );
    }

    private getSensors() {
        this.sensorService.getSensors(this.node.id)
        .subscribe(
            sensors => {
                this.sensors = sensors.results as Sensor[];
                this.getSensorDataPolling();
                this.sensors.forEach((sensor, index) => {
                    this.getSensorData(1, index);
                });
            },
            error => console.log(error)
        );
    }

    private getSensorData(page=1, index=0): void {
        this.sensorDataService.getSensorDataBySensor(
            page, this.node.id, this.sensors[index].id, this.date_start, this.date_end
        )
        .subscribe(
            sensordatas => {
                this.totalItems[index] = sensordatas.count;
                this.sensordatas_array[index] = sensordatas.results as Sensordata[];
                this.renderChart(index);
            },
            error => console.log(error)
        );
    }

    private getSensorDataPolling() {
        this.sensors.forEach((sensor, index) => {
            // push observable to subscriptions
            this.subscriptions.push(
                Observable.interval(5000)
                    .switchMap(() => this.sensorDataService.getSensorDataBySensor(
                        this.currentPage[index], this.node.id, this.sensors[index].id, this.date_start, this.date_end
                    ))
                    .map((sensordatas) => sensordatas.results)
                    .subscribe((sensordatas) => {
                        this.sensordatas_array[index] = sensordatas;
                        this.renderChart(index);
                    })
            );
        });
    }

    private renderChart(index): void {
        this.lineChartData[index] = [{
            data: [],
            label: this.sensors[index].label
        }];
        this.sensordatas_array[index].forEach((sensordata, jindex) => {
            this.lineChartData[index][0].data.push(sensordata.data);
            this.lineChartLabels[jindex] = jindex+1;
        });
    }

    pageChanged(event: any, index: number): void {
        this.getSensorData(event.page, index);
    }

    // lineChart
    public lineChartData: Array<ChartData[]> = [];
    public lineChartLabels: Array<any> = [0];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColours: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}