import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

import {SupernodeComponent} from './supernode.component';
import {SupernodeNewComponent} from './supernode-new.component';
import {SupernodeEditComponent} from './supernode-edit.component';
import {SupernodeDetailComponent} from './supernode-detail.component';
import {SupernodeNodeComponent} from './supernode-node.component';

import { ModalSensorFormComponent } from '../shared/modalsensorform.component';

import {SupernodeService} from './supernode.service';
import {SensorService as SupernodeSensorService} from './sensor.service';
import {NodeService} from '../nodes/node.service';
import {SensorService as NodeSensorService} from '../nodes/sensor.service';
import {UserService} from '../users/user.service';

import {SupernodeRoutingModule} from './supernodes-routing.module';

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
        SupernodeRoutingModule,
        ModalModule.forRoot(),
        TabsModule,
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        SharedModule
    ],
    entryComponents: [ModalSensorFormComponent],
    declarations: [
        SupernodeComponent,
        SupernodeNewComponent,
        SupernodeEditComponent,
        SupernodeDetailComponent,
        SupernodeNodeComponent
    ],
    providers: [
        SupernodeService,
        SupernodeSensorService,
        NodeService,
        NodeSensorService,
        UserService
    ]
})
export class SupernodesModule {
}
