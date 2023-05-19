import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Global } from "./global";


@Injectable()
export class FeatureService{

    public url:string
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url
    }


    createFeature(feature:any):Observable<any>{

        let params = JSON.stringify(feature);
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'saveFeature',params,{headers:headers})
    }

    getFeatures(last:any=null):Observable<any>{
        

        return this._http.get(this.url+'getFeatures/'+last)

    }
}