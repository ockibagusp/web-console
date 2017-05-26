import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: './default.exception.html',
  styleUrls: ['./default.exception.css']
})
export class PageNotFoundComponent {
    status = '404 Not Found';
    detail = 'Requested page not found';

    constructor(private location: Location) {}

    back() {
        this.location.back();
    }
}

@Component({
  moduleId: '../views/core/exceptions/',
  templateUrl: 'default.exception.html',
  styleUrls: ['default.exception.css']
})
export class ForbiddenComponent {
    status = '403 Forbidden';
    detail = 'You do not have permission to perform this action';

    constructor(private location: Location) {}

    back() {
        this.location.back();
    }
}