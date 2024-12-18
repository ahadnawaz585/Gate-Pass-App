"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const access_controller_1 = __importDefault(require("../controller/access.controller"));
class AccessRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new access_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/getUserGroup', this.controller.getUserGroup.bind(this.controller));
        this.router.get('/getUserRole', this.controller.getUserRole.bind(this.controller));
        // this.router.post('/userPermission', this.controller.getUserPermission.bind(this.controller));
        this.router.post('/getPermission', this.controller.getPermission.bind(this.controller));
        // this.router.post('/groupPermission', this.controller.getGroupPermission.bind(this.controller));
        this.router.post('/checkPermission', this.controller.checkPermission.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = AccessRoutes;
