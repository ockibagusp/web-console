import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {SupernodeComponent} from './supernode.component';
import {SupernodeNewComponent} from './supernode-new.component'
import {SupernodeEditComponent} from './supernode-edit.component';
import {SupernodeDetailComponent} from './supernode-detail.component';
import {SupernodeNodeComponent} from './supernode-node.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: '',
        data: {
            title: 'Super-Nodes'
        },
        children: [
            {
                path: 'list',
                component: SupernodeComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'new',
                component: SupernodeNewComponent,
                data: {
                    title: 'Create New Super-Node'
                }
            },
            {
                path: 'view/:id',
                component: SupernodeDetailComponent,
                data: {
                    title: 'View'
                }
            },
            {
                path: 'edit/:id',
                component: SupernodeEditComponent,
                data: {
                    title: 'Edit'
                }
            },
            {
                path: 'view/:id/nodes',
                component: SupernodeNodeComponent,
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
export class SupernodeRoutingModule {
}
