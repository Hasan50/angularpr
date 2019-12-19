
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
 import { AppConfig } from '../app.config';
import { User } from 'app/models/user';


@Injectable()
export class AuthenticationService {
 
    constructor(private http: HttpClient, private config: AppConfig) {

     }

   public login(username: string, password: string) {
        return  this.http.post<any>(this.config.apiUrl + 'AccountApi/GenerateToken', { LoginID: username, Password: password })
            .pipe(map(user => {
                if (user && user.Token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userKey', user.UserKey);
                }
                return user;
            }));
    }

   public logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userKey');
        console.log("logout");
    }
 
   public isAuthenticated() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.Token) {
            return true;
        } 
        return false;
    }
    public get currentUserValue(): User {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser;
    }
}
