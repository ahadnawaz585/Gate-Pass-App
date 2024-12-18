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
const userGroup_model_1 = __importDefault(require("../models/userGroup.model"));
class UserGroupService {
    getAllUserGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userGroup_model_1.default.userGroup.gpFindMany();
        });
    }
    createUserGroup(userGroupData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userGroup_model_1.default.userGroup.gpCreate(userGroupData);
        });
    }
    updateUserGroup(userGroupId, userGroupData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userGroup_model_1.default.userGroup.gpUpdate(userGroupId, userGroupData);
        });
    }
    deleteUserGroup(userGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userGroup_model_1.default.userGroup.delete({
                where: {
                    id: userGroupId,
                },
            });
            ;
        });
    }
    restoreUserGroup(userGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userGroup_model_1.default.userGroup.gpRestore(userGroupId);
        });
    }
    getById(userGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userGroup_model_1.default.userGroup.gpFindById(userGroupId);
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userGroup_model_1.default.userGroup.getUserGroupByUserId(userId);
        });
    }
}
exports.default = UserGroupService;
