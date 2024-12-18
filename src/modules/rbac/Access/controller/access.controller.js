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
const access_service_1 = __importDefault(require("../service/access.service"));
const auth_helper_1 = __importDefault(require("../../../../Auth/helper/auth.helper"));
class AccessController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new access_service_1.default();
    }
    getUserGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                const operation = () => this.service.getUserGroup(id);
                const successMessage = "User groups retrieved successfully!";
                const errorMessage = "Error retrieving user groups:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    getUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                const operation = () => this.service.getUserRole(id);
                const successMessage = "User role retrieved successfully!";
                const errorMessage = "Error retrieving user role:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    // async getUserPermission(req: Request, res: Response) {
    //   const { feature, permission } = req.body;
    //   let id = AuthHelper.getUserIdFromHeader(req);
    //   if (id) {
    //     const operation = () =>
    //       this.service.getUserPermission(id, feature, permission);
    //     const successMessage = "User permission retrieved successfully!";
    //     const errorMessage = "Error retrieving user permission:";
    //     await this.handleRequest(operation, successMessage, errorMessage, res);
    //   }
    // }
    getPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, feature } = req.body;
            if (id) {
                const operation = () => this.service.getPermission(id, feature);
                const successMessage = "Role permission retrieved successfully!";
                const errorMessage = "Error retrieving role permission:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    // async getGroupPermission(req: Request, res: Response) {
    //   const {id, feature, permission } = req.body;
    //   if (id) {
    //     const operation = () =>
    //       this.service.getGroupPermission(id, feature, permission);
    //     const successMessage = "Group permission retrieved successfully!";
    //     const errorMessage = "Error retrieving group permission:";
    //     await this.handleRequest(operation, successMessage, errorMessage, res);
    //   }
    // }
    checkPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { feature } = req.body;
            let id = auth_helper_1.default.getUserIdFromHeader(req);
            // let companyId = AuthHelper.getCompanyIdFromHeader(req);
            if (id) {
                const operation = () => this.service.checkPermission(id, feature);
                const successMessage = "Permission checked successfully!";
                const errorMessage = "Error checking permission:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
}
exports.default = AccessController;
