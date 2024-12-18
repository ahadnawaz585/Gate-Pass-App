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
const gatePassItem_model_1 = __importDefault(require("../models/gatePassItem.model"));
class GatePassItemService {
    getAllGatePassItem() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePassItem_model_1.default.gatePassItem.gpFindMany();
        });
    }
    getGatePassItem(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePassItem_model_1.default.gatePassItem.gpPgFindMany(page, pageSize);
        });
    }
    createGatePassItem(GatePassItemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePassItem_model_1.default.gatePassItem.gpCreate(GatePassItemData);
        });
    }
    updateGatePassItem(GatePassItemId, GatePassItemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePassItem_model_1.default.gatePassItem.gpUpdate(GatePassItemId, GatePassItemData);
        });
    }
    deleteGatePassItem(GatePassItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield gatePassItem_model_1.default.gatePassItem.gpSoftDelete(GatePassItemId);
        });
    }
    restoreGatePassItem(GatePassItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield gatePassItem_model_1.default.gatePassItem.gpRestore(GatePassItemId);
        });
    }
    getGatePassItemById(GatePassItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePassItem_model_1.default.gatePassItem.gpFindById(GatePassItemId);
        });
    }
    getTotalGatePassItem() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gatePassItem_model_1.default.gatePassItem.gpCount();
        });
    }
}
exports.default = GatePassItemService;
