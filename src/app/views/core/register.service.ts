import {Injectable} from '@angular/core'
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AgriHub} from './global/agrihub';
import {User} from '../users/user.model';

@Injectable()
export class RegisterService {
    private registerUrl = AgriHub.BASE_API_URL + '/register/';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    register(user: User): Promise<any> {
        return this.http
            .post(this.registerUrl, user)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        // console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.json() || error);
    }

}
