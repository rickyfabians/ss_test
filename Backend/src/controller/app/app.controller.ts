import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { SuccessResponseModel } from '../../model/successresponse.model';

const vEnv = require('../../config/mode.json')['mode'];
const vConfig = require('../../config/config.json')[vEnv];

export interface AppControllerInterface{
    getAppVersion(pRequest:any, pResponse:any):any;
}

export class AppController implements AppControllerInterface{
    constructor(){
        Logging("Instantiate App Controller..");
    }
    
    async getAppVersion(pRequest:any, pResponse:any){
        try{
            var result:any = vConfig.appVersion;
            pResponse.status(200).json(SuccessResponseModel.getSuccessResp({'appVersion':result}));
        }
        catch(err){
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 54000, err);
            }
        }
    }
}