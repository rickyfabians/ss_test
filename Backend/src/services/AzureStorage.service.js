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
const vEnv = require('../config/mode.json')['mode'];
const vConfig = require('../config/config.json')[vEnv];
const accountName = vConfig.blob.accountName;
const accountKey = vConfig.blob.accountKey;
const vEjs = require('ejs');
const vPath = require('path');
const fs = require('fs');
class AzureStorageService {
    static createStorageContainer() {
        return __awaiter(this, void 0, void 0, function* () {
            var p = new Promise((resolve, reject) => {
                try {
                    logging_service_1.Logging("createStorageContainer()");
                    let azureService = require('azure-storage');
                    // old -> 7TwiHhI40Z/awuQcfaa6Kp76dwMYFpOZejBbamvYjbn1Ohs2PtReCuXQjd/n4bkFh22Q44l3Bov7Mqzsq7ZLdg==
                    let blobService = azureService.createBlobService(accountName, accountKey);
                    logging_service_1.Logging("Blob Service Created..");
                    blobService.createContainerIfNotExists('seraqcappcontainer', { publicAccessLevel: 'blob' }, function (error, result, response) {
                        if (error) {
                            logging_service_1.Logging('error create container');
                            logging_service_1.Logging(error);
                            reject(error);
                            return;
                        }
                        logging_service_1.Logging('result create container');
                        logging_service_1.Logging(result);
                        logging_service_1.Logging(response);
                        resolve();
                    });
                }
                catch (err) {
                    logging_service_1.Logging(err);
                    reject(err);
                }
            });
            return p;
        });
    }
    static uploadImage(pFilePath, blobName) {
        return __awaiter(this, void 0, void 0, function* () {
            var p = new Promise((resolve, reject) => {
                try {
                    logging_service_1.Logging("uploadImage()");
                    logging_service_1.Logging("Trying to upload image from " + pFilePath);
                    logging_service_1.Logging("Container name: seraqcappcontainer");
                    logging_service_1.Logging("Blob name: " + blobName);
                    let azureService = require('azure-storage');
                    let blobService = azureService.createBlobService(accountName, accountKey);
                    logging_service_1.Logging("Blob Service Created..");
                    blobService.createBlockBlobFromLocalFile('seraqcappcontainer', blobName, pFilePath, function (error, result, response) {
                        if (error)
                            logging_service_1.Logging(error);
                        logging_service_1.Logging(result);
                        logging_service_1.Logging(response);
                        resolve();
                    });
                }
                catch (err) {
                    logging_service_1.Logging(err);
                    reject(err);
                }
            });
            return p;
        });
    }
    static getFile(blobName) {
        return __awaiter(this, void 0, void 0, function* () {
            var p = new Promise((resolve, reject) => {
                try {
                    logging_service_1.Logging("getFile()");
                    let azureService = require('azure-storage');
                    let blobService = azureService.createBlobService(accountName, accountKey);
                    logging_service_1.Logging("Blob Service Created..");
                    var startDate = new Date();
                    var expiryDate = new Date(startDate);
                    expiryDate.setDate(startDate.getDate() + 365);
                    var sharedAccessPolicy = {
                        AccessPolicy: {
                            Permissions: azureService.BlobUtilities.SharedAccessPermissions.READ,
                            Start: startDate,
                            Expiry: expiryDate
                        },
                    };
                    logging_service_1.Logging("Shared access policy: ");
                    logging_service_1.Logging(sharedAccessPolicy);
                    var token = blobService.generateSharedAccessSignature('seraqcappcontainer', blobName, sharedAccessPolicy);
                    var sasUrl = blobService.getUrl('seraqcappcontainer', blobName, token);
                    logging_service_1.Logging("Image sasUrl successfully retrieved..");
                    logging_service_1.Logging(sasUrl);
                    resolve(sasUrl);
                }
                catch (err) {
                    reject();
                }
            });
            return p;
        });
    }
    static deleteFile(blobName) {
        return __awaiter(this, void 0, void 0, function* () {
            var p = new Promise((resolve, reject) => {
                try {
                    logging_service_1.Logging("deleteFile()");
                    let azureService = require('azure-storage');
                    let blobService = azureService.createBlobService(accountName, accountKey);
                    logging_service_1.Logging("Blob Service Created..");
                    blobService.deleteBlobIfExists('seraqcappcontainer', blobName, function (error, result, response) {
                        if (error)
                            logging_service_1.Logging(error);
                        logging_service_1.Logging(result);
                        logging_service_1.Logging(response);
                        resolve();
                    });
                }
                catch (err) {
                    reject();
                }
            });
            return p;
        });
    }
}
exports.AzureStorageService = AzureStorageService;
//# sourceMappingURL=AzureStorage.service.js.map