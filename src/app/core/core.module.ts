import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageNotFoundComponent, ForbiddenComponent } from './exceptions/exception.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './authenticate/logout.component';
import { RegisterComponent } from './register/register.component';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthenticateService, BaseCanActivate, CanActivateAdmin, CanActivateResearcher } from './authenticate/authenticate.service';
import { CredentialsService } from './authenticate/credentials.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    exports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        NavbarComponent,
        BreadcrumbComponent,
        LoginComponent,
        LogoutComponent,
        NgbModule
    ],
    declarations: [
        NavbarComponent,
        BreadcrumbComponent,
        PageNotFoundComponent,
        ForbiddenComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent
    ],
    providers: [ 
        LoginService,
        RegisterService,
        CookieService,
        CredentialsService,
        AuthenticateService,
        BaseCanActivate,
        CanActivateAdmin,
        CanActivateResearcher
    ]
})
export class CoreModule {}