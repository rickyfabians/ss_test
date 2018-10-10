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
const logging_service_1 = require("./../../services/logging.service");
const error_handling_service_1 = require("../../services/error-handling.service");
const successresponse_model_1 = require("../../model/successresponse.model");
const product_entity_1 = require("../../entity/product/product.entity");
var vEnv = require('../../config/mode.json')['mode'];
class ProductController {
    constructor() {
        logging_service_1.Logging("Initialize User Controller");
    }
    getData(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logging_service_1.Logging("@ProductController: Get Data");
                let result = yield product_entity_1.ProductEntity.getProduct(); // it will await other processed until run the function is finished 
                logging_service_1.Logging(result[0]);
                //set the response for configuration success response (/src/model/successresponse.model.ts)
                //and the format response it will be in JSON, including status response and list of data
                pResponse.status(200).json(successresponse_model_1.SuccessResponseModel.getSuccessResp({ 'listdata': result[0] }));
            }
            catch (err) {
                //will throw error within description and code
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
                }
            }
        });
    }
    updateData(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //declare data in request into new variable
                var pId = pRequest.body.id;
                var pName = pRequest.body.name;
                var pCode = pRequest.body.code;
                var pPrice = pRequest.body.price;
                var pCategory = pRequest.body.category;
                var pSubCategory = pRequest.body.subcategory;
                var pColor = pRequest.body.color;
                var pStock = pRequest.body.stock;
                var pImage = pRequest.body.image;
                var pImage_category = pRequest.body.image_category;
                var pImage_subcategory = pRequest.body.image_subcategory;
                //end of declare data in request into new variable
                yield product_entity_1.ProductEntity.updateProduct(pId, pName, pCode, pPrice, pCategory, pSubCategory, pColor, pStock, pImage, pImage_category, pImage_subcategory); // it will await other processed until run the function is finished 
                //set the response for configuration success response (/src/model/successresponse.model.ts)
                //and the format response it will be in JSON, including status response
                pResponse.status(200).json(successresponse_model_1.SuccessResponseModel.getSuccessResp(200));
            }
            catch (err) {
                //will throw error within description and code
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
                }
            }
        });
    }
    deleteData(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //declare data in request into new variable
                var pId = pRequest.body.id;
                //end of declare data in request into new variable
                yield product_entity_1.ProductEntity.deleteProduct(pId); // it will await other processed until run the function is finished 
                pResponse.status(200).json(successresponse_model_1.SuccessResponseModel.getSuccessResp(200));
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
                }
            }
        });
    }
    insertData(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //declare data in request into new variable
                var pName = pRequest.body.name;
                var pCode = pRequest.body.code;
                var pPrice = pRequest.body.price;
                var pCategory = pRequest.body.category;
                var pSubCategory = pRequest.body.subcategory;
                var pColor = pRequest.body.color;
                var pStock = pRequest.body.stock;
                var pImage = pRequest.body.image;
                var pImage_category = pRequest.body.image_category;
                var pImage_subcategory = pRequest.body.image_subcategory;
                //end of declare data in request into new variable
                console.log(pRequest.body.image);
                console.log(pImage);
                let a = yield product_entity_1.ProductEntity.insertProduct(pName, pCode, pPrice, pCategory, pSubCategory, pColor, pStock, pImage, pImage_category, pImage_subcategory); // it will await other processed until run the function is finished 
                //set the response for configuration success response (/src/model/successresponse.model.ts)
                //and the format response it will be in JSON, including status response
                pResponse.status(200).json(successresponse_model_1.SuccessResponseModel.getSuccessResp());
            }
            catch (err) {
                //will throw error response with description and code
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
                }
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map