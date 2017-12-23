import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from "rxjs/Subscription";

import { NodeService } from '../nodes/node.service';
import { SensordataService } from './sensordata.service';
import { Node } from '../nodes/node.model';
import { Sensordata } from './sensordata.model';

@Component({
    templateUrl: 'sensordata.component.html'
})
export class SensordataComponent implements OnInit, OnDestroy {
    public sensordatas: Sensordata[];
    public breadcrumbs: any[];
    public title: string;
    public page = 1;
    public maxSize = 10;
    public totalItems: number;

    date_start: string;
    date_end: string;

    // sensordatas polling observables
    private subscription: ISubscription;

    constructor(
        private nodeService: NodeService,
        private sensorDataService: SensordataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.breadcrumbs = [
            { label: "Home", url: "/" },
            { label: "Sensordatas", is_active: true }
        ];
        this.getSensorData();
        this.getSensorDataPolling();
    }

    getSensorData(page=1): void {
        this.sensorDataService.getSensorDataByUser(
            page, this.date_start, this.date_end
        )
        .subscribe(
            sensordatas => {
                this.totalItems = sensordatas.count;
                this.sensordatas = sensordatas.results as Sensordata[];
            },
            error => console.log(error)
        );
    }

    private getSensorDataPolling() {
        this.subscription = Observable.interval(5000)
            .switchMap(() => this.sensorDataService.getSensorDataByUser(
                1, this.date_start, this.date_end
            ))
            .map((sensordatas) => sensordatas.results)
            .subscribe((sensordatas) => {
                this.sensordatas = sensordatas
            });
    }

    pageChanged(event: any): void {
        this.router.navigateByUrl(`/sensordatas/list?page=${event.page}`);
        this.getSensorData(event.page);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}