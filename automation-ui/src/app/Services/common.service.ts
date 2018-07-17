import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';

import { ICommonService} from '../interfaces/interfaces';


@Injectable()
export class CommonService implements ICommonService {
    public EvtComponentDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isComponentDeleted:boolean;

    get IsComponentDeleted():boolean{
        return this.isComponentDeleted;
    }

    set IsComponentDeleted(value:boolean){
        this.isComponentDeleted = value;
        this.EvtComponentDeleted.emit(value);
    }

}

