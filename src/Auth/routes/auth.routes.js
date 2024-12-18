"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../modules/rbac/user/controller/user.controller"));
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', this.controller.loginUser.bind(this.controller));
        this.router.get('/logout', this.controller.logoutUser.bind(this.controller));
        this.router.get('/logoutOfAllDevices', this.controller.logoutOfAllDevices.bind(this.controller));
        this.router.post('/logoutUserOfAllDevices', this.controller.logoutUserOfAllDevices.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = AuthRoutes;
