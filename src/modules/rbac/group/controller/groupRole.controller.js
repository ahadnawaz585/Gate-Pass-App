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
const groupRole_service_1 = __importDefault(require("../service/groupRole.service"));
class GroupController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new groupRole_service_1.default();
    }
    getAllGroupRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getAllGroupRoles();
            let successMessage = "Groups retrieved successfully!";
            let errorMessage = "Error retrieving groups:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createGroupRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupData = req.body;
            let operation = () => this.service.createGroupRole(groupData);
            let successMessage = "Group created successfully!";
            let errorMessage = "Error creating group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateGroupRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateGroupRole(id, data);
            let successMessage = "Group updated successfully!";
            let errorMessage = "Error updating group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteGroupRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteGroupRole(id);
            let successMessage = "Group deleted successfully!";
            let errorMessage = "Error deleting group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreGroupRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreGroupRole(id);
            let successMessage = "Group restored successfully!";
            let errorMessage = "Error restoring group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGroupRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const userId = AuthHelper.getUserIdFromHeader(req);
            // if (userId) {
            let { id } = req.body;
            let operation = () => this.service.getById(id);
            let successMessage = "Group retrieved successfully!";
            let errorMessage = "Error retrieving group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
            // }
        });
    }
}
exports.default = GroupController;
