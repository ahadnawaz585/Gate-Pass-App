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
const baseController_helper_1 = __importDefault(require("../helper/baseController.helper"));
const featurePermission_service_1 = __importDefault(require("../services/featurePermission.service"));
const auth_helper_1 = __importDefault(require("../helper/auth.helper"));
class FeaturePermissionController extends baseController_helper_1.default {
    constructor() {
        super(...arguments);
        this.service = new featurePermission_service_1.default();
    }
    getAllFeaturePermissions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getAllFeaturePermissions();
            let successMessage = 'Feature permissions retrieved successfully!';
            let errorMessage = 'Error retrieving feature permissions:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createFeaturePermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionData = req.body;
            let operation = () => this.service.createFeaturePermission(permissionData);
            let successMessage = 'Permission created successfully!';
            let errorMessage = 'Error creating permission:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateFeaturePermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateFeaturePermission(id, data);
            let successMessage = 'Permission updated successfully!';
            let errorMessage = 'Error updating permission:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getAllowedFeatures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { parentType, parentId } = req.body;
            let operation = () => this.service.actGetAllowedFeatures(parentId, parentType);
            let successMessage = 'Permission getting allowed successfully!';
            let errorMessage = 'Error allowed features permission:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteFeaturePermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteFeaturePermission(id);
            let successMessage = 'Permission deleted successfully!';
            let errorMessage = 'Error deleting permission:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreFeaturePermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreFeaturePermission(id);
            let successMessage = 'Permission restored successfully!';
            let errorMessage = 'Error restoring permission:';
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getFeaturePermissionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = auth_helper_1.default.getUserIdFromHeader(req);
            if (userId) {
                let { id } = req.body;
                let operation = () => this.service.getById(id, userId);
                let successMessage = 'Feature permission retrieved successfully!';
                let errorMessage = 'Error retrieving feature permission:';
                this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
}
exports.default = FeaturePermissionController;
