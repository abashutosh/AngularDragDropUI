import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { toObservable } from '@angular/forms/src/validators';

@Injectable()
export class DesignService {

  constructor(private http: Http) { }

  publish(jsonData: JSON) {
    // ToDo: To call actual server URL by uncommenting below code.
    return this.http.post('http://192.168.139.77/ansible/', jsonData);
    // return Observable.of(true);
  }
}
