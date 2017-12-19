import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { SensordataComponent } from './sensordata.component';
import { SensordataSupernodeComponent } from './sensordata-supernode.component';
import { SensordataNodeComponent } from './sensordata-node.component';

import { SensordataService } from './sensordata.service';
import { SupernodeService } from '../supernodes/supernode.service';
import { NodeService } from '../nodes/node.service';
import { SensorService as SupernodeSensorService } from '../supernodes/sensor.service';
import { SensorService as NodeSensorService } from '../nodes/sensor.service';
import { UserService } from '../users/user.service';

import { SensordataRoutingModule } from './sensordatas-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AlertModule } from 'ngx-bootstrap/alert';

import { LocalDatePipe } from '../core/pipes/local-date.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SensordataRoutingModule,
        ModalModule.forRoot(),
        TabsModule,
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        ChartsModule,
        SharedModule
    ],
    entryComponents: [],
    declarations: [
        SensordataComponent,
        SensordataNodeComponent,
        SensordataSupernodeComponent,
        LocalDatePipe
    ],
    providers: [
        SensordataService,
        SupernodeService,
        NodeService,
        SupernodeSensorService,
        NodeSensorService,
        UserService
    ]
})
export class SensordatasModule {
}
