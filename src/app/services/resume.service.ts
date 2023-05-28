import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class ResumeService{

    public url:string
    constructor(
        public _http:HttpClient
    ){
        this.url=Global.url
    }

    saveResume(resume:any):Observable<any>{
        let params = JSON.stringify(resume)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'saveResume',params,{headers:headers})
    }

    getsResume(last:any=null):Observable<any>{

        return this._http.get(this.url+'getsResume/'+last)
    }

    getResume(id:any):Observable<any>{
        return this._http.get(this.url+'getResume/'+id)
    }

    updateResume(id:any,resume:any):Observable<any>{
        let params = JSON.stringify(resume)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.put(this.url+'updateResume/'+id,params,{headers:headers})
    }
    
    deleteResume(id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.delete(this.url+'deleteResume/'+id,{headers:headers})
        
    }
    
    searchResume(resume:any):Observable<any>{
        let params = JSON.stringify(resume)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'searchResume',params,{headers:headers})
    }

    searchByIdFeature(idFeature):Observable<any>{
        return this._http.get(this.url+'searchByIdFeature/'+idFeature)
    }


}