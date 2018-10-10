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
const error_handling_service_1 = require("./error-handling.service");
const logging_service_1 = require("./logging.service");
var vEnv = require('../config/mode.json')['mode'];
var vConfig = require('../config/config.json')[vEnv];
class AppCheckService {
    constructor() {
        logging_service_1.Logging("Initialise App Checker Service..");
    }
    checkAppVersion(pRequest, pResponse, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging("Ver");
            if (pRequest.method == 'OPTIONS')
                next();
            if (pRequest.headers.appversion != vConfig.appVersion) {
                logging_service_1.Logging("Version did not match..");
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 403, 302, 'Versi aplikasi sudah tidak di support');
            }
            else {
                next();
            }
        });
    }
}
exports.AppCheckService = AppCheckService;
//# sourceMappingURL=AppCheck.service.js.map