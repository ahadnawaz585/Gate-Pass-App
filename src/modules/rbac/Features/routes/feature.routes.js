"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feature_controller_1 = __importDefault(require("../controller/feature.controller"));
class AppFeatureRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new feature_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get', this.controller.getAllAppFeatures.bind(this.controller));
        this.router.get('/total', this.controller.getTotalAppFeatures.bind(this.controller));
        this.router.post('/get', this.controller.getAppFeatureById.bind(this.controller));
        this.router.post('/getByParent', this.controller.getAppFeatureByParent.bind(this.controller));
        this.router.post('/create', this.controller.createAppFeature.bind(this.controller));
        this.router.put('/update', this.controller.updateAppFeature.bind(this.controller));
        this.router.post('/restore', this.controller.restoreAppFeature.bind(this.controller));
        this.router.post('/delete', this.controller.deleteAppFeature.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = AppFeatureRoutes;
