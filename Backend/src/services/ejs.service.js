"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./logging.service");
const vEnv = require('../config/mode.json')['mode'];
const vConfig = require('../config/config.json')[vEnv];
const vEjs = require('ejs');
const vPath = require('path');
const fs = require('fs');
class EJSService {
    constructor() {
        logging_service_1.Logging('Initialize EJS Service');
    }
    static renderHTML(ejsFile, params) {
        logging_service_1.Logging("@EJSService: renderHTML()");
        let message;
        let fileName = vConfig.sendGrid.emailTemplate[ejsFile];
        logging_service_1.Logging("@EJSService: filename: " + fileName);
        let filePath = vPath.join(__dirname, '../', fileName);
        logging_service_1.Logging("filePath : " + filePath);
        var content = fs.readFileSync(filePath, 'utf8');
        message = vEjs.render(content, params);
        return message;
    }
}
exports.EJSService = EJSService;
//# sourceMappingURL=ejs.service.js.map