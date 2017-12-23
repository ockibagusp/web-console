import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supernode } from './supernode.model';
import { SupernodeService } from './supernode.service';
import { Coordinates } from '../shared/coordinates.model';

interface Errors {
    field: string,
    message: string
}

@Component({
    templateUrl: 'supernode-form.component.html'
})
export class SupernodeNewComponent implements OnInit {
    public is_new = true;
    public supernode: Supernode;
    public breadcrumbs: any[];

    public coordinates: Coordinates;

    errors: Errors[];

    constructor(private supernodeService: SupernodeService,
                private router: Router) {
    }

    ngOnInit() {
        this.breadcrumbs = [
            { label: "Home", url: "/" },
            { label: "Supernodes", url: "/supernodes/list" },
            { label: "New", is_active: true }
        ];
        this.supernode = new Supernode;
        this.coordinates = {
            lat: null,
            long: null
        };
    }

    save(): void {
        if (this.coordinates.lat || this.coordinates.long) {
            this.supernode.coordinates = this.coordinates;
        }

        this.supernodeService.save(this.supernode)
            .subscribe(
                () => this.router.navigate(['/supernodes/list']),
                error => this.extractErrors(error)
            );
    }

    private extractErrors(err: any): void {
        const errorsParse = JSON.parse(err._body);
        this.errors = [];

        for (const index in errorsParse) {
            if (errorsParse.hasOwnProperty(index)) {
                if (errorsParse[index] instanceof Array || typeof errorsParse[index] === 'string') {
                    this.errors.push({
                        field: index,
                        message: typeof errorsParse[index] === 'string' ?
                            errorsParse[index] : errorsParse[index][0]
                    })
                } else { // dictionary
                    for (const jindex in errorsParse[index]) {
                        if (errorsParse[index].hasOwnProperty(jindex)) {
                            this.errors.push({
                                field: `${index} (${jindex})`,
                                message: errorsParse[index][jindex]
                            })
                        }
                    }
                }
            }
        }
    }
}
