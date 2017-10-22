import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './user.model';
import { AgriHub } from '../core/global/agrihub';

import { CredentialsService } from '../core/authenticate/credentials.service';

@Injectable()
export class UserService {
    private userUrl = AgriHub.BASE_API_URL+'/users';
    private headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.credentialsService.getToken()
    });

    constructor(
        private http: Http,
        private credentialsService: CredentialsService
    ) {}

    getUsers(type: string): Observable<any> {
        let extraParam = "";

        if ("admin" == type) {
            extraParam += "?type=admin";
        } else if ("researcher" == type) {
            extraParam += "?type=researcher";
        }

        return this.http.get(`${this.userUrl}/${extraParam}`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUser(id: string): Observable<User> {
        return this.http.get(`${this.userUrl}/${id}/`, {headers: this.headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    save(user: User): Observable<User> {
        const url = user.id ? `${this.userUrl}/${user.id}/` : this.userUrl;
        var promise: Observable<Response>;

        if (url == this.userUrl ) {
            promise = this.http.post(`${url}/`, JSON.stringify(user), {headers: this.headers});
        } else {
            promise = this.http.put(url, JSON.stringify(user), {headers: this.headers});
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