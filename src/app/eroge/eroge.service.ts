import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Accept':'application/json',
    'Access-Control-Allow-Origin': '*'
   })
};
const erogeServerURL = 'http://127.0.0.1:8080/eroge/';
let result = '';
@Injectable()
export class ErogeService {
  constructor(private http: HttpClient) {
    
  }
  
  getEroge(): Observable<any> {
    return this.http.get(erogeServerURL,httpOptions);
  }
  addEroge(eroge) : Observable<any> {
    return this.http.post(erogeServerURL,httpOptions);
  }
}