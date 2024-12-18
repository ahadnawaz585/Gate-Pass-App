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
const userGroup_service_1 = __importDefault(require("../service/userGroup.service"));
class UserGroupController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new userGroup_service_1.default();
    }
    getAllUserGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getAllUserGroups();
            let successMessage = "User groups retrieved successfully!";
            let errorMessage = "Error retrieving user groups:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getUserGroupById(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // const userId = AuthHelper.getUserIdFromHeader(req);
            // if (userId) {
            let { id } = req.body;
            let operation = () => this.service.getById(id);
            let successMessage = "User group retrieved successfully!";
            let errorMessage = "Error retrieving user group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
            // }
        });
    }
    getUserGroupByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.getByUserId(id);
            let successMessage = "User group retrieved successfully!";
            let errorMessage = "Error retrieving user group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createUserGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userGroupData = req.body;
            let operation = () => this.service.createUserGroup(userGroupData);
            let successMessage = "User group created successfully!";
            let errorMessage = "Error creating user group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateUserGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateUserGroup(id, data);
            let successMessage = "User group updated successfully!";
            let errorMessage = "Error updating user group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteUserGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteUserGroup(id);
            let successMessage = "User group deleted successfully!";
            let errorMessage = "Error deleting user group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreUserGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreUserGroup(id);
            let successMessage = "User group restored successfully!";
            let errorMessage = "Error restoring user group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
}
exports.default = UserGroupController;
