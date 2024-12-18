"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../environment/environment");
const token_service_1 = __importDefault(require("../modules/rbac/Token/service/token.service"));
const blackListedTokenService = new token_service_1.default();
class Authentication {
    authenticateToken(req, res, next) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const secret_key = environment_1.secretKey || "";
        if (!token) {
            res.status(401).send("Unauthorized");
            return;
        }
        jsonwebtoken_1.default.verify(token, secret_key, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(403).send("Invalid token");
                return;
            }
            const isBlacklisted = yield blackListedTokenService.isAuthenticatedToken(token);
            if (isBlacklisted) {
                res.status(401).send("Unauthorized");
                return;
            }
            req.userId = decoded.userId;
            next();
        }));
    }
}
exports.default = new Authentication();
