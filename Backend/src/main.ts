import { Routing } from './route';

import { Logging } from './services/logging.service';

import { SequelizeService } from './services/sequelize.service';

declare var require:any;

var express = require('express');
var process = require('process');

var vEnv = require('./config/mode.json')['mode'];
var bodyParser = require('body-parser');
var vValidator = require('validator');
var config = require('./config/config.json')[vEnv];
var multipart = require('connect-multiparty');
var path = require('path');
var multipartMiddleware = multipart({ uploadDir: path.join('./img-temp-dir')});

var app = express();
var router = express.Router();
var port: number = process.env.port || config.port || 4000; //configuration of port
let seq: SequelizeService = new SequelizeService();

let whiteList = (origin:string) => {
    var data = config.whitelist_domain; //whitelist
    for (let i in data) {
        if (origin == data[i])
            return origin;
    }
    if (data.length == 0)
        return null;
    else
        return data[0];
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req:any, res:any, next:any) {
    //update
    let origin = req.get('origin');
    let vOrigin = /*origin;*/whiteList(origin);
    res.header("Access-Control-Allow-Origin",vOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,authorization,Proxy-Authorization,X-session,appVersion");
    res.header("Access-Control-Expose-Headers", "accessToken,created,Content-Disposition");
    res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
    res.header("X-XSS-Protection", "1");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Content-Security-Policy", "object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");

    Logging('incoming request host : ' + req.headers.host);
    Logging('Incoming request method : ' + req.method);
    Logging('Incoming request path : ' + req.path);
    Logging('cookies : ' + JSON.stringify(req.cookies));

    next();
});
Routing(router, multipartMiddleware);
app.use('/api', router);
app.listen(port);
Logging('listening : ' + port);
