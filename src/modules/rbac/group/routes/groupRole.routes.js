"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groupRole_controller_1 = __importDefault(require("../controller/groupRole.controller"));
class GroupRoleRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new groupRole_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllGroupRoles.bind(this.controller));
        this.router.post('/get', this.controller.getGroupRoleById.bind(this.controller));
        this.router.post('/create', this.controller.createGroupRole.bind(this.controller));
        this.router.put('/update', this.controller.updateGroupRole.bind(this.controller));
        this.router.post('/restore', this.controller.restoreGroupRole.bind(this.controller));
        this.router.post('/delete', this.controller.deleteGroupRole.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = GroupRoleRoutes;
