"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenModel {
    constructor() {
        this.userID = '';
        this.roleID = '';
        this.businessUnitID = '';
        this.locationID = '';
        this.externalReferenceID = '';
    }
    setUserID(userID) {
        this.userID = userID;
    }
    setRoleID(roleID) {
        this.roleID = roleID;
    }
    setBusinessUnitID(businessUnitID) {
        this.businessUnitID = businessUnitID;
    }
    setLocationID(locationID) {
        this.locationID = locationID;
    }
    setExternalReferenceID(externalReferenceID) {
        this.externalReferenceID = externalReferenceID;
    }
    getUserID() {
        return this.userID;
    }
    getRoleID() {
        return this.roleID;
    }
    getBusinessUnitID() {
        return this.businessUnitID;
    }
    getLocationID() {
        return this.locationID;
    }
}
exports.TokenModel = TokenModel;
//# sourceMappingURL=token.model.js.map