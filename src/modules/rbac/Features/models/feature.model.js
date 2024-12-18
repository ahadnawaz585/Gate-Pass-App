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
const base_model_1 = __importDefault(require("../../../../core/models/base.model"));
const featureModel = base_model_1.default.$extends({
    model: {
        appFeature: {
            getfeatureByName(name) {
                return __awaiter(this, void 0, void 0, function* () {
                    const feature = yield this.findFirst({
                        where: {
                            name: name,
                        },
                    });
                    if (feature) {
                        return true;
                    }
                    return false;
                });
            },
            gpCount(userId, companyId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const count = yield base_model_1.default.appFeature.count({
                        where: {
                            isDeleted: null,
                        },
                    });
                    return count;
                });
            },
            gpGetByParent(parent) {
                return __awaiter(this, void 0, void 0, function* () {
                    const getParentAndChildren = (parent) => __awaiter(this, void 0, void 0, function* () {
                        const children = yield this.findMany({
                            where: {
                                parentFeatureId: parent,
                                isDeleted: null,
                            },
                        });
                        const parentFeature = yield this.findUnique({
                            where: {
                                name: parent,
                                isDeleted: null,
                            },
                        });
                        let data = [];
                        if (parentFeature) {
                            data.push(parentFeature);
                        }
                        for (const child of children) {
                            const grandChildren = yield getParentAndChildren(child.name);
                            data = data.concat(grandChildren);
                        }
                        return data;
                    });
                    const data = yield getParentAndChildren(parent);
                    const uniqueData = Array.from(new Set(data.map((feature) => feature.name))).map((id) => {
                        return data.find((feature) => feature.name === id);
                    });
                    return uniqueData.map((item) => (Object.assign(Object.assign({}, item), { parentFeatureId: item.parentFeatureId === null ? undefined : item.parentFeatureId })));
                });
            },
        },
    },
});
exports.default = featureModel;
