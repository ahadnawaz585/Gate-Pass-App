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
const cutomer_model_1 = __importDefault(require("../models/cutomer.model"));
class CustomerService {
    getAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpFindMany();
        });
    }
    getCustomers(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpPgFindMany(page, pageSize);
        });
    }
    getDeletedCustomers(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpPgFindDeletedMany(page, pageSize);
        });
    }
    createCustomer(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpCreate(customerData);
        });
    }
    updateCustomer(customerId, customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpUpdate(customerId, customerData);
        });
    }
    deleteCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cutomer_model_1.default.customer.gpSoftDelete(customerId);
        });
    }
    restoreCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cutomer_model_1.default.customer.gpRestore(customerId);
        });
    }
    getCustomerById(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpFindById(customerId);
        });
    }
    getTotalCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpCount();
        });
    }
    getFrequentCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.getCustomersWithMostGatePasses();
        });
    }
    searchCustomer(searchTerm, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = ["name", "email", "phone", "address"];
            return yield cutomer_model_1.default.customer.gpSearch(searchTerm, columns, page, pageSize);
        });
    }
    getTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cutomer_model_1.default.customer.gpCount();
        });
    }
}
exports.default = CustomerService;
