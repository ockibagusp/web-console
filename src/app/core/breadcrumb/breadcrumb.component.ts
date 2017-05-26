import { Component, Input } from '@angular/core';

@Component({
    selector: 'breadcrumb',
    template: `
        <div class="row">
            <div class="col-md-12">
                <h1>{{ title }}</h1>
                <ol class="breadcrumb">
                    <li *ngFor="let link of links">
                        <span *ngIf="link.is_active" class="active">{{ link.label }}</span>
                        <a *ngIf="!link.is_active" [routerLink]="[link.url]">{{ link.label }}</a>
                    </li>
                </ol>
            </div>
        </div>
    `
})
export class BreadcrumbComponent {
    @Input() links: any[];
    @Input() title: string = 'AgriHub';
}