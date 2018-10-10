"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuccessResponseModel {
    static getSuccessResp(pData) {
        var resp = {
            result: 'Success',
            code: 200
        };
        if (pData) {
            resp["data"] = pData;
        }
        return resp;
    }
}
exports.SuccessResponseModel = SuccessResponseModel;
//# sourceMappingURL=successresponse.model.js.map