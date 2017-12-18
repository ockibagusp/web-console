import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { ModalSensorFormComponent } from './modalsensorform.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        AlertModule.forRoot(),
    ],
    declarations: [
        ModalSensorFormComponent,
        BreadcrumbsComponent
    ],
    exports: [
        ModalSensorFormComponent,
        BreadcrumbsComponent
    ]
})
export class SharedModule { }