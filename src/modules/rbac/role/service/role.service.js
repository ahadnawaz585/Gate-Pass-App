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
const role_model_1 = __importDefault(require("../models/role.model"));
class RoleService {
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.gpFindMany();
        });
    }
    getRoles(page, pageSize, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.gpPgFindMany(page, pageSize);
        });
    }
    createRole(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.gpCreate(roleData);
        });
    }
    updateRole(roleId, roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.gpUpdate(roleId, roleData);
        });
    }
    deleteRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield role_model_1.default.role.gpSoftDelete(roleId);
        });
    }
    restoreRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield role_model_1.default.role.gpRestore(roleId);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.gpGetByName(name);
        });
    }
    changeRole(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.changeRole(id, role);
        });
    }
    getById(roleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.gpFindById(roleId);
        });
    }
    totalRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.gpCount();
        });
    }
    getDetailedRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_model_1.default.role.getRoleByroleId(id);
        });
    }
    searchRoles(searchTerm, page, pageSize, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = ["name"];
            return yield role_model_1.default.role.gpSearch(searchTerm, columns, page, pageSize);
        });
    }
}
exports.default = RoleService;
