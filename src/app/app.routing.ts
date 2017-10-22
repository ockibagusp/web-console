import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAppComponent } from './app.component';

// Import Containers
import {
    FullLayoutComponent,
    SimpleLayoutComponent
} from './containers';

import { PageNotFoundComponent } from './views/core/exception.component';

export const routes: Routes = [
    {
        path: '',
        component: MainAppComponent,
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'components',
                loadChildren: './views/components/components.module#ComponentsModule'
            },
            {
                path: 'icons',
                loadChildren: './views/icons/icons.module#IconsModule'
            },
            {
                path: 'widgets',
                loadChildren: './views/widgets/widgets.module#WidgetsModule'
            },
            {
                path: 'charts',
                loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
            },
            //
            {
                path: 'nodes',
                loadChildren: './views/nodes/nodes.module#NodesModule',
            },
            {
                path: 'users',
                loadChildren: './views/users/users.module#UsersModule',
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
    {
        path: 'pages',
        component: SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren: './views/pages/pages.module#PagesModule',
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
