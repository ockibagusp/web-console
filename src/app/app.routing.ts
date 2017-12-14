import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainAppComponent} from './app.component';

// Import Containers
import {
    FullLayoutComponent,
    SimpleLayoutComponent
} from './containers';

import {PageNotFoundComponent} from './views/core/exception.component';

import {
    BaseCanActivate, CanActivateAdmin
} from './views/core/authenticate/authenticate.service';

export const routes: Routes = [
    {
        path: '',
        component: MainAppComponent,
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [BaseCanActivate],
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'supernodes',
                canActivate: [BaseCanActivate],
                loadChildren: './views/supernodes/supernodes.module#SupernodesModule',
            },
            {
                path: 'nodes',
                canActivate: [BaseCanActivate],
                loadChildren: './views/nodes/nodes.module#NodesModule',
            },
            {
                path: 'users',
                canActivate: [BaseCanActivate, CanActivateAdmin],
                loadChildren: './views/users/users.module#UsersModule',
            },
            {
                path: 'sensordata',
                canActivate: [BaseCanActivate],
                loadChildren: './views/sensordatas/sensordatas.module#SensordatasModule',
            }
        ]
    },
    {
        path: 'page',
        component: SimpleLayoutComponent,
        data: {
            title: 'Page'
        },
        children: [
            {
                path: '',
                loadChildren: './views/core/core.module#CoreModule',
            }
        ]
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
