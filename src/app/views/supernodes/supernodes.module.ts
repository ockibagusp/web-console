import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { SupernodeComponent } from './supernode.component';
import { SupernodeNewComponent } from './supernode-new.component';
import { SupernodeEditComponent } from './supernode-edit.component';
import { SupernodeDetailComponent } from './supernode-detail.component';

import { SupernodeService } from './supernode.service';
import { NodeService } from '../nodes/node.service';
import { SensorService } from '../nodes/sensor.service';
import { UserService } from '../users/user.service';

import { ModalContentComponent } from '../core/modal.component';

import { SupernodeRoutingModule } from './supernodes-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
    imports: [
        CommonModule,
	    FormsModule,
    	SupernodeRoutingModule,
    	ModalModule.forRoot(),
    	PaginationModule.forRoot(),
        AlertModule.forRoot()
    ],
    entryComponents: [
        
    ],
    declarations: [
        SupernodeComponent,
        SupernodeNewComponent,
        SupernodeEditComponent,
        SupernodeDetailComponent
    ],
    providers: [ 
        SupernodeService,
        NodeService, 
        SensorService,
        UserService
    ]
})
export class SupernodesModule {
}