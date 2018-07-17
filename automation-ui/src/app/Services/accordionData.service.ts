import { Injectable } from '@angular/core';
import { IAccordionComponent } from '../interfaces/interfaces';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AccordionDataService {

    private _jsonDataUrl = './api/json/accordionData.json';
    constructor(private http: HttpClient) { }

    getAccordionMenus(): Observable<IAccordionComponent[]> {
        return this.http.get<IAccordionComponent[]>(this._jsonDataUrl)
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        //console.log(err.message);
        return Observable.throw(err.message);
    }

}
