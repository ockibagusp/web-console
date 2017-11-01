import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {
    PageNotFoundComponent, ForbiddenComponent, InternalServerErrorComponent
} from './exception.component';
import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';
import {RegisterComponent} from './register.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Example Pages'
        },
        children: [
            {
                path: '404',
                component: PageNotFoundComponent,
                data: {
                    title: 'Page 404'
                }
            },
            {
                path: '403',
                component: ForbiddenComponent,
                data: {
                    title: 'Page 403'
                }
            },
            {
                path: '500',
                component: InternalServerErrorComponent,
                data: {
                    title: 'Page 500'
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Login Page'
                }
            },
            {
                path: 'logout',
                component: LogoutComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: 'Register Page'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
