import {Logging} from '../services/logging.service';

export class SuccessResponseModel {

    static getSuccessResp (pData?:any) {
        var resp:any = {
            result : 'Success',
            code : 200
        };

        if (pData) {
            resp["data"] = pData;
        }

        return resp;
    }
}