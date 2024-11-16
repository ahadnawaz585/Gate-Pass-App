import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import UserRoleService from "../service/userRole.service";
import { UserRole} from "../types/user";
import AuthHelper from "../../../../Auth/helper/auth.helper";

class UserRoleController extends BaseController<UserRoleService> {
  protected service = new UserRoleService();

  async getAllUserRoles(req: Request, res: Response) {
    let operation = () => this.service.getAllUserRoles();
    let successMessage = "User roles retrieved successfully!";
    let errorMessage = "Error retrieving user roles:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getUserRoleById(req: Request, res: Response) {
    // const userId = AuthHelper.getUserIdFromHeader(req);
    // if (userId) {
      let { id } = req.body;
      let operation = () => this.service.getById(id);
      let successMessage = "User role retrieved successfully!";
      let errorMessage = "Error retrieving user role:";
      this.handleRequest(operation, successMessage, errorMessage, res);
    // }
  }

  async getUserRoleByUserId(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.getByUserId(id);
    let successMessage = "User role retrieved successfully!";
    let errorMessage = "Error retrieving user role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createUserRole(req: Request, res: Response) {
    let userRoleData: UserRole | UserRole[] = req.body;
    let operation = () => this.service.createUserRole(userRoleData);
    let successMessage = "User role created successfully!";
    let errorMessage = "Error creating user role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateUserRole(req: Request, res: Response) {
    let { id, data } = req.body;
    let operation = () => this.service.updateUserRole(id, data);
    let successMessage = "User role updated successfully!";
    let errorMessage = "Error updating user role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteUserRole(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.deleteUserRole(id);
    let successMessage = "User role deleted successfully!";
    let errorMessage = "Error deleting user role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreUserRole(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.restoreUserRole(id);
    let successMessage = "User role restored successfully!";
    let errorMessage = "Error restoring user role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}

export default UserRoleController;
