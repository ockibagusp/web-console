import {Injectable} from '@angular/core'
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AgriHub} from './global/agrihub';

@Injectable()
export class LoginService {
    private loginUrl = AgriHub.BASE_API_URL + '/user-auth/';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    login(username: string, password: string): Promise<any> {
        return this.http
            .post(this.loginUrl, {username: username, password: password})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        // console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.json() || error);
    }

}
