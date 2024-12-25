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
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpFindMany();
        });
    }
    getNonAssociatedUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpNonAssociatedUsers();
        });
    }
    getAllUsers(page, pageSize, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpPgFindMany(page, pageSize, userId);
        });
    }
    createUsers(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpCreate(userData);
        });
    }
    updateUsers(userId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpUpdate(userId, updatedData);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpSoftDelete(userId);
        });
    }
    restoreUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpRestore(userId);
        });
    }
    //   async changeCompany(userId: string, companyId: string): Promise<void> {
    //     return await userModel.user.changeDefaultCompany(userId, companyId);
    //   }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpFindUnique(username);
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpFindById(userId);
        });
    }
    getDetailed(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.detailedUser(userId);
        });
    }
    getLoggedInUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.getLoggedInUser(userId);
        });
    }
    checkPreviousPassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.checkPreviousPassowrd(userId, password);
        });
    }
    removeLoggedInUser(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpRemoveLoggedInUser(userId, token);
        });
    }
    changePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.changePassowrd(userId, password);
        });
    }
    totalUsers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.user.gpCount(userId);
        });
    }
    searchUsers(searchTerm, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = ["username", "password"];
            return yield user_model_1.default.user.gpSearch(searchTerm, columns, page, pageSize);
        });
    }
}
exports.default = UserService;
