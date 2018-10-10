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
const logging_service_1 = require("./logging.service");
const error_handling_service_1 = require("./error-handling.service");
const SQL_service_1 = require("../services/SQL.service");
var vEnv = require('../config/mode.json')['mode'];
var config = require('../config/config.json')[vEnv];
var request = require('xhr-request');
class FirebaseService {
    constructor() {
    }
    static sendNotification(pTargetDeviceToken, pTitle, pBody, pData, pUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // datap preparation
                var link = "https://fcm.googleapis.com/fcm/send";
                var body = {
                    to: pTargetDeviceToken,
                    priority: "high",
                    content_available: true,
                    notification: {
                        body: pBody,
                        title: pTitle
                    },
                    data: pData,
                    id: '1AHM'
                };
                logging_service_1.Logging("Send notification via " + link + " service..");
                logging_service_1.Logging("With request body: ");
                logging_service_1.Logging(body);
                // insert noniotificatinoi data to database
                var params = {
                    json: JSON.stringify(body),
                    id: pUserId,
                    // status : data.success
                    status: 0
                };
                let vNotif = yield FirebaseService.notifhistory(params);
                body.data.id = vNotif[0].id;
                body.data.opened = vNotif[0].opened;
                body.data.read = vNotif[0].read;
                body.data.last_modified_date = vNotif[0].last_modified_date;
                // make requst to firebase
                request(link, {
                    method: 'POST',
                    json: true,
                    body: body,
                    responseType: 'json',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "key=" + config.fcm.serverkey
                    }
                }, function (err, data) {
                    logging_service_1.Logging("Firebase result for Device Token : " + pTargetDeviceToken);
                    logging_service_1.Logging("Notification data :");
                    logging_service_1.Logging(data);
                    // update database  based on the firebase respponse
                    var paramss = {
                        id_notification_history: JSON.stringify(body.data.id),
                        userid: pUserId,
                        // status : data.success
                        status: data != null ? data.success : '0'
                        // status: '1'
                    };
                    let vNotifUpdate = FirebaseService.notifhistoryUpdate(paramss);
                    // Logging(result);
                });
                // let vRes = SuccessResponseModel.getSuccessResp(vNotif);
                // pResponse.status(200).json(vRes);
                // let result =  SQLService.executeSP('mi_home_notif_history',body);
                // body.status(200).json(SuccessResponseModel.getSuccessResp());
                // return result;
            }
            catch (err) {
                logging_service_1.Logging("Catch Error Sending Notification");
                logging_service_1.Logging(err);
                throw 503;
            }
        });
    }
    static notifhistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield SQL_service_1.SQLService.executeSP('mi_notification_history_insert', params);
                return result;
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwError(err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwError(56000, err);
                }
            }
        });
    }
    static notifhistoryUpdate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield SQL_service_1.SQLService.executeSP('[mi_notification_history_statusInsert_update]', params);
                return result;
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwError(err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwError(56000, err);
                }
            }
        });
    }
}
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map