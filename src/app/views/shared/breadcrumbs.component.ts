import { Component, Input } from '@angular/core';

@Component({
    selector: 'breadcrumbs',
    template: `
        <ng-template ngFor let-link [ngForOf]="links">
            <li class="breadcrumb-item" [ngClass]="{active: link.is_active}">
                <a *ngIf="!link.is_active" [routerLink]="[link.url]">{{link.label}}</a>
                <span *ngIf="link.is_active">{{link.label}}</span>
            </li>
        </ng-template>`
})
export class BreadcrumbsComponent {
    @Input() links: any[];
}