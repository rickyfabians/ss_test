"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const logging_service_1 = require("./services/logging.service");
const sequelize_service_1 = require("./services/sequelize.service");
var express = require('express');
var process = require('process');
var vEnv = require('./config/mode.json')['mode'];
var bodyParser = require('body-parser');
var vValidator = require('validator');
var config = require('./config/config.json')[vEnv];
var multipart = require('connect-multiparty');
var path = require('path');
var multipartMiddleware = multipart({ uploadDir: path.join('./img-temp-dir') });
var app = express();
var router = express.Router();
var port = process.env.port || config.port || 4000; //configuration of port
let seq = new sequelize_service_1.SequelizeService();
let whiteList = (origin) => {
    var data = config.whitelist_domain; //whitelist
    for (let i in data) {
        if (origin == data[i])
            return origin;
    }
    if (data.length == 0)
        return null;
    else
        return data[0];
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    //update
    let origin = req.get('origin');
    let vOrigin = whiteList(origin);
    res.header("Access-Control-Allow-Origin", vOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,authorization,Proxy-Authorization,X-session,appVersion");
    res.header("Access-Control-Expose-Headers", "accessToken,created,Content-Disposition");
    res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
    res.header("X-XSS-Protection", "1");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Content-Security-Policy", "object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
    logging_service_1.Logging('incoming request host : ' + req.headers.host);
    logging_service_1.Logging('Incoming request method : ' + req.method);
    logging_service_1.Logging('Incoming request path : ' + req.path);
    logging_service_1.Logging('cookies : ' + JSON.stringify(req.cookies));
    next();
});
route_1.Routing(router, multipartMiddleware);
app.use('/api', router);
app.listen(port);
logging_service_1.Logging('listening : ' + port);
//# sourceMappingURL=main.js.map