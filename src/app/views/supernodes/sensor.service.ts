import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {AgriHub} from '../core/global/agrihub';
import {Supernode} from './supernode.model';
import {Sensor} from './sensor.model';

import {CredentialsService} from '../core/authenticate/credentials.service';

@Injectable()
export class SensorService {
    private supernodeUrl = AgriHub.BASE_API_URL + '/supernodes';
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.credentialsService.getToken()
    });

    constructor(private http: Http,
                private credentialsService: CredentialsService) {
    }

    getSensors(supernodeid: string, page: number = 1): Observable<any> {
        return this.http.get(
                `${this.supernodeUrl}/${supernodeid}/sensors/?page=${page}`, {headers: this.headers}
            ).map(this.extractData)
            .catch(this.handleError);
    }

    getSensor(supernodeid: string, sensorid: string): Observable<any> {
        return this.http.get(
                `${this.supernodeUrl}/${supernodeid}/sensors/${sensorid}/`, {headers: this.headers}
            ).map(this.extractData)
            .catch(this.handleError);
    }

    save(supernode: Supernode, sensor: Sensor): Observable<any> {
        const url = sensor.id ? `${this.supernodeUrl}/${supernode.id}/sensors/${sensor.id}/` :
            `${this.supernodeUrl}/${supernode.id}/sensors/`;
        let promise: Observable<Response>;

        if (url === `${this.supernodeUrl}/${supernode.id}/sensors/`) {
            promise = this.http.post(url, JSON.stringify(sensor), {headers: this.headers});
        } else {
            promise = this.http.put(url, JSON.stringify(sensor), {headers: this.headers});
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
