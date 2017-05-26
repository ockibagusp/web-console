import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from './credentials.service';
import { AgriHub } from '../../global/agrihub';

@Component({
    selector: 'logout',
    template: ''
})
export class LogoutComponent implements OnInit {
    constructor(
        private router: Router,
        private credentialsService: CredentialsService
    ) {}

    ngOnInit() {
        this.credentialsService.deleteAll();
        window.location.href = AgriHub.BASE_URL + 'login';
    }
}