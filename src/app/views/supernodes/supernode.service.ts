import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Supernode} from './supernode.model';
import {AgriHub} from '../core/global/agrihub';

import {CredentialsService} from '../core/authenticate/credentials.service';

@Injectable()
export class SupernodeService {
    private supernodeUrl = AgriHub.BASE_API_URL + '/supernodes';
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.credentialsService.getToken()
    });

    constructor(private http: Http,
                private credentialsService: CredentialsService) {
    }

    getSupernodes(page: number = 1): Observable<any> {
        return this.http.get(`${this.supernodeUrl}/?page=${page}`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSupernode(id: string): Observable<Supernode> {
        return this.http.get(`${this.supernodeUrl}/${id}/`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getNodes(supernodeid: string, role: string, page: number = 1): Observable<any> {
        let extraParam = '';

        if ('public' === role) {
            extraParam += '?role=public';
        } else if ('private' === role) {
            extraParam += '?role=private';
        } else if ('global' === role) {
            extraParam += '?role=global';
        }

        if ('' === extraParam) {
            extraParam += `?page=${page}`
        } else {
            extraParam += `&&page=${page}`
        }

        return this.http.get(`${this.supernodeUrl}/${supernodeid}/nodes/${extraParam}`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    save(supernode: Supernode): Observable<Supernode> {
        const url = supernode.id ? `${this.supernodeUrl}/${supernode.id}/` : this.supernodeUrl;
        let promise: Observable<Response>;

        if (url === this.supernodeUrl) {
            promise = this.http.post(`${url}/`, JSON.stringify(supernode), {headers: this.headers});
        } else {
            promise = this.http.put(url, JSON.stringify(supernode), {headers: this.headers});
        }

        return promise.map(this.extractData).catch(this.handleError);
    }

    delete(url: string): Observable<void> {
        return this.http.delete(url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
