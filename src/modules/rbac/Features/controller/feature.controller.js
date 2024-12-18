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
const base_controller_1 = __importDefault(require("../../../../core/controllers/base.controller"));
const feature_service_1 = __importDefault(require("../service/feature.service"));
const auth_helper_1 = __importDefault(require("../../../../Auth/helper/auth.helper"));
class AppFeatureController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new feature_service_1.default();
    }
    getAllAppFeatures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getAllAppFeatures();
            let successMessage = "App features retrieved successfully!";
            let errorMessage = "Error retrieving app features:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getTotalAppFeatures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let operation = () => this.service.totalFeatures(id);
                let successMessage = "App features retrieved successfully!";
                let errorMessage = "Error retrieving app features:";
                this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    createAppFeature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let featureData = req.body;
            let operation = () => this.service.createAppFeature(featureData);
            let successMessage = "Feature created successfully!";
            let errorMessage = "Error creating feature:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateAppFeature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateAppFeature(id, data);
            let successMessage = "Feature updated successfully!";
            let errorMessage = "Error updating feature:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteAppFeature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteAppFeature(id);
            let successMessage = "Feature deleted successfully!";
            let errorMessage = "Error deleting feature:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getAppFeatureByParent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { parent } = req.body;
            let operation = () => this.service.getAppFeatureByParent(parent);
            let successMessage = "Feature fetched successfully!";
            let errorMessage = "Error fetching feature:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreAppFeature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreAppFeature(id);
            let successMessage = "Feature restored successfully!";
            let errorMessage = "Error restoring feature:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getAppFeatureById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = auth_helper_1.default.getUserIdFromHeader(req);
            if (userId) {
                let { id } = req.body;
                let operation = () => this.service.getById(id, userId);
                let successMessage = "Feature retrieved successfully!";
                let errorMessage = "Error retrieving feature:";
                this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
}
exports.default = AppFeatureController;
