"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_controller_1 = require("./controller/app/app.controller");
const product_controller_1 = require("./controller/product/product.controller");
function Routing(router, multipart) {
    const productController = new product_controller_1.ProductController();
    //it will call function in controller by the link
    router.get('/product/getProduct', productController.getData);
    router.post('/product/updateProduct', productController.updateData);
    router.post('/product/deleteProduct', productController.deleteData);
    router.post('/product/insertProduct', productController.insertData);
    const appController = new app_controller_1.AppController();
    router.get('/app/version', appController.getAppVersion);
}
exports.Routing = Routing;
//# sourceMappingURL=route.js.map