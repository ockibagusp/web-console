import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { NodeComponent } from './node.component';
import { NodeNewComponent } from './node-new.component'
import { NodeEditComponent } from './node-edit.component';
import { NodeDetailComponent } from './node-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: '',
        data: {
            title: 'Nodes'
        },
        children: [
            {
                path: 'list',
                component: NodeComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'new',
                component: NodeNewComponent,
                data: {
                    title: 'Create New Node'
                }
            },
            {
                path: 'view/:id',
                component: NodeDetailComponent,
                data: {
                    title: 'View'
                }
            },
            {
                path: 'edit/:id',
                component: NodeEditComponent,
                data: {
                    title: 'Edit'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NodeRoutingModule {
}
