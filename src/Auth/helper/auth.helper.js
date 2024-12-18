"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../environment/environment");
class AuthHelper {
    static getTokenFromHeader(req) {
        if (req.headers && req.headers.authorization) {
            return req.headers.authorization.split(" ")[1] || null;
        }
        return null;
    }
    static getUserIdFromHeader(req) {
        if (req.headers && req.headers.authorization) {
            const authorization = req.headers.authorization.split(" ")[1];
            try {
                const decoded = jsonwebtoken_1.default.verify(authorization, environment_1.secretKey);
                return decoded.userId;
            }
            catch (e) {
                console.error("error");
            }
        }
        console.error("Authorization header missing");
    }
}
exports.default = AuthHelper;
