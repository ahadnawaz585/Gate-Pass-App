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
const role_service_1 = __importDefault(require("../service/role.service"));
const auth_helper_1 = __importDefault(require("../../../../Auth/helper/auth.helper"));
class RoleController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new role_service_1.default();
    }
    getAllRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getAllRoles();
            let successMessage = "Roles retrieved successfully!";
            let errorMessage = "Error retrieving roles:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let { page, pageSize } = req.body;
                let operation = () => this.service.getRoles(page, pageSize, id);
                let successMessage = "Roles retrieved successfully!";
                let errorMessage = "Error retrieving Roles:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    getTotalRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let operation = () => this.service.totalRoles(id);
                let successMessage = "Roles retrieved successfully!";
                let errorMessage = "Error retrieving roles:";
                this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    getRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = auth_helper_1.default.getUserIdFromHeader(req);
            if (userId) {
                let { id } = req.body;
                let operation = () => this.service.getById(id, userId);
                let successMessage = "Role retrieved successfully!";
                let errorMessage = "Error retrieving role:";
                this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    getDetailedRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.getDetailedRoleById(id);
            let successMessage = "Role retrieved successfully!";
            let errorMessage = "Error retrieving role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getRoleByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name } = req.body;
            let operation = () => this.service.getByName(name);
            let successMessage = "Role retrieved successfully!";
            let errorMessage = "Error retrieving role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleData = req.body;
            let operation = () => this.service.createRole(roleData);
            let successMessage = "Role created successfully!";
            let errorMessage = "Error creating role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateRole(id, data);
            let successMessage = "Role updated successfully!";
            let errorMessage = "Error updating role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    changeRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { role } = req.body;
            const id = auth_helper_1.default.getUserIdFromHeader(req);
            let operation = () => this.service.changeRole(id, role);
            let successMessage = "Role updated successfully!";
            let errorMessage = "Error updating role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteRole(id);
            let successMessage = "Role deleted successfully!";
            let errorMessage = "Error deleting role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreRole(id);
            let successMessage = "Role restored successfully!";
            let errorMessage = "Error restoring role:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    searchRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let { searchTerm, page, pageSize } = req.body;
                let operation = () => this.service.searchRoles(searchTerm, page, pageSize, id);
                let successMessage = "Search results retrieved successfully!";
                let errorMessage = "Error retrieving search results:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
}
exports.default = RoleController;
