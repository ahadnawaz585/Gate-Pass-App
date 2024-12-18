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
const userRole_model_1 = __importDefault(require("../models/userRole.model"));
class UserRoleService {
    getAllUserRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRole_model_1.default.userRole.gpFindMany();
        });
    }
    createUserRole(userRoleData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRole_model_1.default.userRole.gpCreate(userRoleData);
        });
    }
    updateUserRole(userRoleId, userRoleData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRole_model_1.default.userRole.gpUpdate(userRoleId, userRoleData);
        });
    }
    deleteUserRole(userRoleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userRole_model_1.default.userRole.delete({
                where: {
                    id: userRoleId,
                },
            });
        });
    }
    restoreUserRole(userRoleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userRole_model_1.default.userRole.gpRestore(userRoleId);
        });
    }
    getById(userRoleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRole_model_1.default.userRole.gpFindById(userRoleId);
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRole_model_1.default.userRole.getUserRolesByUserId(userId);
        });
    }
}
exports.default = UserRoleService;
