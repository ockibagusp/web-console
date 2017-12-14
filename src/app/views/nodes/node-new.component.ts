import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Node} from './node.model';
import {NodeService} from './node.service';
import { SupernodeService } from '../supernodes/supernode.service';
import { Supernode } from '../supernodes/supernode.model';

interface Errors {
    field: string,
    message: string
}

@Component({
    templateUrl: 'node-form.component.html'
})
export class NodeNewComponent implements OnInit {
    is_new = true;
    node: Node;
    unlimited: boolean;

    supernodes: Supernode[];

    errors: Errors[];

    constructor(private nodeService: NodeService,
                private supernodeService: SupernodeService,
                private router: Router) {
    }

    ngOnInit() {
        this.node = new Node;
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
        console.log(this.node)
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
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ?
                        errorsParse[index] : errorsParse[index][0]
                })
            }
        }
    }
}
