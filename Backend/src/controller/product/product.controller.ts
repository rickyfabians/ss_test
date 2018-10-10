import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { SuccessResponseModel } from '../../model/successresponse.model';
import { ProductEntity } from '../../entity/product/product.entity';

var vEnv = require('../../config/mode.json')['mode'];

export interface ProductControllerInterface{
    getData(pRequest:any, pResponse:any):any;
}

export class ProductController implements ProductControllerInterface{
    constructor(){
        Logging("Initialize User Controller");
    }

    async getData(pRequest:any, pResponse:any){
        try{
            Logging("@ProductController: Get Data");
            
            let result:any = await ProductEntity.getProduct(); // it will await other processed until run the function is finished 
            Logging(result[0])
            //set the response for configuration success response (/src/model/successresponse.model.ts)
            //and the format response it will be in JSON, including status response and list of data
            pResponse.status(200).json(SuccessResponseModel.getSuccessResp({'listdata':result[0]}));
        }
        catch(err){
            //will throw error within description and code
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
            }
        }
    }

    async updateData(pRequest:any, pResponse:any){
        try{
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
            
            await ProductEntity.updateProduct(pId, pName, pCode, pPrice, 
                pCategory,pSubCategory, pColor, pStock, pImage, pImage_category, pImage_subcategory); // it will await other processed until run the function is finished 

            //set the response for configuration success response (/src/model/successresponse.model.ts)
            //and the format response it will be in JSON, including status response
            pResponse.status(200).json(SuccessResponseModel.getSuccessResp(200));
        }
        catch(err){
            //will throw error within description and code
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
            }
        }
    }

    async deleteData(pRequest:any, pResponse:any){
        try{
            //declare data in request into new variable
            var pId = pRequest.body.id;
            //end of declare data in request into new variable
            
            await ProductEntity.deleteProduct(pId); // it will await other processed until run the function is finished 

            pResponse.status(200).json(SuccessResponseModel.getSuccessResp(200));
        }
        catch(err){
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
            }
        }
    }

    async insertData(pRequest:any, pResponse:any){
        try{
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
            console.log(pRequest.body.image)
            console.log(pImage)
            let a:any = await ProductEntity.insertProduct(pName, pCode, pPrice, 
                pCategory,pSubCategory, pColor, pStock, pImage, pImage_category, pImage_subcategory); // it will await other processed until run the function is finished 

            //set the response for configuration success response (/src/model/successresponse.model.ts)
            //and the format response it will be in JSON, including status response
            pResponse.status(200).json(SuccessResponseModel.getSuccessResp());
        }
        catch(err){
            //will throw error response with description and code
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 52000, err);
            }
        }
    }

}