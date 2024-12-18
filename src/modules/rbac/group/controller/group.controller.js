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
const group_service_1 = __importDefault(require("../service/group.service"));
const auth_helper_1 = __importDefault(require("../../../../Auth/helper/auth.helper"));
class GroupController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new group_service_1.default();
        //   }
    }
    getAllGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getAllGroups();
            let successMessage = "Groups retrieved successfully!";
            let errorMessage = "Error retrieving groups:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let { page, pageSize } = req.body;
                let operation = () => this.service.getGroups(page, pageSize, id);
                let successMessage = "Groups retrieved successfully!";
                let errorMessage = "Error retrieving Groups:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    getGroupByGroupId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.getDetailedGroupById(id);
            let successMessage = "Group retrieved successfully!";
            let errorMessage = "Error retrieving Group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getTotalGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const id = AuthHelper.getUserIdFromHeader(req);
            // if (id) {
            let operation = () => this.service.totalGroups();
            let successMessage = "Groups retrieved successfully!";
            let errorMessage = "Error retrieving groups:";
            this.handleRequest(operation, successMessage, errorMessage, res);
            // }
        });
    }
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupData = req.body;
            let operation = () => this.service.createGroup(groupData);
            let successMessage = "Group created successfully!";
            let errorMessage = "Error creating group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateGroup(id, data);
            let successMessage = "Group updated successfully!";
            let errorMessage = "Error updating group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteGroup(id);
            let successMessage = "Group deleted successfully!";
            let errorMessage = "Error deleting group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    restoreGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreGroup(id);
            let successMessage = "Group restored successfully!";
            let errorMessage = "Error restoring group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getGroupById(req, res) {
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
    getGroupByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name } = req.body;
            let operation = () => this.service.getByName(name);
            let successMessage = "Group retrieved successfully!";
            let errorMessage = "Error retrieving group:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    searchGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let id = AuthHelper.getUserIdFromHeader(req);
            // if (id) {
            let { searchTerm, page, pageSize } = req.body;
            let operation = () => this.service.searchGroups(searchTerm, page, pageSize);
            let successMessage = "Search results retrieved successfully!";
            let errorMessage = "Error retrieving search results:";
            yield this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
}
exports.default = GroupController;
