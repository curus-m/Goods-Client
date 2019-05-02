import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consts } from './consts';
import { Eroge } from '../item/Eroge';


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
export class GoodsService {
 
  constructor(private http: HttpClient) {
    
  }
  
  getEroge(): Observable<any> {
    return this.http.get(erogeServerURL,httpOptions);
  }
  
  getItem(indicator): Observable<any>{
    switch(indicator){
      case Consts.Goods.Eroge:
        return this.getEroge();
    }
  }
  addItem(indicator,item) : Observable<any> {
    switch(indicator){
      case Consts.Goods.Eroge:
        return this.addEroge(item);
    }
  }
  addEroge(item: Eroge) : Observable<any> {
    return this.http.post(erogeServerURL,item,httpOptions);
  }
}