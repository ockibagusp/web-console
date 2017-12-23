import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Node } from './node.model';
import { NodeService } from './node.service';
import { SupernodeService } from '../supernodes/supernode.service';
import { Supernode } from '../supernodes/supernode.model';
import { Coordinates } from '../shared/coordinates.model';

interface Errors {
    field: string,
    message: string
}

@Component({
    templateUrl: 'node-form.component.html'
})
export class NodeNewComponent implements OnInit {
    public is_new = true;
    public node: Node;
    public unlimited: boolean;
    public breadcrumbs: any[];
    
    public supernodes: Supernode[];

    public coordinates: Coordinates;

    errors: Errors[];

    constructor(private nodeService: NodeService,
                private supernodeService: SupernodeService,
                private router: Router) {
    }

    ngOnInit() {
        this.node = new Node;
        this.breadcrumbs = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/list" },
            { label: 'New', is_active: true }
        ];
        this.coordinates = {
            lat: null,
            long: null
        };
        this.getSupernodes();
    }

    private getSupernodes(page: number = 1): void {
        this.supernodeService.getSupernodes(page)
            .subscribe(
                res => this.supernodes = res.results as Supernode[],
                error => console.log(error)
            );
    }

    unlimitedStateChange(): void {
        if (this.unlimited) {
            this.node.pubsperday = -1;
        } else {
            this.node.pubsperday = 0;
        }
    }

    save(): void {
        this.node.is_public = this.node.is_public ? 1 : 0;
        if (this.coordinates.lat || this.coordinates.long) {
            this.node.coordinates = this.coordinates;
        }
        this.nodeService.save(this.node)
            .subscribe(
                node => this.router.navigate(['/nodes/list']),
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
