"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handling_service_1 = require("./error-handling.service");
const sequelize_service_1 = require("./sequelize.service");
const utility_1 = require("../shared/utility");
const logging_service_1 = require("./logging.service");
class SQLService {
    constructor() {
        logging_service_1.Logging('Initialize Data Access Service');
    }
    static executeSP(pSPName, pParams) {
        logging_service_1.Logging('Executing sp : ' + pSPName);
        return new Promise(function (pResolve, pReject) {
            try {
                logging_service_1.Logging('Parsing the data');
                let vParams = '';
                let length;
                let counter;
                if (pParams) {
                    counter = 0;
                    length = Object.keys(pParams).length;
                    //change the structure of parameter
                    for (let vParam in pParams) {
                        ++counter;
                        if (pParams[vParam] !== undefined && pParams[vParam] !== null && typeof pParams[vParam] === 'string' && pParams[vParam].indexOf('\'') !== -1) {
                            pParams[vParam] = utility_1.Utility.replaceAll(pParams[vParam], '\'', '\'\'');
                        }
                        vParams += "'" + pParams[vParam] + "'";
                        if (counter != length)
                            vParams += ',';
                    }
                }
                let vSQL = `CALL ${pSPName}(${vParams})`;
                logging_service_1.Logging('vSQL : ' + vSQL);
                sequelize_service_1.SequelizeService.sequelize.query(vSQL, { type: sequelize_service_1.SequelizeService.sequelize.QueryTypes.SELECT }).then(function (pResult) {
                    //If success
                    let vResult = pResult;
                    logging_service_1.Logging(vResult);
                    //Logging('Result: '+vResult);
                    if (vResult.length == 1 &&
                        ('ErrorNumber' in vResult[0]) &&
                        ('ErrorMessage' in vResult[0])) {
                        vResult = vResult[0];
                        logging_service_1.Logging('Error while executing query 1 : ' + vSQL);
                        error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, vResult.ErrorNumber, vResult.ErrorMessage);
                    }
                    else {
                        logging_service_1.Logging("success : ");
                        // Logging(vResult);
                        pResolve(vResult);
                    }
                }).catch(function (pErr) {
                    //If got error it will throwing error from the sequelize
                    logging_service_1.Logging('Error while executing query 2 : ' + vSQL);
                    logging_service_1.Logging('Error ' + pErr);
                    pReject(pErr);
                    error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, 400, pErr);
                });
            }
            catch (pErr) {
                logging_service_1.Logging(pErr);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, 400, pErr);
            }
        });
    }
}
exports.SQLService = SQLService;
//# sourceMappingURL=SQL.service.js.map