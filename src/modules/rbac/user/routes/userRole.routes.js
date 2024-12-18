"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRole_controller_1 = __importDefault(require("../controller/userRole.controller"));
class UserRoleRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new userRole_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllUserRoles.bind(this.controller));
        this.router.post('/getById', this.controller.getUserRoleById.bind(this.controller));
        this.router.post('/getByUserId', this.controller.getUserRoleByUserId.bind(this.controller));
        this.router.post('/create', this.controller.createUserRole.bind(this.controller));
        this.router.put('/update', this.controller.updateUserRole.bind(this.controller));
        this.router.post('/restore', this.controller.restoreUserRole.bind(this.controller));
        this.router.post('/delete', this.controller.deleteUserRole.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserRoleRoutes;
