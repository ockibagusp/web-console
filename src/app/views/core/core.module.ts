import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CoreRoutingModule } from './core-routing.module';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CredentialsService } from './authenticate/credentials.service';
import { AuthenticateService, BaseCanActivate, CanActivateAdmin, CanActivateResearcher } 
    from './authenticate/authenticate.service';

import { PageNotFoundComponent, ForbiddenComponent, InternalServerErrorComponent } from './exception.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { RegisterComponent } from './register.component';

import { LoginService } from './login.service';
import { RegisterService } from './register.service';

import { ModalContentComponent } from '../core/modal.component';

import { AlertModule } from 'ngx-bootstrap/alert'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
    	CoreRoutingModule,
        AlertModule.forRoot()
    ],
    entryComponents: [
        ModalContentComponent
    ],
    declarations: [
        PageNotFoundComponent,
        ForbiddenComponent,
        InternalServerErrorComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ModalContentComponent
    ],
    providers: [
        CookieService,
        CredentialsService,
        AuthenticateService,
        BaseCanActivate,
        CanActivateAdmin,
        CanActivateResearcher,
        LoginService,
        RegisterService
    ]
})
export class CoreModule {
}
