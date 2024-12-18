"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = __importDefault(require("../controller/role.controller"));
class RoleRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new role_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllRoles.bind(this.controller));
        this.router.post('/get', this.controller.getRoles.bind(this.controller));
        this.router.get('/total', this.controller.getTotalRoles.bind(this.controller));
        this.router.post('/getById', this.controller.getRoleById.bind(this.controller));
        this.router.post('/getRoleById', this.controller.getDetailedRoleById.bind(this.controller));
        this.router.post('/getByName', this.controller.getRoleByName.bind(this.controller));
        this.router.post('/create', this.controller.createRole.bind(this.controller));
        this.router.put('/changeRole', this.controller.changeRole.bind(this.controller));
        this.router.put('/update', this.controller.updateRole.bind(this.controller));
        this.router.post('/restore', this.controller.restoreRole.bind(this.controller));
        this.router.post('/delete', this.controller.deleteRole.bind(this.controller));
        this.router.post('/search', this.controller.searchRoles.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = RoleRoutes;
