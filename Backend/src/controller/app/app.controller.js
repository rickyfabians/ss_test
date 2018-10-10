"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./../../services/logging.service");
const error_handling_service_1 = require("../../services/error-handling.service");
const successresponse_model_1 = require("../../model/successresponse.model");
const vEnv = require('../../config/mode.json')['mode'];
const vConfig = require('../../config/config.json')[vEnv];
class AppController {
    constructor() {
        logging_service_1.Logging("Instantiate App Controller..");
    }
    getAppVersion(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result = vConfig.appVersion;
                pResponse.status(200).json(successresponse_model_1.SuccessResponseModel.getSuccessResp({ 'appVersion': result }));
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 54000, err);
                }
            }
        });
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map