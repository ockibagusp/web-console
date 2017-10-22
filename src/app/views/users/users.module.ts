import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail.component';
import { UserNewComponent } from './user-new.component';
import { UserEditComponent } from './user-edit.component';

import { UserService } from './user.service';
import { NodeService } from '../nodes/node.service';
import { SensorService } from '../nodes/sensor.service';

import { UsersRoutingModule } from './users-routing.module';

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
    	UsersRoutingModule,
    	ModalModule.forRoot(),
    	TabsModule,
    	PaginationModule.forRoot(),
        AlertModule.forRoot()
    ],
    declarations: [
        UserComponent,
        UserDetailComponent,
        UserNewComponent,
        UserEditComponent
    ],
    providers: [ 
        UserService,
        NodeService,
        SensorService
    ]
})
export class UsersModule {
}