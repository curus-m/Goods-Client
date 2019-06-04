import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consts } from './consts';
import { Eroge } from '../item/Eroge';
import { Dakimakura } from '../item/Dakimakura';


const getHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Accept':'application/json',
    'Access-Control-Allow-Origin': '*'
   })
};
const postHttpOptions = {
  headers: new HttpHeaders({
    'Contnet-Type': 'multipart/form-data; boundary=Eroge',
    'Authorization': 'my-auth-token',
    'Accept':'*/*',
    'Access-Control-Allow-Origin': '*'
   })
};


const serverURL = 'http://127.0.0.1:8080/';
const erogeServerURL = serverURL+Consts.Goods.Eroge+'/';
const dakimakuraServerURL = serverURL+Consts.Goods.Dakimakura+'/';
const resourceURL = serverURL + "resources/";
let result = '';

@Injectable()
export class GoodsService {
 
  constructor(private http: HttpClient) {
    
  }
  
  getEroge(): Observable<any> {
    return this.http.get(erogeServerURL,getHttpOptions);
  }
  getDakimakura() :  Observable<any> {
    return this.http.get(dakimakuraServerURL,getHttpOptions);
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
        return this.addDakimakura(item);
    }
  }
  addEroge(item: Eroge) : Observable<any> {
    return this.http.post(erogeServerURL,item,postHttpOptions);
  }
  addDakimakura(item: Dakimakura) : Observable<any> {
    return this.http.post(dakimakuraServerURL,item,postHttpOptions);
  }
  editItem(indicator, item) : Observable<any> {
    switch(indicator){
      case Consts.Goods.Eroge:
        return this.editEroge(item);
      case Consts.Goods.Dakimakura:
        return this.editDakimakura(item);
    }
  }
  deleteItem(indicator, item) : Observable<any> {
    switch(indicator){
      case Consts.Goods.Eroge:
        return this.deleteEroge(item);
      case Consts.Goods.Dakimakura:
        return this.deleteDakimakura(item);
    }
  }
  editEroge(eroge : Eroge) : Observable<any> {
    return this.http.put(erogeServerURL,eroge,getHttpOptions);
    // (erogeServerURL+`${no}`,httpOptions);
  }
  editDakimakura(dakimakura: Dakimakura) : Observable<any> {
    return this.http.put(dakimakuraServerURL,dakimakura,getHttpOptions);
  }
  deleteEroge(no: number) : Observable<any> {
    return this.http.delete(erogeServerURL+`${no}`,getHttpOptions);
  }
  deleteDakimakura(no: number) : Observable<any> {
    return this.http.delete(dakimakuraServerURL+`${no}`,getHttpOptions);
  }
  dateMaker(obj : any) : string {
    let date = `${obj.year}-${obj.month}-${obj.day}`;
    return date;
  }
  setImage(indicator : string ,formData : FormData) : Observable<any>{
    let url = resourceURL+indicator+"/";
    return this.http.post(url,formData,getHttpOptions);
  }
}