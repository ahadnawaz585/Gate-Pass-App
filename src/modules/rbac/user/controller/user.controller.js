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
const user_service_1 = __importDefault(require("../service/user.service"));
const token_service_1 = __importDefault(require("../../Token/service/token.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_helper_1 = __importDefault(require("../../../../Auth/helper/auth.helper"));
const base_model_1 = __importDefault(require("../../../../core/models/base.model"));
const access_model_1 = __importDefault(require("../../Access/models/access.model"));
const environment_1 = require("../../../../environment/environment");
const access_service_1 = __importDefault(require("../../Access/service/access.service"));
const employee_service_1 = __importDefault(require("../../../AMS/Employee/services/employee.service"));
class UserController extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.service = new user_service_1.default();
        this.tokenService = new token_service_1.default();
        this.accessService = new access_service_1.default();
        this.employeeService = new employee_service_1.default();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getUsers();
            let successMessage = "Users retrieved successfully!";
            let errorMessage = "Error retrieving users:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getNonAssociatedUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let operation = () => this.service.getNonAssociatedUsers();
            let successMessage = "User  retrieved successfully!";
            let errorMessage = "Error retrieving users:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let { page, pageSize } = req.body;
                let operation = () => this.service.getAllUsers(page, pageSize, id);
                let successMessage = "Users retrieved successfully!";
                let errorMessage = "Error retrieving Users:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    totalUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let operation = () => this.service.totalUsers(id);
                let successMessage = "Users retrieved successfully!";
                let errorMessage = "Error retrieving users:";
                this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.getById(id);
            let successMessage = "Users retrieved successfully!";
            let errorMessage = "Error retrieving users:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getLoggedInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = auth_helper_1.default.getUserIdFromHeader(req);
            let operation = () => this.service.getLoggedInUser(userId);
            let successMessage = "Users retrieved successfully!";
            let errorMessage = "Error retrieving users:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    checkPreviousPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { password } = req.body;
            const userId = auth_helper_1.default.getUserIdFromHeader(req);
            let operation = () => this.service.checkPreviousPassword(userId, password);
            let successMessage = "checked successfully!";
            let errorMessage = "Error checking users:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { password } = req.body;
            const userId = auth_helper_1.default.getUserIdFromHeader(req);
            let operation = () => this.service.changePassword(userId, password);
            let successMessage = "password chnaged successfully!";
            let errorMessage = "Error changing password ";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    changeUserPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userId, password } = req.body;
            let operation = () => this.service.changePassword(userId, password);
            yield this.service.removeLoggedInUser(userId, "");
            let successMessage = "password changed successfully!";
            let errorMessage = "Error changing password ";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    logoutOfAllDevices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = auth_helper_1.default.getUserIdFromHeader(req);
            let operation = () => this.service.removeLoggedInUser(userId, "");
            let successMessage = "logged out of all devices successfully!";
            let errorMessage = "Error logging out of all devices ";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    logoutUserOfAllDevices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            let operation = () => this.service.removeLoggedInUser(id, "");
            let successMessage = "logged out of all devices successfully!";
            let errorMessage = "Error logging of all devices ";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    getDetailedUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.getDetailed(id);
            let successMessage = "Users retrieved successfully!";
            let errorMessage = "Error retrieving users:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    //   async changeCompany(req: Request, res: Response) {
    //     let { userId, companyId } = req.body;
    //     let operation = () => this.service.changeCompany(userId, companyId);
    //     let successMessage = "changed compnany successfully!";
    //     let errorMessage = "Error changing company:";
    //     this.handleRequest(operation, successMessage, errorMessage, res);
    //   }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = req.body;
            let operation = () => this.service.createUsers(userData);
            let successMessage = "User created successfully!";
            let errorMessage = "Error creating user:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, data } = req.body;
            let operation = () => this.service.updateUsers(id, data);
            let successMessage = "User updated successfully!";
            let errorMessage = "Error updating user:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.deleteUser(id);
            let successMessage = "User deleted successfully!";
            let errorMessage = "Error deleting user:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    searchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = auth_helper_1.default.getUserIdFromHeader(req);
            if (id) {
                let { searchTerm, page, pageSize } = req.body;
                let operation = () => this.service.searchUsers(searchTerm, page, pageSize);
                let successMessage = "Search results retrieved successfully!";
                let errorMessage = "Error retrieving search results:";
                yield this.handleRequest(operation, successMessage, errorMessage, res);
            }
        });
    }
    restoreUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.body;
            let operation = () => this.service.restoreUser(id);
            let successMessage = "User restored successfully!";
            let errorMessage = "Error restoring user:";
            this.handleRequest(operation, successMessage, errorMessage, res);
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password, rememberMe, platform } = req.body;
            console.log({ username, password, rememberMe, platform });
            let user = yield this.service.getUserByUsername(username);
            const roleIds = yield access_model_1.default.role.getRoleIds((user === null || user === void 0 ? void 0 : user.id) || "");
            // const isAdmin = roleIds.includes("2d9c89e7-466d-4b1c-b1b3-3ef5be815ed4");
            if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            const expiresIn = rememberMe ? "6M" : "24h";
            let employee = null;
            let isAllowded = false;
            if (platform == "Mobile") {
                isAllowded = yield this.accessService.checkPermission((user === null || user === void 0 ? void 0 : user.id) || "", "login.app.*");
            }
            else if (platform == "Admin") {
                isAllowded = yield this.accessService.checkPermission((user === null || user === void 0 ? void 0 : user.id) || "", "login.admin.*");
            }
            else if (platform == "Attendance App") {
                isAllowded = yield this.accessService.checkPermission((user === null || user === void 0 ? void 0 : user.id) || "", "login.quickmark.*");
                if (user.id) {
                    employee = yield this.employeeService.getEmployeeByUserId(user.id);
                }
            }
            if (isAllowded) {
                let token = jsonwebtoken_1.default.sign({ userId: user.id }, environment_1.secretKey, {
                    expiresIn,
                });
                // if (user.defaultCompanyId) {
                //   token = jwt.sign(
                //     { userId: user.id, companyId: user.defaultCompanyId },
                //     "your_secret_key",
                //     {
                //       expiresIn,
                //     }
                //   );
                // } else if (user.id === "58c55d6a-910c-46f8-a422-4604bea6cd15" || isAdmin) {
                //   token = jwt.sign(
                //     { userId: user.id, companyId: "a9f53d14-7177-45ef-bf74-f4b8d1a6ce0e" },
                //     "your_secret_key",
                //     {
                //       expiresIn,
                //     }
                //   );
                // } else {
                //   token = null;
                // }
                const data = {
                    userId: user.id || "",
                    token: token,
                    rememberMe: rememberMe,
                };
                if (token != null) {
                    yield base_model_1.default.loggedInUsers.gpCreate(data);
                }
                if (employee) {
                    return res.json({ token, employee });
                }
                return res.json({ token });
            }
            else {
                return res
                    .status(401)
                    .json({ message: "You don't have permission to login ! contact ERP" });
            }
        });
    }
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = auth_helper_1.default.getTokenFromHeader(req);
            console.log("token:", token);
            if (token) {
                const userId = auth_helper_1.default.getUserIdFromHeader(req);
                console.log("user id :", userId);
                if (userId && token) {
                    yield this.service.removeLoggedInUser(userId, token);
                }
                res.json({ message: "User logged out successfully" });
            }
            else {
                res.status(400).json({ message: "Token not provided" });
            }
        });
    }
}
exports.default = UserController;
