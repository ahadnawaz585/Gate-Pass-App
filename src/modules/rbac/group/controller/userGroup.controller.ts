import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import UserGroupService from "../service/userGroup.service";
import { UserGroup } from "../types/group";
import AuthHelper from "../../../../Auth/helper/auth.helper";

class UserGroupController extends BaseController<UserGroupService> {
  protected service = new UserGroupService();

  async getAllUserGroups(req: Request, res: Response) {
    let operation = () => this.service.getAllUserGroups();
    let successMessage = "User groups retrieved successfully!";
    let errorMessage = "Error retrieving user groups:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getUserGroupById(res: Response, req: Request) {
    // const userId = AuthHelper.getUserIdFromHeader(req);
    // if (userId) {
      let { id } = req.body;
      let operation = () => this.service.getById(id);
      let successMessage = "User group retrieved successfully!";
      let errorMessage = "Error retrieving user group:";
      this.handleRequest(operation, successMessage, errorMessage, res);
    // }
  }

  async getUserGroupByUserId(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.getByUserId(id);
    let successMessage = "User group retrieved successfully!";
    let errorMessage = "Error retrieving user group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createUserGroup(req: Request, res: Response) {
    let userGroupData: UserGroup | UserGroup[] = req.body;
    let operation = () => this.service.createUserGroup(userGroupData);
    let successMessage = "User group created successfully!";
    let errorMessage = "Error creating user group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateUserGroup(req: Request, res: Response) {
    let { id, data } = req.body;
    let operation = () => this.service.updateUserGroup(id, data);
    let successMessage = "User group updated successfully!";
    let errorMessage = "Error updating user group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteUserGroup(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.deleteUserGroup(id);
    let successMessage = "User group deleted successfully!";
    let errorMessage = "Error deleting user group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreUserGroup(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.restoreUserGroup(id);
    let successMessage = "User group restored successfully!";
    let errorMessage = "Error restoring user group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}

export default UserGroupController;
