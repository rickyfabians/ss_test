import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { SQLService } from './../../services/SQL.service';

export class ProductEntity {
    constructor(){
        Logging("Initialize Task Entity");
    }

    static async getProduct(){

        Logging("@ProductEntity: Get Product");
        try{
            // Set parameter for call SP
            Logging("aksbdfkasdbhbf")
            var params:any={};
            params["param"] = 'test'
            //End of Set parameter for call SP

            //Call SP with service
            Logging(params)
            let result:any = await SQLService.executeSP('GET_Product_By_Category',params);
            Logging(result)
            return result;
        }
        catch(err){
            //it will throw error response
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwError(err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwError(51000, err);
            }
        }
    }

    static async updateProduct(pId :any,pName :any, pCode:any, pPrice:any, pCategory:any, pSubCategory:any, pColor:any, pStock:any, pImage:any, pImage_category:any, pImage_subcategory:any){

        Logging("@ProductEntity: Update Product");
        try{
            // Set parameter for call SP
            var params:any={};
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
            let result:any = await SQLService.executeSP('UPDATE_Product',params);
            return result;
        }
        catch(err){
            //it will throw error response
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwError(err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwError(51000, err);
            }
        }
    }

    static async deleteProduct(pId:any){

        Logging("@ProductEntity: Delete Product");
        try{
            var params:any={};
            params["pId"] = pId;
            let result:any = await SQLService.executeSP('DELETE_Product',params);
            return result;
        }
        catch(err){
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwError(err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwError(51000, err);
            }
        }
    }

    static async insertProduct(pName :any, pCode:any, pPrice:any, pCategory:any, pSubCategory:any, pColor:any, pStock:any, pImage:any, pImage_category:any, pImage_subcategory:any){

        Logging("@ProductEntity: Insert Product");
        try{
            console.log(pImage)
             // Set parameter for call SP
             var params:any={};
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
             console.log(params)
             //End of Set parameter for call SP
            let result:any = await SQLService.executeSP('INSERT_Product',params);
            return result;
        }
        catch(err){
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwError(err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwError(51000, err);
            }
        }
    }
}