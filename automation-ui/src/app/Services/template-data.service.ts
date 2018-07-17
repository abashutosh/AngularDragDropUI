import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import { HttpClient, HttpErrorResponse } from '@angular/common/http';


 @Injectable()
 export class TemplateDataService {

   private _jsonDataUrl = './api/json/templateData.json';
   private _envTemplateJsonDataUrl = './api/json/environmentTemplateData.json';

   constructor( private http: HttpClient) { }

   getAllTemplateData(): Observable<any[]> {
   return this.http.get<any[]>(this._jsonDataUrl)
                   .catch(this.handleError);
   }

   getEnvironmentTemplateData(): Observable<any[]> {
    return this.http.get<any[]>(this._envTemplateJsonDataUrl)
                    .catch(this.handleError);
    }


   private handleError(err: HttpErrorResponse) {
    // console.log('error occured while getting data from service', err.message);
     return Observable.throw(err.message);
 }
 }
