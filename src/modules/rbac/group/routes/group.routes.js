"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const group_controller_1 = __importDefault(require("../controller/group.controller"));
class GroupRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new group_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllGroups.bind(this.controller));
        this.router.post('/get', this.controller.getGroups.bind(this.controller));
        this.router.get('/total', this.controller.getTotalGroups.bind(this.controller));
        this.router.post('/getById', this.controller.getGroupById.bind(this.controller));
        this.router.post('/getGroupById', this.controller.getGroupByGroupId.bind(this.controller));
        this.router.post('/getByName', this.controller.getGroupByName.bind(this.controller));
        this.router.post('/create', this.controller.createGroup.bind(this.controller));
        this.router.put('/update', this.controller.updateGroup.bind(this.controller));
        this.router.post('/restore', this.controller.restoreGroup.bind(this.controller));
        this.router.post('/delete', this.controller.deleteGroup.bind(this.controller));
        this.router.post('/search', this.controller.searchGroups.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = GroupRoutes;
