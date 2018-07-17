import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class SvcTreeDataService {

  private _environmentJsonDataUrl = './api/json/environmentData.json';
  private _monitorJsonDataUrl = './api/json/monitorData.json';
  constructor(private http: HttpClient) { }

  getMonitorData() {
    return this.http.get<any>(this._monitorJsonDataUrl)
      .toPromise()
      .then(res => <TreeNode[]>res.MonitorData);
  }

  getEnvironmentData() {
    return this.http.get<any>(this._environmentJsonDataUrl)
      .toPromise()
      .then(res => <TreeNode[]>res.EnvironmentData);
  }


}
