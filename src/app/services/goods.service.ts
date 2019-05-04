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
const serverURL = 'http://127.0.0.1:8080/';
const erogeServerURL = serverURL+Consts.Goods.Eroge+'/';
const dakimakuraServerURL = serverURL+Consts.Goods.Dakimakura+'/';
let result = '';

@Injectable()
export class GoodsService {
 
  constructor(private http: HttpClient) {
    
  }
  
  getEroge(): Observable<any> {
    return this.http.get(erogeServerURL,httpOptions);
  }
  getDakimakura() :  Observable<any> {

    return this.http.get(dakimakuraServerURL,httpOptions);
  }
  getItem(indicator): Observable<any>{
    switch(indicator){
      case Consts.Goods.Eroge:
        return this.getEroge();
      case Consts.Goods.Dakimakura:
        return this.getDakimakura();
    }
  }
  addItem(indicator,item) : Observable<any> {
    switch(indicator){
      case Consts.Goods.Eroge:
        return this.addEroge(item);
      case Consts.Goods.Dakimakura:
        // return this.addEroge(item);
        return;
    }
  }
  addEroge(item: Eroge) : Observable<any> {
    return this.http.post(erogeServerURL,item,httpOptions);
  }
  dateMaker(obj : any) : string {
    let date = `${obj.year}-${obj.month}-${obj.day}`;
    return date;
  }
}