import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NodeService} from './node.service';
import {Node} from './node.model';
import 'rxjs/add/operator/switchMap';

import {CredentialsService} from '../core/authenticate/credentials.service';

@Component({
    templateUrl: 'node-form.component.html'
})
export class NodeEditComponent implements OnInit {
    node: Node;
    is_new = false;
    unlimited: boolean;
    _initial_pubsperday: number;

    errors: Array<{ field: string, message: string }>;

    constructor(private nodeService: NodeService,
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
        // TODO why?
        this.node = new Node;
    }

    private setUpNode(node: Node): void {
        // raise 403 when node is not owned by this auth user
        if (node.user !== this.credentialsService.getUser().username) {
            this.router.navigateByUrl('/page/403', {skipLocationChange: true});
        }
        this.node = node;
        this.unlimited = (-1 === node.pubsperday);
        this._initial_pubsperday = node.pubsperday;
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
