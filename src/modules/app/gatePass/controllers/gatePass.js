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
const gatePass_service_1 = __importDefault(require("../services/gatePass.service"));
const gatePass_1 = require("../../../../pdf/gatePass");
class GatePassController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new gatePass_service_1.default();
        this.pdfUtility = new gatePass_1.GatePassPDF();
    }
    getAllGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getAllGatePass();
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getTotal();
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.body;
            const operation = () => this.service.getGatePass(page, pageSize);
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getDeletedGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.body;
            const operation = () => this.service.getDeletedGatePass(page, pageSize);
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getDatedGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize, from, to } = req.body;
            const operation = () => this.service.getDateFiltered(page, pageSize, from, to);
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getStatusGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize, status } = req.body;
            const operation = () => this.service.getStatusFilterd(page, pageSize, status);
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getTotalGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getTotalGatePass();
            const successMessage = "Total GatePass count retrieved successfully!";
            const errorMessage = "Error retrieving total GatePass count:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { GatePass, GatePassItem } = req.body;
            const operation = () => this.service.createGatePass(GatePass, GatePassItem);
            const successMessage = "GatePass created successfully!";
            const errorMessage = "Error creating GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    gatePassReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getGatePassesReport();
            const successMessage = "GatePass report created successfully!";
            const errorMessage = "Error creating GatePass report:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    gatePassPDF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            try {
                const data = yield this.service.getGatePassById(id);
                const pdfDoc = this.pdfUtility.generateGatePassPDF(data);
                pdfDoc.getBuffer((buffer) => {
                    if (buffer) {
                        res.writeHead(200, {
                            "Content-Type": "application/pdf",
                            "Content-Disposition": `attachment; filename=${encodeURIComponent(data.customername)}.pdf`,
                            "Content-Length": buffer.length,
                        });
                        res.end(buffer);
                    }
                    else {
                        res.status(500).json({ error: "Error generating PDF buffer" });
                    }
                });
            }
            catch (error) {
                console.error("Error generating PDF:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    updateGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, GatePass, GatePassItem } = req.body;
            const operation = () => this.service.updateGatePass(id, GatePass, GatePassItem);
            const successMessage = "GatePass updated successfully!";
            const errorMessage = "Error updating GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.deleteGatePass(id);
            const successMessage = "GatePass deleted successfully!";
            const errorMessage = "Error deleting GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGatePassById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.getGatePassById(id);
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGatePassByCustomerId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.getGatePassByCustomer(id);
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGatePassByItemId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.getGatePassByItem(id);
            const successMessage = "GatePass retrieved successfully!";
            const errorMessage = "Error retrieving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.restoreGatePass(id);
            const successMessage = "GatePass restored successfully!";
            const errorMessage = "Error restoring GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    approveGatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.approveGatePass(id);
            const successMessage = "GatePass approved successfully!";
            const errorMessage = "Error approving GatePass:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
}
exports.default = GatePassController;
