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
const client_1 = require("@prisma/client");
const base_model_1 = __importDefault(require("../../../../core/models/base.model"));
const featurePermissionModel = base_model_1.default.$extends({
    model: {
        featurePermission: {
            gpCreate(permissionData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const newPermission = yield base_model_1.default.featurePermission.create({
                        data: {
                            parentType: permissionData.parentType,
                            parentId: permissionData.parentId,
                            permissions: {
                                allowedFeatures: permissionData.allowedFeatures,
                            },
                            createdAt: new Date(),
                        },
                    });
                    return newPermission;
                });
            },
            gpGetAllowedFeatures(parentType, parentId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const permission = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `SELECT id, COALESCE(permissions->'allowedFeatures', '[]'::jsonb) AS "allowedFeatures"
            FROM public."FeaturePermission"
            WHERE "parentId" = ${parentId} AND "parentType" = ${parentType}::"ParentType"`);
                        if (permission.length === 0) {
                            return [];
                        }
                        return permission[0];
                    }
                    catch (error) {
                        console.error("Error fetching allowed features:", error);
                        throw error;
                    }
                });
            },
            gpUpdate(id, permissionData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const updatedItem = yield this.update({
                        where: { id: id },
                        data: {
                            parentType: permissionData.parentType,
                            parentId: permissionData.parentId,
                            permissions: {
                                allowedFeatures: permissionData.allowedFeatures,
                            },
                            updatedAt: new Date(),
                        },
                    });
                });
            },
        },
    },
});
exports.default = featurePermissionModel;
