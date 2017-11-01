import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Supernode} from './supernode.model';
import {SupernodeService} from './supernode.service';

interface Errors {
    field: string,
    message: string
}

@Component({
    templateUrl: 'supernode-form.component.html'
})
export class SupernodeNewComponent implements OnInit {
    is_new = true;
    supernode: Supernode;

    errors: Errors[];

    constructor(private supernodeService: SupernodeService,
                private router: Router) {
    }

    ngOnInit() {
        this.supernode = new Supernode;
        this.supernode.label = 'UB';
        this.supernode.secretkey = 'rahasia';
        this.supernode.description = 'TEST';
    }

    save(): void {
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
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ?
                        errorsParse[index] : errorsParse[index][0]
                })
            }
        }
    }
}
