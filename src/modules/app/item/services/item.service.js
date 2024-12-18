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
const item_model_1 = __importDefault(require("../models/item.model"));
class ItemService {
    getAllItem() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.gpFindMany();
        });
    }
    getOutOfStockItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.outOfStockItems();
        });
    }
    getItem(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.gpPgFindMany(page, pageSize);
        });
    }
    getDeletedItem(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.gpPgFindDeletedMany(page, pageSize);
        });
    }
    createItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.gpCreate(itemData);
        });
    }
    updateItem(itemId, itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.gpUpdate(itemId, itemData);
        });
    }
    deleteItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield item_model_1.default.item.gpSoftDelete(itemId);
        });
    }
    restoreItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield item_model_1.default.item.gpRestore(itemId);
        });
    }
    getItemById(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.gpFindById(itemId);
        });
    }
    getTotalItem() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.item.gpCount();
        });
    }
    searchItems(searchTerm, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = ["name", "description"];
            return yield item_model_1.default.item.gpSearch(searchTerm, columns, page, pageSize);
        });
    }
}
exports.default = ItemService;
