"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const featurePermission_controller_1 = __importDefault(require("../controller/featurePermission.controller"));
class FeaturePermissionRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new featurePermission_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllFeaturePermissions.bind(this.controller));
        this.router.post('/get', this.controller.getFeaturePermissionById.bind(this.controller));
        this.router.post('/create', this.controller.createFeaturePermission.bind(this.controller));
        this.router.post('/allowedFeatures', this.controller.getAllowedFeatures.bind(this.controller));
        this.router.put('/update', this.controller.updateFeaturePermission.bind(this.controller));
        this.router.post('/restore', this.controller.restoreFeaturePermission.bind(this.controller));
        this.router.post('/delete', this.controller.deleteFeaturePermission.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = FeaturePermissionRoutes;
