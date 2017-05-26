import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Node } from './node.model';
import { AgriHub } from '../global/agrihub';

import { CredentialsService } from '../core/authenticate/credentials.service';

@Injectable()
export class NodeService {
    private nodeUrl = AgriHub.BASE_API_URL+'/nodes';
    private headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.credentialsService.getToken()
    });

    constructor(
        private http: Http,
        private credentialsService: CredentialsService
    ) {}

    getNodes(role: string): Observable<any> {
        let extraParam = "";

        if ("public" == role) {
            extraParam += "?role=public";
        } else if ("private" == role) {
            extraParam += "?role=private";
        } else if ("global" == role) {
            extraParam += "?role=global";
        }

        return this.http.get(`${this.nodeUrl}/${extraParam}`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getNode(id: string): Observable<Node> {
        return this.http.get(`${this.nodeUrl}/${id}/`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    save(node: Node): Observable<Node> {
        const url = node.id ? `${this.nodeUrl}/${node.id}/` : this.nodeUrl;
        var promise: Observable<Response>;

        if (url == this.nodeUrl ) {
            promise = this.http.post(`${url}/`, JSON.stringify(node), {headers: this.headers});
        } else {
            promise = this.http.put(url, JSON.stringify(node), {headers: this.headers});
        }

        return promise.map(this.extractData).catch(this.handleError);
    }

    delete(url: string): Observable<void> {
        return this.http.delete(url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    
    private handleError(error: any) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}