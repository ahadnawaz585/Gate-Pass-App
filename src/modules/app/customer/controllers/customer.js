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
const customer_service_1 = __importDefault(require("../services/customer.service"));
class CustomerController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new customer_service_1.default();
    }
    getAllCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getAllCustomers();
            const successMessage = "Customers retrieved successfully!";
            const errorMessage = "Error retrieving customers:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.body;
            const operation = () => this.service.getCustomers(page, pageSize);
            const successMessage = "Customers retrieved successfully!";
            const errorMessage = "Error retrieving customers:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getDeletedCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.body;
            const operation = () => this.service.getDeletedCustomers(page, pageSize);
            const successMessage = "Deleted Customers retrieved successfully!";
            const errorMessage = "Error retrieving deleted customers:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    searchCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { searchTerm, page, pageSize } = req.body;
            const operation = () => this.service.searchCustomer(searchTerm, page, pageSize);
            const successMessage = "Customers retrieved successfully!";
            const errorMessage = "Error retrieving customers:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getTotalCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getTotalCustomers();
            const successMessage = "Total customers count retrieved successfully!";
            const errorMessage = "Error retrieving total customers count:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerData = req.body;
            const operation = () => this.service.createCustomer(customerData);
            const successMessage = "Customer created successfully!";
            const errorMessage = "Error creating customer:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, data } = req.body;
            const operation = () => this.service.updateCustomer(id, data);
            const successMessage = "Customer updated successfully!";
            const errorMessage = "Error updating customer:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.deleteCustomer(id);
            const successMessage = "Customer deleted successfully!";
            const errorMessage = "Error deleting customer:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getCustomerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.getCustomerById(id);
            const successMessage = "Customer retrieved successfully!";
            const errorMessage = "Error retrieving customer:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getFrequentCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getFrequentCustomer();
            const successMessage = "Customer retrieved successfully!";
            const errorMessage = "Error retrieving customer:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.restoreCustomer(id);
            const successMessage = "Customer restored successfully!";
            const errorMessage = "Error restoring customer:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
}
exports.default = CustomerController;
