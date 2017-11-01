import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {UserComponent} from './user.component';
import {UserDetailComponent} from './user-detail.component';
import {UserNewComponent} from './user-new.component';
import {UserEditComponent} from './user-edit.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: '',
        data: {
            title: 'Users'
        },
        children: [
            {
                path: 'list',
                component: UserComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'view/:id',
                component: UserDetailComponent,
                data: {
                    title: 'Detail'
                }
            },
            {
                path: 'new',
                component: UserNewComponent,
                data: {
                    title: 'New'
                }
            },
            {
                path: 'edit/:id',
                component: UserEditComponent,
                data: {
                    title: 'Edit'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
