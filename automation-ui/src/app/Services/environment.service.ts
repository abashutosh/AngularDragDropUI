import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class EnvironmentService {

  constructor(private _http:HttpClient) { }
  private _environemntDataUrl = './api/json/environment.json';
  getAllEnvironmentTeamDetailData(): Observable<any[]> {
    return this._http.get<any[]>(this._environemntDataUrl).catch(this.handleError);
  }

  getAllEnvironmentProjectOwner():  Observable<any[]> {
    return this._http.get<any[]>(this._environemntDataUrl).catch(this.handleError);
  }
  // getAllEnvironmentMainTechnology():  Observable<any[]> {
  //   return this._http.get<any[]>(this._environemntDataUrl).catch(this.handleError);
  // }
  // getAllEnvironmentBuildTool():  Observable<any[]> {
  //   return this._http.get<any[]>(this._environemntDataUrl).catch(this.handleError);
  // }

  SubmitOnBoardingProjectFormData( onBoarding: any ) : Observable<any[]> {
    const headers= new HttpHeaders().set('content-type', 'application/json');
   return this._http.post<any[]>(this._environemntDataUrl,onBoarding ,{headers})._catch(this.handleError);
  }


  handleError( err: HttpErrorResponse){
    return Observable.throw(err.message);
  }

}
