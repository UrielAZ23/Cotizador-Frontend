import {Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Customer } from '../models/customer'
import { Global } from './global'

@Injectable()
export class CustomerService{
    public url!:string;
    constructor(
        private _http:HttpClient
    ){
        this.url= Global.url;
    }

    getCustomer(customerId:any):Observable<any>{
        return this._http.get(this.url+'getCustomer/'+customerId);
    }

    getCustomers(last:any=null):Observable<any>{
        if(last !=null){
            return this._http.get(this.url+'getCustomers/true')
        }else{
            return this._http.get(this.url+'getCustomers')
            
        }
    }

    saveCustomer(customer:any):Observable<any>{
        let params = JSON.stringify(customer);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'saveCustomer',params,{headers:headers});
    }

    updateCustomer(id:any, customer:any):Observable<any>{
        let params = JSON.stringify(customer);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'updateCustomer/'+id,params,{headers:headers});
    }

    deleteCustomer(id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'deleteCustomer/'+id,{headers:headers});

    }

    searchCustomer(customer:any):Observable<any>{
        let params = JSON.stringify(customer);
        let headers =new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'searchCustomer',params,{headers:headers});
    }

}