import { AppController } from './controller/app/app.controller';
import { ProductController } from './controller/product/product.controller';

export function Routing(router:any, multipart:any){

    const productController:ProductController = new ProductController();
    //it will call function in controller by the link
    router.get('/product/getProduct',productController.getData);
    router.post('/product/updateProduct',productController.updateData);
    router.post('/product/deleteProduct',productController.deleteData);
    router.post('/product/insertProduct',productController.insertData);

    const appController:AppController = new  AppController();
    router.get('/app/version',appController.getAppVersion); 
    
}
