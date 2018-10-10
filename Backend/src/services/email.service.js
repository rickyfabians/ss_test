"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./logging.service");
const error_handling_service_1 = require("./error-handling.service");
var vEnv = require('../config/mode.json')['mode'];
var config = require('../config/config.json')[vEnv];
var crypto = require("crypto");
const vPath = require("path");
const fs = require("fs");
const request = require("request");
class EmailService {
    constructor() {
    }
    static generateCode() {
        var chars = "0123456789";
        var max = 4;
        var code = "";
        var rnd = crypto.randomBytes(max);
        var value = new Array(max);
        var len = chars.length;
        for (var i = 0; i < max; i++) {
            value[i] = chars[rnd[i] % len];
            code += value[i];
        }
        ;
        return (code);
    }
    static sendResetPasswordLink(pEmail, pCode) {
        const mailjet = require('node-mailjet')
            .connect(config.mailjet.username, config.mailjet.password);
        const request = mailjet
            .post("send")
            .request({
            "FromEmail": "SDIP@mobil88.astra.co.id",
            "FromName": "Mobil88",
            "Subject": "Mobil88 - Reset Your Password",
            "Text-part": "Here is your password reset link!",
            "Html-part": pCode,
            "Recipients": [{ "Email": pEmail }]
        });
        request
            .then((result) => {
            logging_service_1.Logging(result.body);
        })
            .catch((err) => {
            logging_service_1.Logging(err.statusCode);
        });
    }
    static sendEmail(pSubject, pRecipient, pContent, attachmentName) {
        try {
            logging_service_1.Logging("@EmailService: sendEmail()");
            const SendGrid = require("@sendgrid/mail");
            SendGrid.setApiKey(config.sendGrid.API_KEY);
            const msg = {
                to: pRecipient,
                from: config.sendGrid.sender,
                subject: pSubject,
                html: pContent,
            };
            if (attachmentName) {
                var attachmentPath = vPath.join(__dirname, "../attachment/");
                logging_service_1.Logging("@EmailService: attachmentName found, reading file " + attachmentPath + attachmentName);
                fs.readFile(attachmentPath + attachmentName, function (err, data) {
                    if (err) {
                        logging_service_1.Logging("@EmailService: ERROR occured..");
                        error_handling_service_1.ErrorHandlingService.throwError(53000, err.toString);
                        return;
                    }
                    logging_service_1.Logging("@EmailService: PDF file retrieved. isBuffer: " + Buffer.isBuffer(data));
                    // let files:any =  [{filename: attachmentName, content: data}];
                    let files = [{ filename: attachmentName, path: attachmentPath + attachmentName }];
                    msg["files"] = files;
                    SendGrid.send(msg, function (err, httpStatus, body) {
                        logging_service_1.Logging(err);
                        logging_service_1.Logging(httpStatus);
                        logging_service_1.Logging(body);
                    });
                    logging_service_1.Logging("@EmailService: email sent..");
                    // var sendgrid = require("sendgrid")(config.sendGrid.API_KEY);
                    // var email = new sendgrid.Email();
                    // email.addTo(pRecipient);
                    // email.addFile(data);
                    // email.addSubject("asdfasdf");
                    // email.addForm("sera@astra.co.id");
                    // email.setHtml("asdasd");
                    // sendgrid.send(email, (error:any, json:string)=>{
                    //     if(error)
                    //         Logging("error");
                    //     Logging("AYAAAM");
                    //     Logging(json);
                    // });
                });
            }
            else {
                SendGrid.send(msg);
                logging_service_1.Logging("@EmailService: email sent..");
            }
        }
        catch (err) {
            error_handling_service_1.ErrorHandlingService.throwError(53000, err.toString());
        }
    }
    static sendEmail2(pSubject, pRecipient, pContent, attachmentName) {
        try {
            var request = require("request");
            var formData = {
                personalizations: [{
                        to: [{
                                email: pRecipient,
                            }],
                        subject: pSubject
                    }],
                from: {
                    email: "sera@astra.co.id",
                },
                content: [{
                        type: "text/html",
                        value: pContent
                    }],
                attachments: [{}]
            };
            var attachmentPath = vPath.join(__dirname, "../attachment/");
            logging_service_1.Logging("@EmailService: attachmentName found, reading file " + attachmentPath + attachmentName);
            fs.readFile(attachmentPath + attachmentName, function (err, data) {
                if (err) {
                    logging_service_1.Logging("@EmailService: ERROR occured..");
                    logging_service_1.Logging(JSON.stringify(err));
                    error_handling_service_1.ErrorHandlingService.throwError(53000, err.toString);
                    return;
                }
                logging_service_1.Logging("@EmailService: PDF file retrieved. isBuffer: " + Buffer.isBuffer(data));
                formData.attachments[0] = { content: data.toString("base64"), filename: attachmentName };
                logging_service_1.Logging("@EmailService: formData modified. Now making post request to SendGrid..");
                request.post({
                    url: "https://api.sendgrid.com/v3/mail/send",
                    headers: {
                        "Authorization": "Bearer " + config.sendGrid.API_KEY,
                        "Content-Type": "application/json"
                    },
                    body: formData,
                    json: true
                }, function (err, httpResponse, body) {
                    if (err) {
                        throw err;
                    }
                    logging_service_1.Logging('@EmailSerice: Upload successful!  Server responded with:' + JSON.stringify(body));
                });
            });
        }
        catch (err) {
            logging_service_1.Logging(err);
        }
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map