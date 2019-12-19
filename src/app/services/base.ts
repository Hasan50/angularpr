import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {AuthenticationService} from './authentication.service';

export class Base {    
    constructor(protected authenticationService: AuthenticationService) {
      
    }
    // protected jwt() {
    //     if(this.authenticationService.isAuthenticated){
    //         // create authorization header with jwt token            
    //             let headers = new Headers({ 'Authorization': 'bearer ' + this.authenticationService.getCurrentUser().token });
    //             return new RequestOptions({ headers: headers });
    //         }
    //         else {
    //             //redirect to login page with information
    //         }
    //     }    
}
