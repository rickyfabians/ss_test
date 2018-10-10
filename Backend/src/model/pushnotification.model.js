"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PushNotificationModel {
    constructor(module, redirectPage, title, body, pageData) {
        this.pageData = {};
        this.setModule(module);
        this.setPage(redirectPage);
        this.setTitle(title);
        this.setBody(body);
        this.setData(pageData);
    }
    setModule(module) {
        this.module = module;
    }
    setPage(redirectPage) {
        this.redirectPage = redirectPage;
    }
    setTitle(title) {
        this.title = title;
    }
    setBody(body) {
        this.body = body;
    }
    setData(pageData) {
        this.pageData = pageData;
    }
    getPushNotificationOject() {
        var result = {
            module: this.module,
            redirectPage: this.redirectPage,
            pageData: this.pageData,
            createdDate: Date.now()
        };
        return result;
    }
}
exports.PushNotificationModel = PushNotificationModel;
//# sourceMappingURL=pushnotification.model.js.map