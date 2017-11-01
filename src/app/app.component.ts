import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from './views/core/authenticate/authenticate.service';

@Component({
    selector: 'main-app',
    template: ''
})
export class MainAppComponent implements OnInit {
    constructor(private router: Router,
                private authenticateService: AuthenticateService) {
    }

    ngOnInit() {
        if (!this.authenticateService.isAuth()) {
            this.router.navigate(['/page/login']);
        } else if (this.authenticateService.isAdmin()) {
            this.router.navigate(['/users/list']);
        } else if (this.authenticateService.isResearcher()) {
            this.router.navigate(['/supernodes/list']);
        }
    }
}

@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
}
