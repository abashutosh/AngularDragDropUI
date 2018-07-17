import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';

import {IAccordionProps_CICD,    
    AccordionProp_CICD, 
    IAccordionProps_ConfigMgmt,
    AccordionProp_ConfigMgmt,
    IAccordionProps_Aws,
    AccordionProp_Aws,
    IAccordionProps_CodeQuality,
    AccordionProp_CodeQuality,
    IAccordionProps_RepoManagement,
    AccordionProp_RepoManagement,
    IAccordionProps_Database,
    AccordionProp_Database
    } from '../interfaces/interfaces';


        
@Injectable()
export class AccordionPropService {
    constructor(private http: HttpClient) { }
    private propObj: any;

    //private objToBeReturned: Array<IAccordionProps_CICD>[];
    //private MyArrayType = Array<IAccordionProps_CICD>();
   

    getAccordionSpecifcProps(selectedComponentType){
        //var objToBeReturned = new Array<IAccordionProps_CICD>();
        var objToBeReturned = new Array<any>();
        
        switch (selectedComponentType){
            case "CICD":
                    this.propObj=  new AccordionProp_CICD();
                    objToBeReturned.push(this.propObj);
                break;

            case "ConfigManagement":
                    this.propObj=  new AccordionProp_ConfigMgmt();
                    objToBeReturned.push(this.propObj);
                break;

            case "AWSComponent":
                    this.propObj=  new AccordionProp_Aws();
                    objToBeReturned.push(this.propObj);
                break;

            case "CodeQuality":
                    this.propObj=  new AccordionProp_CodeQuality();
                    objToBeReturned.push(this.propObj);
                 break;

            case "RepoManagement":
                    this.propObj=  new AccordionProp_RepoManagement();
                    objToBeReturned.push(this.propObj);
                 break;

            case "Database":
                    this.propObj=  new AccordionProp_Database();
                    objToBeReturned.push(this.propObj);
                break;
        }
    return this.propObj;    
    }
    
}