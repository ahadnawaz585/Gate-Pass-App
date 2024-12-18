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
const feature_model_1 = __importDefault(require("../models/feature.model"));
class AppFeatureService {
    getAllAppFeatures() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpFindMany();
        });
    }
    getAppFeatures(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpPgFindMany(page, pageSize);
        });
    }
    createAppFeature(featureData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpCreate(featureData);
        });
    }
    updateAppFeature(featureId, featureData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpUpdateByName(featureId, featureData);
        });
    }
    deleteAppFeature(featureId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield feature_model_1.default.appFeature.gpSoftDelete(featureId);
        });
    }
    getAppFeatureByParent(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpGetByParent(parent);
            // return await featureModel.appFeature.actGetChildFeatures();
        });
    }
    restoreAppFeature(featureId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpRestore(featureId);
        });
    }
    getById(featureId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpFindById(featureId);
        });
    }
    alreadyExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.getfeatureByName(name);
        });
    }
    totalFeatures(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feature_model_1.default.appFeature.gpCount("58c55d6a-910c-46f8-a422-4604bea6cd15");
        });
    }
}
exports.default = AppFeatureService;
