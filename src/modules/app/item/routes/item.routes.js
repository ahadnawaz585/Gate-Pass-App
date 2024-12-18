"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_1 = __importDefault(require("../controllers/item"));
class ItemRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new item_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllItem.bind(this.controller));
        this.router.get('/getOutOfStock', this.controller.getOutOfStockItem.bind(this.controller));
        this.router.post('/get', this.controller.getItem.bind(this.controller));
        this.router.post('/getDeleted', this.controller.getDeletedItem.bind(this.controller));
        this.router.get('/total', this.controller.getTotalItem.bind(this.controller));
        this.router.post('/create', this.controller.createItem.bind(this.controller));
        this.router.put('/update', this.controller.updateItem.bind(this.controller));
        this.router.post('/delete', this.controller.deleteItem.bind(this.controller));
        this.router.post('/search', this.controller.searchItems.bind(this.controller));
        this.router.post('/getById', this.controller.getItemById.bind(this.controller));
        this.router.post('/restore', this.controller.restoreItem.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = ItemRoutes;
