import { NgModule }      from '@angular/core';
import { NodeModule } from './nodes/node.module';
import { SensorModule } from './sensors/sensor.module';
import { SensorDataModule } from './sensordatas/sensordata.module';
import { UserModule } from './users/user.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent, MainAppComponent }  from './app.component';

@NgModule({
    imports: [
        AppRoutingModule,
        NodeModule,
        SensorModule,
        SensorDataModule,
        UserModule
    ],
    declarations: [ 
        AppComponent,
        MainAppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
