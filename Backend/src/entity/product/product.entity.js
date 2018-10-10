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
const SQL_service_1 = require("./../../services/SQL.service");
class ProductEntity {
    constructor() {
        logging_service_1.Logging("Initialize Task Entity");
    }
    static getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging("@ProductEntity: Get Product");
            try {
                // Set parameter for call SP
                logging_service_1.Logging("aksbdfkasdbhbf");
                var params = {};
                params["param"] = 'test';
                //End of Set parameter for call SP
                //Call SP with service
                logging_service_1.Logging(params);
                let result = yield SQL_service_1.SQLService.executeSP('GET_Product_By_Category', params);
                logging_service_1.Logging(result);
                return result;
            }
            catch (err) {
                //it will throw error response
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwError(err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwError(51000, err);
                }
            }
        });
    }
    static updateProduct(pId, pName, pCode, pPrice, pCategory, pSubCategory, pColor, pStock, pImage, pImage_category, pImage_subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging("@ProductEntity: Update Product");
            try {
                // Set parameter for call SP
                var params = {};
                params["pId"] = pId;
                params["pName"] = pName;
                params["pCode"] = pCode;
                params["pPrice"] = pPrice;
                params["pCategory"] = pCategory;
                params["pSubCategory"] = pSubCategory;
                params["pColor"] = pColor;
                params["pStock"] = pStock;
                params["pImage"] = pImage;
                params["pImage_category"] = pImage_category;
                params["pImage_subcategory"] = pImage_subcategory;
                //End of Set parameter for call SP
                //Call SP with service
                let result = yield SQL_service_1.SQLService.executeSP('UPDATE_Product', params);
                return result;
            }
            catch (err) {
                //it will throw error response
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwError(err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwError(51000, err);
                }
            }
        });
    }
    static deleteProduct(pId) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging("@ProductEntity: Delete Product");
            try {
                var params = {};
                params["pId"] = pId;
                let result = yield SQL_service_1.SQLService.executeSP('DELETE_Product', params);
                return result;
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwError(err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwError(51000, err);
                }
            }
        });
    }
    static insertProduct(pName, pCode, pPrice, pCategory, pSubCategory, pColor, pStock, pImage, pImage_category, pImage_subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging("@ProductEntity: Insert Product");
            try {
                console.log(pImage);
                // Set parameter for call SP
                var params = {};
                params["pName"] = pName;
                params["pCode"] = pCode;
                params["pPrice"] = pPrice;
                params["pCategory"] = pCategory;
                params["pSubCategory"] = pSubCategory;
                params["pColor"] = pColor;
                params["pStock"] = pStock;
                params["pImage"] = pImage;
                params["pImage_category"] = pImage_category;
                params["pImage_subcategory"] = pImage_subcategory;
                console.log(params);
                //End of Set parameter for call SP
                let result = yield SQL_service_1.SQLService.executeSP('INSERT_Product', params);
                return result;
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwError(err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwError(51000, err);
                }
            }
        });
    }
}
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map