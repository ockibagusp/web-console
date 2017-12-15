import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

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
export class SensordataNodeComponent implements OnInit {
    node: Node;
    sensors: Sensor[];
    sensordatas: Sensordata[];
    title: string;
    page = 1;
    maxSize = 10;
    totalItems: number;

    date_start: string;
    date_end: string;

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
                this.getSensorData();
            },
            error => console.log(error)
        );
    }

    private getSensorData(page=1): void {
        this.sensorDataService.getSensorDataBySensor(
            page, this.node.id, this.sensors[0].id, this.date_start, this.date_end
        )
        .subscribe(
            sensordatas => {
                this.totalItems = sensordatas.count;
                this.sensordatas = sensordatas.results as Sensordata[];
                this.renderChart();
            },
            error => console.log(error)
        );
    }

    private renderChart(): void {
        this.sensors.forEach((sensor, index) => {
            let _chartdata = [];
            this.sensordatas.forEach((sensordata, jindex) => {
                _chartdata.push(sensordata.data);
                this.lineChartLabels[jindex] = jindex+1;
            });
            this.lineChartData[index] = [{
                data: _chartdata,
                label: sensor.label
            }];
        });
    }

    pageChanged(event: any): void {
        this.router.navigateByUrl(`/sensordata/node/${this.node.id}?page=${event.page}`);
        this.getSensorData(event.page);
    }

    // lineChart
    public lineChartData: Array<ChartData[]> = [];
    public lineChartLabels: Array<any> = [0];
    public lineChartOptions: any = {
        // animation: false,
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

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}