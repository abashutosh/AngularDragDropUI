import { IMessage, ILoaderMessage } from '../models/viewModels';
import { page } from '../models/enums';
import { EventEmitter } from '@angular/core';

export interface ICommonService {
    EvtComponentDeleted: EventEmitter<boolean>;
    IsComponentDeleted:boolean;
}

export interface IMessageService {
    Message: IMessage;
    CurrentPage: page;
    LoaderMessage: ILoaderMessage;
    LoaderMessageAdded: EventEmitter<ILoaderMessage>;
}

export interface IAccordionComponent {
    id: string;
    imageSrc: string;
    name: string;
    type: string;
    version: string;
    childProps: any[];
}

export interface ICanvasProps {
    canvasFill: string;
    canvasImage: string;
    id: number;
    opacity: number;
    fill: string;
    fontSize: string;
    lineHeight: string;
    charSpacing: string;
    fontWeight: boolean;
    fontStyle: boolean;
    textAlign: string;
    fontFamily: string;
    TextDecoration: string;
}

export class CanvasProps implements ICanvasProps {
    /**
     *
     */

    public canvasFill: string = '#fff';
    public canvasImage: string = './assets/img/background.png';
    public id: number = 0;
    public opacity: number = 100;
    public fill: string;
    public fontSize: string;
    public lineHeight: string;
    public charSpacing: string;
    public fontWeight: boolean;
    public fontStyle: boolean;
    public textAlign: string;
    public fontFamily: string;
    public TextDecoration: string = '';
}

export interface IAccordionProps_CICD {
    id:number;
    name:string;
    node:string;
    ipAddress:string;
}

export interface IAccordionProps_ConfigMgmt {
    id:number;
    name:string;
    node:string;
    ipAddress:string;
    testProp1:string;
    testProp2:string;
}

export interface IAccordionProps_Aws {
    id:number;
    name:string;
    node:string;
    ipAddress:string;
    testProp3:string;
    testProp4:string;
}

export interface IAccordionProps_CodeQuality {
    id:number;
    name:string;
    node:string;
    ipAddress:string;
    testProp5:string;
    testProp6:string;
}

export interface IAccordionProps_RepoManagement {
    id:number;
    name:string;
    node:string;
    ipAddress:string;
}

export interface IAccordionProps_Database {
    id:number;
    name:string;
    node:string;
    ipAddress:string;
}



export class AccordionProp_CICD implements IAccordionProps_CICD {
    public id:number = 0;
    public name:string="";
    public node:string="";
    public ipAddress:string="";
}

export class AccordionProp_ConfigMgmt implements IAccordionProps_ConfigMgmt {
    public id:number = 0;
    public name:string="";
    public node:string="";
    public ipAddress:string="";
    public testProp1:string="";
    public testProp2:string="";
}

export class AccordionProp_Aws implements IAccordionProps_Aws {
    public id:number = 0;
    public name:string="";
    public node:string="";
    public ipAddress:string="";
    testProp3:string="";
    testProp4:string="";
}

export class AccordionProp_CodeQuality implements IAccordionProps_CodeQuality {
    public id:number = 0;
    public name:string="";
    public node:string="";
    public ipAddress:string="";
    testProp5:string="";
    testProp6:string="";
}

export class AccordionProp_RepoManagement implements IAccordionProps_RepoManagement {
    public id:number = 0;
    public name:string="";
    public node:string="";
    public ipAddress:string="";
}

export class AccordionProp_Database implements IAccordionProps_Database {
    public id:number = 0;
    public name:string="";
    public node:string="";
    public ipAddress:string="";
}
