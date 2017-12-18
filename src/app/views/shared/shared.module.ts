import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ModalSensorFormComponent } from './modalsensorform.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AlertModule.forRoot(),
    ],
    declarations: [
        ModalSensorFormComponent
    ],
    exports: [
        ModalSensorFormComponent
    ]
})
export class SharedModule { }