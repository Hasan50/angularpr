"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var Base = /** @class */ (function () {
    function Base(authenticationService) {
        this.authenticationService = authenticationService;
    }
    Base.prototype.jwt = function () {
        if (this.authenticationService.isAuthenticated) {
            // create authorization header with jwt token            
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.getCurrentUser().token });
            return new http_1.RequestOptions({ headers: headers });
        }
        else {
            //redirect to login page with information
        }
    };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=base.js.map