
import {ErrorHandlingService} from './error-handling.service';
import {Logging} from './logging.service'
declare var require:any;
var vEnv = require('../config/mode.json')['mode'];
var vConfig = require('../config/config.json')[vEnv];

export class AppCheckService{
    constructor(){
        Logging("Initialise App Checker Service..");
    }

    async checkAppVersion(pRequest:any, pResponse:any, next:any){
        Logging("Ver")
        if(pRequest.method == 'OPTIONS') next();
		if(pRequest.headers.appversion!=vConfig.appVersion){
			Logging("Version did not match..");
			ErrorHandlingService.throwHTTPErrorResponse(pResponse,403,302, 'Versi aplikasi sudah tidak di support');
		}
		else{
            next();
        }
    }
}