import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Supernode } from './supernode.model';
import { SupernodeService } from './supernode.service';
import 'rxjs/add/operator/switchMap';

import { Coordinates } from '../shared/coordinates.model';

import { CredentialsService}  from '../core/authenticate/credentials.service';

@Component({
    templateUrl: 'supernode-form.component.html'
})
export class SupernodeEditComponent implements OnInit {
    public is_new = false;
    public supernode: Supernode;
    public breadcrumbs: any[];

    public coordinates: Coordinates;

    errors: Array<{ field: string, message: string }>;

    constructor(private supernodeService: SupernodeService,
                private route: ActivatedRoute,
                private credentialsService: CredentialsService,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.supernodeService.getSupernode(params['id']))
            .subscribe(
                supernode => this.setUpSupernode(supernode),
                error => console.log(error)
            );
        this.supernode = new Supernode;
        this.coordinates = {
            lat: null,
            long: null
        };
    }

    private setUpSupernode(supernode: Supernode): void {
        // raise 403 when node is not owned by this auth user
        if (supernode.user != this.credentialsService.getUser().username) {
            this.router.navigateByUrl('/page/403', {skipLocationChange: true});
        }
        this.breadcrumbs = [
            { label: "Home", url: "/" },
            { label: "Supernodes", url: "/supernodes/list" },
            { label: supernode.label, url: `/supernodes/view/${supernode.id}` },
            { label: 'Edit', is_active: true }
        ];
        this.supernode = supernode;

        if (supernode.coordinates) {
            this.coordinates = supernode.coordinates;
        }
    }

    public save(): void {
        if (this.coordinates.lat || this.coordinates.long) {
            this.supernode.coordinates = this.coordinates;
        } else {
            this.supernode.coordinates = null;
        }

        this.supernodeService.save(this.supernode)
            .subscribe(
                supernode => this.router.navigate(['/supernodes/view', supernode.id]),
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
