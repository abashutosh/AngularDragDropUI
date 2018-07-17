import { messageType, spinnerType } from './enums';

export interface ILoaderMessage {
    id: string;
    headerMessage: string;
    footerMessage: string;
    showLoader: boolean;
}

export interface IMessage {
    showMessage: boolean;
    message: string;
    type: messageType;
}

export interface ILoaderMessage {
    id: string;
    type: spinnerType;
    headerMessage: string;
    footerMessage: string;
    showLoader: boolean;
}

export interface IToolProperties {
    name:string;
    type:string;
    version:string;
    iSCMProperties:ISCMProperties;
}

export interface ISCMProperties {
    devOpsEnvironment: string;
    projectName: string;
    projectID: string;
    projectOwner: string;
}

