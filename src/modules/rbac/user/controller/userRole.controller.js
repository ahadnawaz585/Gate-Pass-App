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
const userRole_service_1 = __importDefault(require("../service/userRole.service"));
class UserRoleController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new userRole_service_1.default();
    }
    getAllUserRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getAllUserRoles();
            let successMessage = "User roles retrieved successfully!";
            let errorMessage = "Error retrieving user roles:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getUserRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const userId = AuthHelper.getUserIdFromHeader(req);
            // if (userId) {
            let { id } = req.body;
            let operation = () => this.service.getById(id);
            let successMessage = "User role retrieved successfully!";
            let errorMessage = "Error retrieving user role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
            // }
        });
    }
    getUserRoleByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.getByUserId(id);
            let successMessage = "User role retrieved successfully!";
            let errorMessage = "Error retrieving user role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRoleData = req.body;
            let operation = () => this.service.createUserRole(userRoleData);
            let successMessage = "User role created successfully!";
            let errorMessage = "Error creating user role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateUserRole(id, data);
            let successMessage = "User role updated successfully!";
            let errorMessage = "Error updating user role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteUserRole(id);
            let successMessage = "User role deleted successfully!";
            let errorMessage = "Error deleting user role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreUserRole(id);
            let successMessage = "User role restored successfully!";
            let errorMessage = "Error restoring user role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
}
exports.default = UserRoleController;
