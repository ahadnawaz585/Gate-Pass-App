"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../environment/environment");
class AuthController {
    generateToken(req, res) {
        const { keyCode } = req.body;
        if (environment_1.code !== keyCode) {
            res.status(400).send("Your code is invalid");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ code: environment_1.code }, environment_1.secretKey);
        res.json({ token });
    }
}
exports.default = new AuthController();
