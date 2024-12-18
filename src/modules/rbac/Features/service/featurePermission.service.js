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
const featurePermission_model_1 = __importDefault(require("../models/featurePermission.model"));
class FeaturePermissionService {
    getAllFeaturePermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield featurePermission_model_1.default.featurePermission.gpFindMany();
        });
    }
    createFeaturePermission(permissionData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield featurePermission_model_1.default.featurePermission.gpCreate(permissionData);
        });
    }
    updateFeaturePermission(permissionId, permissionData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield featurePermission_model_1.default.featurePermission.gpUpdate(permissionId, permissionData);
        });
    }
    gpGetAllowedFeatures(parentId, parentType) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('Permission Data in service:', permissionData);
            return yield featurePermission_model_1.default.featurePermission.gpGetAllowedFeatures(parentType, parentId);
        });
    }
    deleteFeaturePermission(permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield featurePermission_model_1.default.featurePermission.gpSoftDelete(permissionId);
        });
    }
    restoreFeaturePermission(permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield featurePermission_model_1.default.featurePermission.gpRestore(permissionId);
        });
    }
    getById(permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield featurePermission_model_1.default.featurePermission.gpFindById(permissionId
            // userId
            );
        });
    }
}
exports.default = FeaturePermissionService;
