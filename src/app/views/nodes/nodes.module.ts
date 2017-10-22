import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { NodeComponent } from './node.component';
import { NodeNewComponent } from './node-new.component';
import { NodeEditComponent } from './node-edit.component';
import { NodeDetailComponent, ModalSensorFormComponent } from './node-detail.component';

import { NodeService } from './node.service';
import { SensorService } from './sensor.service';
import { UserService } from '../users/user.service';

import { ModalContentComponent } from '../core/modal.component';

import { NodeRoutingModule } from './nodes-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
    imports: [
        CommonModule,
	    FormsModule,
    	NodeRoutingModule,
    	ModalModule.forRoot(),
    	TabsModule,
    	PaginationModule.forRoot(),
        AlertModule.forRoot()
    ],
    entryComponents: [
        ModalSensorFormComponent
    ],
    declarations: [
        NodeComponent,
        NodeNewComponent,
        NodeEditComponent,
        NodeDetailComponent,
        ModalSensorFormComponent
    ],
    providers: [ 
        NodeService, 
        SensorService,
        UserService
    ]
})
export class NodesModule {
}