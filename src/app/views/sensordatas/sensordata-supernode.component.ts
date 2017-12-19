import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SupernodeService } from '../supernodes/supernode.service';
import { SensorService } from '../supernodes/sensor.service';
import { SensordataService } from './sensordata.service';
import { Supernode } from '../supernodes/supernode.model';
import { Sensor } from '../supernodes/sensor.model';
import { Sensordata } from './sensordata.model';

interface ChartData {
    data: Array<any>,
    label: string
}

@Component({
    templateUrl: 'sensordata-supernode.component.html'
})
export class SensordataSupernodeComponent implements OnInit {
    public supernode: Supernode;
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

    constructor(
        private supernodeService: SupernodeService,
        private sensorService: SensorService,
        private sensorDataService: SensordataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.getSupernode();
    }

    private getSupernode() {
        this.route.params
            .switchMap((params: Params) => this.supernodeService.getSupernode(params['supernodeid']))
            .subscribe(
            supernode => {
                this.breadcrumbs = [
                    { label: "Home", url: "/" },
                    { label: "Sensordatas", url: "/sensordatas/list" },
                    { label: supernode.label, is_active: true }
                ];
                this.supernode = supernode;
                this.title = supernode.label;
                this.getSensors();
            },
            error => console.log(error)
            );
    }

    private getSensors() {
        this.sensorService.getSensors(this.supernode.id)
        .subscribe(
            sensors => {
                this.sensors = sensors.results as Sensor[];
                this.sensors.forEach((sensor, index) => {
                    this.getSensorData(1, index);
                });
            },
            error => console.log(error)
        );
    }

    private getSensorData(page=1, index=0): void {
        this.sensorDataService.getSensorDataBySupernodeSensor(
            page, this.supernode.id, this.sensors[index].id, this.date_start, this.date_end
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

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}