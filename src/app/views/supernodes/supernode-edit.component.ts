import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Supernode } from './supernode.model';
import { SupernodeService } from './supernode.service';
import 'rxjs/add/operator/switchMap';

import { CredentialsService } from '../core/authenticate/credentials.service';

@Component({
    templateUrl: 'supernode-form.component.html'
})
export class SupernodeEditComponent implements OnInit {
    supernode: Supernode;
    is_new:boolean = false;

    errors: Array<{ field: string, message: string}>;

    constructor(
        private supernodeService: SupernodeService,
        private route: ActivatedRoute,
        private credentialsService: CredentialsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.supernodeService.getSupernode(params['id']))
            .subscribe(
                supernode => this.setUpSupernode(supernode),
                error => console.log(error)
            );
        // TODO why?
        this.supernode = new Supernode;
    }

    private setUpSupernode(supernode: Supernode): void {
        // raise 403 when node is not owned by this auth user
        if (supernode.user != this.credentialsService.getUser().username) {
            this.router.navigateByUrl('/page/403', { skipLocationChange: true });
        }
        this.supernode = supernode;
    }

    public save(): void {
        this.supernodeService.save(this.supernode)
            .subscribe(
                supernode => this.router.navigate(['/supernodes/view', supernode.id]),
                error => this.extractErrors(error)
            );
    }

    private extractErrors(err: any): void {
        let errorsParse = JSON.parse(err._body);
        this.errors = [];
        for(let index in errorsParse) {
            if(errorsParse.hasOwnProperty(index)) {
                this.errors.push({
                    field: index,
                    message: typeof errorsParse[index] === 'string' ? 
                        errorsParse[index]: errorsParse[index][0]
                })
            }
        }
    }
}