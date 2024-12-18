"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gatePassItem_1 = __importDefault(require("../controllers/gatePassItem"));
class GatePassItemRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new gatePassItem_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllGatePassItem.bind(this.controller));
        this.router.post('/get', this.controller.getGatePassItem.bind(this.controller));
        this.router.get('/total', this.controller.getTotalGatePassItem.bind(this.controller));
        this.router.post('/create', this.controller.createGatePassItem.bind(this.controller));
        this.router.put('/update', this.controller.updateGatePassItem.bind(this.controller));
        this.router.post('/delete', this.controller.deleteGatePassItem.bind(this.controller));
        this.router.post('/getById', this.controller.getGatePassItemById.bind(this.controller));
        this.router.post('/restore', this.controller.restoreGatePassItem.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = GatePassItemRoutes;
