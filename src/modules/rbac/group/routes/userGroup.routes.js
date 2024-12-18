"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userGroup_controller_1 = __importDefault(require("../controller/userGroup.controller"));
class UserGroupRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new userGroup_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllUserGroups.bind(this.controller));
        this.router.post('/getById', this.controller.getUserGroupById.bind(this.controller));
        this.router.post('/getByUserId', this.controller.getUserGroupByUserId.bind(this.controller));
        this.router.post('/create', this.controller.createUserGroup.bind(this.controller));
        this.router.put('/update', this.controller.updateUserGroup.bind(this.controller));
        this.router.post('/restore', this.controller.restoreUserGroup.bind(this.controller));
        this.router.post('/delete', this.controller.deleteUserGroup.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserGroupRoutes;
