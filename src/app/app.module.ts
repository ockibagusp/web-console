import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AppComponent, MainAppComponent} from './app.component';

import {CoreModule} from './views/core/core.module';

// Import containers
import {
    FullLayoutComponent,
    SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
    FullLayoutComponent,
    SimpleLayoutComponent
];

// Import components
import {
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarHeaderComponent,
    APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarHeaderComponent,
    APP_SIDEBAR_NAV
];

// Import directives
import {
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
];

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts/ng2-charts';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        AppComponent,
        MainAppComponent,
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
