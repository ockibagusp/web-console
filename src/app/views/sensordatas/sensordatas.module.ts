import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts/ng2-charts';

import {SensordataComponent} from './sensordata.component';
import {SensordataNodeComponent} from './sensordata-node.component';

import {SensordataService} from './sensordata.service';
import {NodeService} from '../nodes/node.service';
import {SensorService} from '../nodes/sensor.service';
import {UserService} from '../users/user.service';

import {SensordataRoutingModule} from './sensordatas-routing.module';

// Modal Component
import {ModalModule} from 'ngx-bootstrap/modal';

// Tabs Component
import {TabsModule} from 'ngx-bootstrap/tabs';

// Pagination Component
import {PaginationModule} from 'ngx-bootstrap/pagination';

import {AlertModule} from 'ngx-bootstrap/alert';

import {LocalDatePipe} from '../core/pipes/local-date.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SensordataRoutingModule,
        ModalModule.forRoot(),
        TabsModule,
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        ChartsModule
    ],
    entryComponents: [],
    declarations: [
        SensordataComponent,
        SensordataNodeComponent,
        LocalDatePipe
    ],
    providers: [
        SensordataService,
        NodeService,
        SensorService,
        UserService
    ]
})
export class SensordatasModule {
}
