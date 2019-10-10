"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorTypes;
(function (ErrorTypes) {
    //Signup Errors
    ErrorTypes["SGP-001"] = "Invalid Email Address";
    ErrorTypes["SGP-002"] = "This email cannot be used";
    ErrorTypes["SGP-003"] = "Invalid Phone Number";
    ErrorTypes["SGP-004"] = "This phone cannot be used";
    //Authentication Errors
    ErrorTypes["AUTH-001"] = "Ops!Looks like you are not part of our party";
    ErrorTypes["AUTH-002"] = "Invalid password";
})(ErrorTypes = exports.ErrorTypes || (exports.ErrorTypes = {}));
function getError(errorID) {
    return `${errorID} - ${ErrorTypes[errorID]}`;
}
exports.getError = getError;
//# sourceMappingURL=errors.js.map