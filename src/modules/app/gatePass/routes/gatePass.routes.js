"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gatePass_1 = __importDefault(require("../controllers/gatePass"));
class GatePassRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new gatePass_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllGatePass.bind(this.controller));
        this.router.get('/report', this.controller.gatePassReport.bind(this.controller));
        this.router.post('/get', this.controller.getGatePass.bind(this.controller));
        this.router.post('/getDeleted', this.controller.getDeletedGatePass.bind(this.controller));
        this.router.get('/total', this.controller.getTotalGatePass.bind(this.controller));
        this.router.post('/create', this.controller.createGatePass.bind(this.controller));
        this.router.put('/update', this.controller.updateGatePass.bind(this.controller));
        this.router.post('/delete', this.controller.deleteGatePass.bind(this.controller));
        this.router.post('/date', this.controller.getDatedGatePass.bind(this.controller));
        this.router.post('/status', this.controller.getDatedGatePass.bind(this.controller));
        this.router.post('/approve', this.controller.approveGatePass.bind(this.controller));
        this.router.post('/getById', this.controller.getGatePassById.bind(this.controller));
        this.router.post('/customerId', this.controller.getGatePassByCustomerId.bind(this.controller));
        this.router.post('/itemId', this.controller.getGatePassByItemId.bind(this.controller));
        this.router.post('/pdf', this.controller.gatePassPDF.bind(this.controller));
        this.router.post('/restore', this.controller.restoreGatePass.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = GatePassRoutes;
