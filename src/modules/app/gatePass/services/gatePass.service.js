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
const gatePass_model_1 = __importDefault(require("../models/gatePass.model"));
const gatePass_1 = require("../../../../pdf/gatePass");
class GatePassService {
    constructor() {
        this.pdfUtility = new gatePass_1.GatePassPDF();
    }
    getAllGatePass() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpFindMany();
        });
    }
    getGatePass(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpPgFindMany(page, pageSize);
        });
    }
    getDeletedGatePass(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpPgDeletedFindMany(page, pageSize);
        });
    }
    createGatePass(GatePassData, GatePassItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpCreate(GatePassData, GatePassItem);
        });
    }
    updateGatePass(GatePassId, GatePassData, GatePassItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpUpdate(GatePassId, GatePassData, GatePassItem);
        });
    }
    deleteGatePass(GatePassId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield gatePass_model_1.default.gatePass.gpSoftDelete(GatePassId);
        });
    }
    restoreGatePass(GatePassId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield gatePass_model_1.default.gatePass.gpRestore(GatePassId);
        });
    }
    getGatePassById(GatePassId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpFindById(GatePassId);
        });
    }
    getGatePassByCustomer(GatePassId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpFindByCustomerId(GatePassId);
        });
    }
    getGatePassByItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpFindByItemId(itemId);
        });
    }
    getTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpCount();
        });
    }
    approveGatePass(GatePassId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpApprovePass(GatePassId);
        });
    }
    getTotalGatePass() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpCount();
        });
    }
    getDateFiltered(page, pageSize, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpPgDateFilter(page, pageSize, from, to);
        });
    }
    getStatusFilterd(page, pageSize, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.gpPgStatusFilter(page, pageSize, status);
        });
    }
    getGatePassesReport() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePass_model_1.default.gatePass.getGatePassesReport();
        });
    }
}
exports.default = GatePassService;
