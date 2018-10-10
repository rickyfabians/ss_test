"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./logging.service");
const error_handling_service_1 = require("./error-handling.service");
class XMLReaderService {
    constructor() {
    }
    static readXML() {
        var fs = require('fs'), xml2js = require('xml2js');
        return new Promise((resolve, reject) => {
            try {
                var parser = new xml2js.Parser();
                fs.readFile(__dirname + '\\input.xml', function (err, data) {
                    parser.parseString(data, function (err, result) {
                        if (err) {
                            logging_service_1.Logging(err);
                            error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 400, err);
                            return;
                        }
                        resolve(result);
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging(err);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 400, err);
            }
        });
    }
    static readXMLSales() {
        logging_service_1.Logging("start readXMlSales Service");
        var fs = require('fs'), xml2js = require('xml2js');
        return new Promise((resolve, reject) => {
            try {
                logging_service_1.Logging("Trying to read file from " + __dirname);
                var parser = new xml2js.Parser();
                fs.readFile(__dirname + '/input_sales.xml', function (err, data) {
                    parser.parseString(data, function (err, result) {
                        logging_service_1.Logging("Records read");
                        logging_service_1.Logging(result);
                        if (err) {
                            logging_service_1.Logging(err);
                            error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 400, err);
                            return;
                        }
                        resolve(result);
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging(err);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 400, err);
            }
        });
    }
}
exports.XMLReaderService = XMLReaderService;
//# sourceMappingURL=XMLReader.service.js.map