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
const item_service_1 = __importDefault(require("../services/item.service"));
class ItemController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new item_service_1.default();
    }
    getAllItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getAllItem();
            const successMessage = "Item retrieved successfully!";
            const errorMessage = "Error retrieving Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getOutOfStockItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getOutOfStockItems();
            const successMessage = "out of stock Item retrieved successfully!";
            const errorMessage = "Error retrieving out of stock Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.body;
            const operation = () => this.service.getItem(page, pageSize);
            const successMessage = "Item retrieved successfully!";
            const errorMessage = "Error retrieving Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getDeletedItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.body;
            const operation = () => this.service.getDeletedItem(page, pageSize);
            const successMessage = "Item retrieved successfully!";
            const errorMessage = "Error retrieving Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getTotalItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = () => this.service.getTotalItem();
            const successMessage = "Total Item count retrieved successfully!";
            const errorMessage = "Error retrieving total Item count:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ItemData = req.body;
            const operation = () => this.service.createItem(ItemData);
            const successMessage = "Item created successfully!";
            const errorMessage = "Error creating Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, data } = req.body;
            const operation = () => this.service.updateItem(id, data);
            const successMessage = "Item updated successfully!";
            const errorMessage = "Error updating Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.deleteItem(id);
            const successMessage = "Item deleted successfully!";
            const errorMessage = "Error deleting Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    searchItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { searchTerm, page, pageSize } = req.body;
            const operation = () => this.service.searchItems(searchTerm, page, pageSize);
            const successMessage = "Items retrieved successfully!";
            const errorMessage = "Error retrieving Items:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getItemById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.getItemById(id);
            const successMessage = "Item retrieved successfully!";
            const errorMessage = "Error retrieving Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const operation = () => this.service.restoreItem(id);
            const successMessage = "Item restored successfully!";
            const errorMessage = "Error restoring Item:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
}
exports.default = ItemController;
