"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./logging.service");
const error_handling_service_1 = require("./error-handling.service");
const utility_1 = require("../shared/utility");
var vEnv = require('../config/mode.json')['mode'];
var config = require('../config/config.json')[vEnv];
var ftpConfig = config.ftp.config;
var FTP = require('ftp');
class FTPService {
    constructor() {
        logging_service_1.Logging("Initialise FTP Service..");
        FTPService.FTPClient = new FTP();
    }
    // ============================ FTP Service ============================
    setFTPConfig(FTPConfig) {
        FTPService.FTPConfig = FTPConfig;
    }
    makeConnection() {
        logging_service_1.Logging("Make connection to FTP server..");
        logging_service_1.Logging(FTPService.FTPConfig);
        var p = new Promise((resolve, reject) => {
            FTPService.FTPClient.connect(FTPService.FTPConfig);
            FTPService.FTPClient.on('ready', () => {
                resolve(true);
            });
            FTPService.FTPClient.on('error', (err) => {
                reject(err);
            });
        });
        return p;
    }
    getDirectoryList(dir) {
        logging_service_1.Logging("Target dir : " + dir);
        var p = new Promise((resolve, reject) => {
            try {
                FTPService.FTPClient = new FTP();
                logging_service_1.Logging("FTPService client created..");
                FTPService.FTPClient.connect(FTPService.FTPConfig);
                logging_service_1.Logging(FTPService.FTPConfig);
                FTPService.FTPClient.on('ready', () => {
                    FTPService.FTPClient.list(dir, false, (err, list) => {
                        if (err) {
                            logging_service_1.Logging("Error getting the directory list..");
                            logging_service_1.Logging(err);
                            reject(err);
                        }
                        logging_service_1.Logging("Directory list found..");
                        let res = utility_1.Utility.findJSON(list, 'type', '-');
                        FTPService.FTPClient.end();
                        resolve(res);
                    });
                });
                FTPService.FTPClient.on('error', (err) => {
                    logging_service_1.Logging(err);
                    FTPService.FTPClient.end();
                    reject(err);
                });
            }
            catch (err) {
                reject(err);
            }
        });
        return p;
    }
    getFile(sourceFilePath, destFilePath) {
        logging_service_1.Logging("Source dir : " + sourceFilePath);
        logging_service_1.Logging("Dest dir   : " + destFilePath);
        var p = new Promise((resolve, reject) => {
            try {
                FTPService.FTPClient = new FTP();
                FTPService.FTPClient.connect(FTPService.FTPConfig);
                FTPService.FTPClient.on('ready', () => {
                    FTPService.FTPClient.get(sourceFilePath, function (err, stream) {
                        if (err) {
                            logging_service_1.Logging("Failed to get the data from path..");
                            logging_service_1.Logging(err);
                            reject(err);
                        }
                        var result = "";
                        stream.on('data', function (chunk) {
                            result += chunk;
                        });
                        stream.on('end', function () {
                            logging_service_1.Logging(result);
                            FTPService.FTPClient.end();
                            resolve(result);
                        });
                        // stream.once('close', function() { FTPService.FTPClient.end(); });
                        // stream.pipe(fs.createWriteStream(destFilePath));
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging(err);
                FTPService.FTPClient.end();
                reject(err);
            }
        });
        return p;
    }
    putFile(data, destFilePath) {
        logging_service_1.Logging("Putting file..");
        logging_service_1.Logging("Dest dir : " + destFilePath);
        var p = new Promise((resolve, reject) => {
            try {
                FTPService.FTPClient = new FTP();
                FTPService.FTPClient.connect(FTPService.FTPConfig);
                FTPService.FTPClient.on('ready', () => {
                    FTPService.FTPClient.put(data, destFilePath, function (err) {
                        if (err) {
                            FTPService.FTPClient.end();
                            reject(err);
                            throw err;
                        }
                        logging_service_1.Logging("Output File Success");
                        FTPService.FTPClient.end();
                        resolve("OK");
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging(err);
                FTPService.FTPClient.end();
                reject(err);
            }
        });
        return p;
    }
    deleteFile(filePath) {
        var p = new Promise((resolve, reject) => {
            try {
                FTPService.FTPClient = new FTP();
                FTPService.FTPClient.connect(FTPService.FTPConfig);
                FTPService.FTPClient.on('ready', () => {
                    FTPService.FTPClient.delete(filePath, function (err) {
                        if (err) {
                            FTPService.FTPClient.end();
                            reject(err);
                        }
                        FTPService.FTPClient.end();
                        resolve();
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging(err);
                FTPService.FTPClient.end();
                reject(err);
            }
        });
        return p;
    }
    moveFile(sourceFilePath, destFilePath) {
        var p = new Promise((resolve, reject) => {
            try {
                FTPService.FTPClient = new FTP();
                logging_service_1.Logging("FTPService client created..");
                FTPService.FTPClient.connect(FTPService.FTPConfig);
                logging_service_1.Logging(FTPService.FTPConfig);
                logging_service_1.Logging("move " + sourceFilePath + " to " + destFilePath);
                FTPService.FTPClient.on('ready', () => {
                    FTPService.FTPClient.rename(sourceFilePath, destFilePath, function (err) {
                        if (err) {
                            FTPService.FTPClient.end();
                            logging_service_1.Logging(err);
                            reject(err);
                        }
                        FTPService.FTPClient.end();
                        resolve();
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging(err);
                FTPService.FTPClient.end();
                reject(err);
            }
        });
        return p;
    }
    convertXML2JSON(xml) {
        logging_service_1.Logging("Converting XML to JSON..");
        var parser = require('xml2js');
        var stripPrefix = require('xml2js').processors.stripPrefix;
        var p = new Promise((resolve, reject) => {
            try {
                parser.parseString(xml, { tagNameProcessors: [stripPrefix] }, function (err, result) {
                    if (err) {
                        logging_service_1.Logging(err);
                        FTPService.FTPClient.end();
                        reject(err);
                    }
                    FTPService.FTPClient.end();
                    resolve(result);
                });
            }
            catch (err) {
                logging_service_1.Logging(err);
                FTPService.FTPClient.end();
                reject(err);
            }
        });
        return p;
    }
    readFile(sourceFilePath) {
        var p = new Promise((resolve, reject) => {
            var fs = require('fs');
            logging_service_1.Logging("Read file from path : " + sourceFilePath);
            // fs.readFile(sourceFilePath, function(err:any, data:any){
            //     if(err){
            //         Logging(err);
            //         reject(err);
            //     }
            //     Logging("Finish read file..");
            //     Logging(data);
            // });
            var result = fs.readFileSync(sourceFilePath);
            logging_service_1.Logging(result.toString('utf-8'));
            resolve(result.toString('utf-8'));
        });
        return p;
    }
    ;
    saveFile(data, destFilePath) {
        var p = new Promise((resolve, reject) => {
            try {
                var fs = require('fs');
                // fs.writeFileSync(destFilePath, data, function(err:any){
                //     if(err)
                //         reject(err);
                //     resolve();
                // });
                logging_service_1.Logging("Writefilesync..");
                fs.writeFileSync(destFilePath, data);
                resolve();
            }
            catch (err) {
                logging_service_1.Logging(err);
                reject(err);
            }
        });
        return p;
    }
    closeConnection() {
        var p = new Promise((resolve, reject) => {
            FTPService.FTPClient.logout(function (err) {
                if (err) {
                    logging_service_1.Logging("Error while logging out the user..");
                    logging_service_1.Logging(err);
                    reject(err);
                }
                logging_service_1.Logging("User has been logged out from FTP server..");
                resolve();
            });
        });
        return p;
    }
    // =================================================================================
    testFTPSera() {
        return new Promise((pResolve, pReject) => {
            try {
                logging_service_1.Logging("Start FTPService - testFTPSera()");
                var ftpConfSera = {
                    host: "118.97.80.20",
                    port: 990,
                    secure: "implicit",
                    user: "m88",
                    password: "jGDrsxr#CDjAf5Uy",
                    secureOptions: {
                        rejectUnauthorized: false
                    }
                };
                logging_service_1.Logging("FTP Config : ");
                logging_service_1.Logging(JSON.stringify(ftpConfSera));
                // var ftpclient = require('ftp');
                // var ftpsera = new ftpclient();
                // Logging("Try connecting...");
                // ftpsera.connect(ftpConfSera);
                // ftpsera.on('greeting',(msg:any)=>{
                //     Logging(msg);
                // });
                // ftpsera.on('ready', ()=> {
                //     Logging("FTP Connection Successfully Established");
                //     pResolve("OK");
                // });
                // ftpsera.on('error', (err:any)=> {
                //     Logging("FTP Connection FAILED");
                //     Logging("Error obj : " + err);
                //     if(err.code){
                //         ErrorHandlingService.throwPromiseError(pReject, err.code, err.toString());
                //     }
                //     else{
                //         ErrorHandlingService.throwPromiseError(pReject, 70000, "[API] FTP general error : " + err.toString());
                //     }
                // });
                var PromiseFtp = require('promise-ftp');
                var ftp = new PromiseFtp();
                ftp.connect(ftpConfSera)
                    .then(function (serverMessage) {
                    console.log('Server message: ' + serverMessage);
                    return ftp.list('/');
                }).then(function (list) {
                    console.log('Directory listing:');
                    console.dir(list);
                    return ftp.end();
                });
            }
            catch (err) {
                logging_service_1.Logging("FTP Connection FAILED");
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, err.code, err.toString());
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, 70000, "[API] FTP general error : " + err.toString());
                }
            }
        });
    }
    readInputFileList() {
        return new Promise((pResolve, pReject) => {
            try {
                logging_service_1.Logging("Masuk readInputFileList()");
                var inputPath = config.ftp.folder.input;
                this._FTPClient = new FTP();
                this._FTPClient.connect(ftpConfig);
                logging_service_1.Logging("ftpConfig : " + JSON.stringify(ftpConfig));
                logging_service_1.Logging("inputPath : " + inputPath);
                this._FTPClient.on('ready', () => {
                    logging_service_1.Logging("Connection SUCCESSFULLY established");
                    this._FTPClient.list(inputPath, false, (err, list) => {
                        logging_service_1.Logging("Reading input folder...");
                        if (err) {
                            logging_service_1.Logging("Got Promise error");
                            error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, 70000, "[API] FTP promise error : " + err.toString());
                        }
                        logging_service_1.Logging("Reading input folder completed");
                        // let res:any = Utility.findJSON(list, 'type', '-');
                        let res = list;
                        logging_service_1.Logging("File Data : ");
                        logging_service_1.Logging(JSON.stringify(res));
                        this._FTPClient.end();
                        pResolve(res);
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging("readInputFileList error : " + err);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, 70000, "[API] FTP general error : " + err.toString());
            }
        });
    }
    loadXMLContent(vFileName) {
        return new Promise((resolve, reject) => {
            try {
                let context = this;
                var fs = require('fs'), xml2js = require('xml2js');
                logging_service_1.Logging("Masuk getXMLContent()");
                var inputPath = config.ftp.folder.input;
                var outputPath = config.ftp.folder.output;
                var filePath = inputPath + vFileName;
                var parser = new xml2js.Parser();
                var path = require('path');
                logging_service_1.Logging("filePath : " + filePath);
                context._FTPClient = new FTP();
                context._FTPClient.connect(ftpConfig);
                context._FTPClient.on('ready', () => {
                    let contextResolve = resolve;
                    context._FTPClient.get(filePath, function (err, stream) {
                        logging_service_1.Logging("Trying to get XMl data");
                        if (err) {
                            logging_service_1.Logging("getFileValue error : " + err);
                            error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 70000, "[API] Read FTP file error : " + err.toString());
                        }
                        stream.on('data', (data) => {
                            logging_service_1.Logging("Data found");
                            parser.parseString(data, function (err, result) {
                                if (err) {
                                    logging_service_1.Logging("Error when parsing data");
                                    context._FTPClient.end();
                                    reject(err);
                                    return;
                                }
                                logging_service_1.Logging("Finish parse XML data");
                                FTPService.XMLData = result;
                                context._FTPClient.end();
                                contextResolve(result);
                            });
                        });
                        // stream.once('close', function() { context._FTPClient.end(); });
                        // stream.pipe(fs.createWriteStream(path.join(__dirname,'../../xml-temp-dir',vFileName)));
                        resolve();
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging("getFileValue error : " + err);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 70000, "[API] FTP general error : " + err.toString());
            }
        });
    }
    putXML(pSourceFilePath, pFileName, folder) {
        return new Promise((resolve, reject) => {
            try {
                let context = this;
                var fs = require('fs'), xml2js = require('xml2js');
                logging_service_1.Logging("Enter saveXMLOutput");
                var outputPath = "";
                if (folder == "input") {
                    outputPath = config.ftp.folder.input;
                }
                else if (folder == "output") {
                    outputPath = config.ftp.folder.output;
                }
                else if (folder == "error") {
                    outputPath = config.ftp.folder.error;
                }
                else {
                    outputPath = "";
                }
                var filePath = outputPath + pFileName;
                var parser = new xml2js.Parser();
                logging_service_1.Logging("Source filePath : " + pSourceFilePath);
                logging_service_1.Logging("Dest filePath   : " + filePath);
                context._FTPClient = new FTP();
                context._FTPClient.connect(ftpConfig);
                context._FTPClient.on('ready', () => {
                    context._FTPClient.put(pSourceFilePath, filePath, function (err) {
                        if (err) {
                            context._FTPClient.end();
                            throw err;
                        }
                        logging_service_1.Logging("Output File Success");
                    });
                });
                resolve();
            }
            catch (err) {
                logging_service_1.Logging("getFileValue error : " + err);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 70000, "[API] FTP general error : " + err.toString());
            }
        });
    }
    deleteXML(pFileName, folder) {
        return new Promise((resolve, reject) => {
            try {
                let context = this;
                var fs = require('fs'), xml2js = require('xml2js');
                logging_service_1.Logging("Enter saveXMLOutput");
                var outputPath = "";
                if (folder == "input") {
                    outputPath = config.ftp.folder.input;
                }
                else if (folder == "output") {
                    outputPath = config.ftp.folder.output;
                }
                else if (folder == "error") {
                    outputPath = config.ftp.folder.error;
                }
                var filePath = outputPath + pFileName;
                var parser = new xml2js.Parser();
                logging_service_1.Logging("Delete file from filePath : " + filePath);
                context._FTPClient = new FTP();
                context._FTPClient.connect(ftpConfig);
                context._FTPClient.on('ready', () => {
                    context._FTPClient.delete(filePath, function (err) {
                        if (err) {
                            context._FTPClient.end();
                            logging_service_1.Logging(err);
                            throw err;
                        }
                        logging_service_1.Logging("Delete file Success");
                        resolve();
                    });
                });
            }
            catch (err) {
                logging_service_1.Logging("getFileValue error : " + err);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(reject, 70000, "[API] FTP general error : " + err.toString());
            }
        });
    }
}
exports.FTPService = FTPService;
//# sourceMappingURL=FTP.service.js.map