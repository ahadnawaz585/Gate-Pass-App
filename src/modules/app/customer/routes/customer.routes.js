"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = __importDefault(require("../controllers/customer"));
class CustomerRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new customer_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllCustomers.bind(this.controller));
        this.router.get('/getFrequent', this.controller.getFrequentCustomers.bind(this.controller));
        this.router.post('/get', this.controller.getCustomers.bind(this.controller));
        this.router.post('/getDeleted', this.controller.getDeletedCustomers.bind(this.controller));
        this.router.get('/total', this.controller.getTotalCustomers.bind(this.controller));
        this.router.post('/create', this.controller.createCustomer.bind(this.controller));
        this.router.put('/update', this.controller.updateCustomer.bind(this.controller));
        this.router.post('/search', this.controller.searchCustomers.bind(this.controller));
        this.router.post('/delete', this.controller.deleteCustomer.bind(this.controller));
        this.router.post('/getById', this.controller.getCustomerById.bind(this.controller));
        this.router.post('/restore', this.controller.restoreCustomer.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = CustomerRoutes;
