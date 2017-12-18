import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

import {NodeComponent} from './node.component';
import {NodeNewComponent} from './node-new.component';
import {NodeEditComponent} from './node-edit.component';
import {NodeDetailComponent} from './node-detail.component';
import {ModalSensorFormComponent} from '../shared/modalsensorform.component';

import {NodeService} from './node.service';
import {SupernodeService} from '../supernodes/supernode.service';
import { SensorService as SupernodeSensorService } from '../supernodes/sensor.service';
import {SensorService} from './sensor.service';
import {UserService} from '../users/user.service';

import {NodeRoutingModule} from './nodes-routing.module';

// Modal Component
import {ModalModule} from 'ngx-bootstrap/modal';

// Tabs Component
import {TabsModule} from 'ngx-bootstrap/tabs';

// Pagination Component
import {PaginationModule} from 'ngx-bootstrap/pagination';

import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NodeRoutingModule,
        ModalModule.forRoot(),
        TabsModule,
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        SharedModule
    ],
    entryComponents: [
        ModalSensorFormComponent
    ],
    declarations: [
        NodeComponent,
        NodeNewComponent,
        NodeEditComponent,
        NodeDetailComponent
    ],
    providers: [
        NodeService,
        SupernodeService,
        SupernodeSensorService,
        SensorService,
        UserService
    ]
})
export class NodesModule {
}
