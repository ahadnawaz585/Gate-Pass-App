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
const group_model_1 = __importDefault(require("../models/group.model"));
class GroupService {
    getAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.gpFindMany();
        });
    }
    getGroups(page, pageSize, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.gpPgFindMany(page, pageSize);
        });
    }
    createGroup(groupData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.gpCreate(groupData);
        });
    }
    updateGroup(groupId, groupData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.gpUpdate(groupId, groupData);
        });
    }
    deleteGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield group_model_1.default.group.gpSoftDelete(groupId);
        });
    }
    restoreGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield group_model_1.default.group.gpRestore(groupId);
        });
    }
    getById(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.gpFindById(groupId);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.gpGetByName(name);
        });
    }
    totalGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.gpCount();
        });
    }
    getDetailedGroupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.group.getGroupByGroupId(id);
        });
    }
    searchGroups(searchTerm, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = ["name"];
            return yield group_model_1.default.group.gpSearch(searchTerm, columns, page, pageSize);
        });
    }
}
exports.default = GroupService;
