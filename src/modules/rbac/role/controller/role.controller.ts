import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import RoleService from "../service/role.service";
import { Role } from "../types/role";
import AuthHelper from "../../../../Auth/helper/auth.helper";
import { createRole } from "../types/role";
class RoleController extends BaseController<RoleService> {
  protected service = new RoleService();

  async getAllRoles(req: Request, res: Response) {
    let operation = () => this.service.getAllRoles();
    let successMessage = "Roles retrieved successfully!";
    let errorMessage = "Error retrieving roles:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getRoles(req: Request, res: Response) {
    let id = AuthHelper.getUserIdFromHeader(req);
    if (id) {
      let { page, pageSize } = req.body;
      let operation = () => this.service.getRoles(page, pageSize, id);
      let successMessage = "Roles retrieved successfully!";
      let errorMessage = "Error retrieving Roles:";
      await this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }

  async getTotalRoles(req: Request, res: Response) {
    const id = AuthHelper.getUserIdFromHeader(req);
    if (id) {
      let operation = () => this.service.totalRoles(id);
      let successMessage = "Roles retrieved successfully!";
      let errorMessage = "Error retrieving roles:";
      this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }

  async getRoleById(req: Request, res: Response) {
    const userId = AuthHelper.getUserIdFromHeader(req);
    if (userId) {
      let { id } = req.body;
      let operation = () => this.service.getById(id, userId);
      let successMessage = "Role retrieved successfully!";
      let errorMessage = "Error retrieving role:";
      this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }

  async getDetailedRoleById(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.getDetailedRoleById(id);
    let successMessage = "Role retrieved successfully!";
    let errorMessage = "Error retrieving role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getRoleByName(req: Request, res: Response) {
    let { name } = req.body;
    let operation = () => this.service.getByName(name);
    let successMessage = "Role retrieved successfully!";
    let errorMessage = "Error retrieving role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createRole(req: Request, res: Response) {
    let roleData: createRole = req.body;
    let operation = () => this.service.createRole(roleData);
    let successMessage = "Role created successfully!";
    let errorMessage = "Error creating role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateRole(req: Request, res: Response) {
    let { id, data } = req.body;
    let operation = () => this.service.updateRole(id, data);
    let successMessage = "Role updated successfully!";
    let errorMessage = "Error updating role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async changeRole(req: Request, res: Response) {
    let { role } = req.body;
    const id = AuthHelper.getUserIdFromHeader(req);
    let operation = () => this.service.changeRole(id, role);
    let successMessage = "Role updated successfully!";
    let errorMessage = "Error updating role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteRole(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.deleteRole(id);
    let successMessage = "Role deleted successfully!";
    let errorMessage = "Error deleting role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreRole(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.restoreRole(id);
    let successMessage = "Role restored successfully!";
    let errorMessage = "Error restoring role:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchRoles(req: Request, res: Response) {
    let id = AuthHelper.getUserIdFromHeader(req);
    if (id) {
      let { searchTerm, page, pageSize } = req.body;
      let operation = () =>
        this.service.searchRoles(searchTerm, page, pageSize, id);
      let successMessage = "Search results retrieved successfully!";
      let errorMessage = "Error retrieving search results:";
      await this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }
}

export default RoleController;
