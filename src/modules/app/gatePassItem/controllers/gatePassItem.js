"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../../../../core/controllers/base.controller"));
const gatePassItem_service_1 = __importDefault(require("../services/gatePassItem.service"));
class GatePassItemController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new gatePassItem_service_1.default();
    }
    getAllGatePassItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getAllGatePassItem();
            const successMessage = 'GatePassItem retrieved successfully!';
            const errorMessage = 'Error retrieving GatePassItem:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGatePassItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.body;
            const operation = () => this.service.getGatePassItem(page, pageSize);
            const successMessage = 'GatePassItem retrieved successfully!';
            const errorMessage = 'Error retrieving GatePassItem:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getTotalGatePassItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getTotalGatePassItem();
            const successMessage = 'Total GatePassItem count retrieved successfully!';
            const errorMessage = 'Error retrieving total GatePassItem count:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createGatePassItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const GatePassItemData = req.body;
            const operation = () => this.service.createGatePassItem(GatePassItemData);
            const successMessage = 'GatePassItem created successfully!';
            const errorMessage = 'Error creating GatePassItem:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateGatePassItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, data } = req.body;
            const operation = () => this.service.updateGatePassItem(id, data);
            const successMessage = 'GatePassItem updated successfully!';
            const errorMessage = 'Error updating GatePassItem:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteGatePassItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.deleteGatePassItem(id);
            const successMessage = 'GatePassItem deleted successfully!';
            const errorMessage = 'Error deleting GatePassItem:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGatePassItemById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.getGatePassItemById(id);
            const successMessage = 'GatePassItem retrieved successfully!';
            const errorMessage = 'Error retrieving GatePassItem:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreGatePassItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.restoreGatePassItem(id);
            const successMessage = 'GatePassItem restored successfully!';
            const errorMessage = 'Error restoring GatePassItem:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
}
exports.default = GatePassItemController;
