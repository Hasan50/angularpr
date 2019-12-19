import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../app.config';
import 'rxjs/add/operator/map'
import { timestamp } from 'rxjs/operators';

@Injectable()
export class CommonService {
  
   userId: string
    length:number
    timestamp:any
    constructor(private http: HttpClient, private config: AppConfig){
      this.userId = localStorage.getItem("userKey");
    }

    public UniqueNumber() {
        this.length = 8;
        this.timestamp = +new Date;
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
        for( var i = 0; i < this.length; ++i ) {
           var index = this._getRandomInt( 0, parts.length - 1 );
           id += parts[index];	 
        }
        return id;
    }

    private _getRandomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
     }
     public IsNullOrEmpty(value:any){
      if (value=== null || value==="") {
         return true;
      }
     }
}
