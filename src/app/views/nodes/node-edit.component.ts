import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NodeService } from './node.service';
import { Node } from './node.model';
import { SupernodeService } from '../supernodes/supernode.service';
import { Supernode } from '../supernodes/supernode.model';
import 'rxjs/add/operator/switchMap';

import {CredentialsService} from '../core/authenticate/credentials.service';

@Component({
    templateUrl: 'node-form.component.html'
})
export class NodeEditComponent implements OnInit {
    public node: Node;
    public is_new = false;
    public unlimited: boolean;
    public _initial_pubsperday: number;
    public supernodes: Supernode[];
    public breadcrumbs: any[];

    errors: Array<{ field: string, message: string }>;

    constructor(private nodeService: NodeService,
                private supernodeService: SupernodeService,
                private route: ActivatedRoute,
                private credentialsService: CredentialsService,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.nodeService.getNode(params['id']))
            .subscribe(
                node => this.setUpNode(node),
                error => console.log(error)
            );
        this.getSupernodes();
        // TODO why?
        this.node = new Node;
    }

    private setUpNode(node: Node): void {
        // raise 403 when node is not owned by this auth user
        if (node.user !== this.credentialsService.getUser().username) {
            this.router.navigateByUrl('/page/403', {skipLocationChange: true});
        }
        this.breadcrumbs = [
            { label: "Home", url: "/" },
            { label: "Nodes", url: "/nodes/list" },
            { label: node.label, url: `/nodes/view/${node.id}` },
            { label: 'Edit', is_active: true }
        ];
        this.node = node;
        this.unlimited = (-1 === node.pubsperday);
        this._initial_pubsperday = node.pubsperday;
    }

    private getSupernodes(page: number = 1): void {
        this.supernodeService.getSupernodes(page)
            .subscribe(
                res => this.supernodes = res.results as Supernode[],
                error => console.log(error)
            );
    }

    public unlimitedStateChange(): void {
        if (this.unlimited) {
            this.node.pubsperday = -1;
        } else {
            this.node.pubsperday = (-1 === this._initial_pubsperday) ? 0 :
                this._initial_pubsperday;
        }
    }

    public save(): void {
        this.node.is_public = this.node.is_public ? 1 : 0;
        this.nodeService.save(this.node)
            .subscribe(
                node => this.router.navigate(['/nodes/view', node.id]),
                error => this.extractErrors(error)
            );
    }

    private extractErrors(err: any): void {
        const errorsParse = JSON.parse(err._body);
        this.errors = [];
        for (const index in errorsParse) {
            if (errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ?
                        errorsParse[index] : errorsParse[index][0]
                })
            }
        }
    }
}
