import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {SensordataComponent} from './sensordata.component';
import {SensordataNodeComponent} from './sensordata-node.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: '',
        data: {
            title: 'Sensordatas'
        },
        children: [
            {
                path: 'list',
                component: SensordataComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'node/:nodeid',
                component: SensordataNodeComponent,
                data: {
                    title: 'Nodes List'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SensordataRoutingModule {
}
