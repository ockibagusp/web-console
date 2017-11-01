import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../../views/core/authenticate/credentials.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {
    username: string;
    role: number;

    constructor(private credentialsService: CredentialsService) {
    }

    ngOnInit() {
        const user = this.credentialsService.getUser() || '';
        if ('' != user) {
            this.username = this.credentialsService.getUser().username;
            this.role = this.credentialsService.getUser().is_admin;
        }
    }
}
