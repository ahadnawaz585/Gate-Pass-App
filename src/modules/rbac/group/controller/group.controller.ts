import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import GroupService from "../service/group.service";
import { Group } from "../types/group";
import { createGroup } from "../types/group";
import AuthHelper from "../../../../Auth/helper/auth.helper";

class GroupController extends BaseController<GroupService> {
  protected service = new GroupService();

  async getAllGroups(req: Request, res: Response) {
    let operation = () => this.service.getAllGroups();
    let successMessage = "Groups retrieved successfully!";
    let errorMessage = "Error retrieving groups:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getGroups(req: Request, res: Response) {
    let id = AuthHelper.getUserIdFromHeader(req);
    if (id) {
      let { page, pageSize } = req.body;
      let operation = () => this.service.getGroups(page, pageSize, id);
      let successMessage = "Groups retrieved successfully!";
      let errorMessage = "Error retrieving Groups:";
      await this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }

  async getGroupByGroupId(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.getDetailedGroupById(id);
    let successMessage = "Group retrieved successfully!";
    let errorMessage = "Error retrieving Group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getTotalGroups(req: Request, res: Response) {
    // const id = AuthHelper.getUserIdFromHeader(req);
    // if (id) {
      let operation = () => this.service.totalGroups();
      let successMessage = "Groups retrieved successfully!";
      let errorMessage = "Error retrieving groups:";
      this.handleRequest(operation, successMessage, errorMessage, res);
    // }
  }

  async createGroup(req: Request, res: Response) {
    let groupData: createGroup = req.body;
    let operation = () => this.service.createGroup(groupData);
    let successMessage = "Group created successfully!";
    let errorMessage = "Error creating group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateGroup(req: Request, res: Response) {
    let { id, data } = req.body;
    let operation = () => this.service.updateGroup(id, data);
    let successMessage = "Group updated successfully!";
    let errorMessage = "Error updating group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteGroup(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.deleteGroup(id);
    let successMessage = "Group deleted successfully!";
    let errorMessage = "Error deleting group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreGroup(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.restoreGroup(id);
    let successMessage = "Group restored successfully!";
    let errorMessage = "Error restoring group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getGroupById(req: Request, res: Response) {
    // const userId = AuthHelper.getUserIdFromHeader(req);
    // if (userId) {
      let { id } = req.body;
      let operation = () => this.service.getById(id);
      let successMessage = "Group retrieved successfully!";
      let errorMessage = "Error retrieving group:";
      this.handleRequest(operation, successMessage, errorMessage, res);
    // }
  }

  async getGroupByName(req: Request, res: Response) {
    let { name } = req.body;
    let operation = () => this.service.getByName(name);
    let successMessage = "Group retrieved successfully!";
    let errorMessage = "Error retrieving group:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchGroups(req: Request, res: Response) {
    // let id = AuthHelper.getUserIdFromHeader(req);
    // if (id) {
      let { searchTerm, page, pageSize } = req.body;
      let operation = () =>
        this.service.searchGroups(searchTerm, page, pageSize);
      let successMessage = "Search results retrieved successfully!";
      let errorMessage = "Error retrieving search results:";
      await this.handleRequest(operation, successMessage, errorMessage, res);
    }
//   }
}

export default GroupController;
