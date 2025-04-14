import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import { User, UserData } from "../types/user";
import UserService from "../service/user.service";
import BlackListedTokenService from "../../Token/service/token.service";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import AuthHelper from "../../../../Auth/helper/auth.helper";
import prisma from "../../../../core/models/base.model";
import { LoggedInTokens } from "../../Token/types/token";
import accessModel from "../../Access/models/access.model";
import { secretKey } from "../../../../environment/environment";
import AccessService from "../../Access/service/access.service";
import EmployeeService from "../../../AMS/Employee/services/employee.service";
class UserController extends BaseController<UserService> {
  protected service = new UserService();
  protected tokenService = new BlackListedTokenService();
  protected accessService = new AccessService();
  protected employeeService = new EmployeeService();

  async getUsers(req: Request, res: Response) {
    let operation = () => this.service.getUsers();
    let successMessage = "Users retrieved successfully!";
    let errorMessage = "Error retrieving users:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getNonAssociatedUsers(req: Request, res: Response) {
    let operation = () => this.service.getNonAssociatedUsers();
    let successMessage = "User  retrieved successfully!";
    let errorMessage = "Error retrieving users:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getAllUsers(req: Request, res: Response) {
    const id = AuthHelper.getUserIdFromHeader(req);
    if (id) {
      let { page, pageSize } = req.body;
      let operation = () => this.service.getAllUsers(page, pageSize, id);
      let successMessage = "Users retrieved successfully!";
      let errorMessage = "Error retrieving Users:";
      await this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }

  async totalUsers(req: Request, res: Response) {
    const id = AuthHelper.getUserIdFromHeader(req);
    if (id) {
      let operation = () => this.service.totalUsers(id);
      let successMessage = "Users retrieved successfully!";
      let errorMessage = "Error retrieving users:";
      this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }

  async getUserById(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.getById(id);
    let successMessage = "Users retrieved successfully!";
    let errorMessage = "Error retrieving users:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getLoggedInUser(req: Request, res: Response) {
    const userId = AuthHelper.getUserIdFromHeader(req);
    let operation = () => this.service.getLoggedInUser(userId);
    let successMessage = "Users retrieved successfully!";
    let errorMessage = "Error retrieving users:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async checkPreviousPassword(req: Request, res: Response) {
    let { password } = req.body;
    const userId = AuthHelper.getUserIdFromHeader(req);
    let operation = () => this.service.checkPreviousPassword(userId, password);
    let successMessage = "checked successfully!";
    let errorMessage = "Error checking users:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async changePassword(req: Request, res: Response) {
    let { password } = req.body;
    const userId = AuthHelper.getUserIdFromHeader(req);
    let operation = () => this.service.changePassword(userId, password);
    let successMessage = "password chnaged successfully!";
    let errorMessage = "Error changing password ";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async changeUserPassword(req: Request, res: Response) {
    let { userId, password } = req.body;
    let operation = () => this.service.changePassword(userId, password);
    await this.service.removeLoggedInUser(userId, "");
    let successMessage = "password changed successfully!";
    let errorMessage = "Error changing password ";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async logoutOfAllDevices(req: Request, res: Response) {
    const userId = AuthHelper.getUserIdFromHeader(req);
    let operation = () => this.service.removeLoggedInUser(userId, "");
    let successMessage = "logged out of all devices successfully!";
    let errorMessage = "Error logging out of all devices ";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async logoutUserOfAllDevices(req: Request, res: Response) {
    const { id } = req.body;
    let operation = () => this.service.removeLoggedInUser(id, "");
    let successMessage = "logged out of all devices successfully!";
    let errorMessage = "Error logging of all devices ";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getDetailedUser(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.getDetailed(id);
    let successMessage = "Users retrieved successfully!";
    let errorMessage = "Error retrieving users:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  //   async changeCompany(req: Request, res: Response) {
  //     let { userId, companyId } = req.body;
  //     let operation = () => this.service.changeCompany(userId, companyId);
  //     let successMessage = "changed compnany successfully!";
  //     let errorMessage = "Error changing company:";
  //     this.handleRequest(operation, successMessage, errorMessage, res);
  //   }

  async createUser(req: Request, res: Response) {
    let userData: UserData = req.body;
    let operation = () => this.service.createUsers(userData);
    let successMessage = "User created successfully!";
    let errorMessage = "Error creating user:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateUser(req: Request, res: Response) {
    let { id, data } = req.body;
    let operation = () => this.service.updateUsers(id, data);
    let successMessage = "User updated successfully!";
    let errorMessage = "Error updating user:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteUser(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.deleteUser(id);
    let successMessage = "User deleted successfully!";
    let errorMessage = "Error deleting user:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchUsers(req: Request, res: Response) {
    let id = AuthHelper.getUserIdFromHeader(req);
    if (id) {
      let { searchTerm, page, pageSize } = req.body;
      let operation = () =>
        this.service.searchUsers(searchTerm, page, pageSize);
      let successMessage = "Search results retrieved successfully!";
      let errorMessage = "Error retrieving search results:";
      await this.handleRequest(operation, successMessage, errorMessage, res);
    }
  }

  async restoreUser(req: Request, res: Response) {
    let { id } = req.body;
    let operation = () => this.service.restoreUser(id);
    let successMessage = "User restored successfully!";
    let errorMessage = "Error restoring user:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async loginUser(req: Request, res: Response) {
    let { username, password, rememberMe, platform } = req.body;
console.log( { username, password, rememberMe, platform } );
    let user: User | null = await this.service.getUserByUsername(username);
    const roleIds: string[] = await accessModel.role.getRoleIds(user?.id || "");
    // const isAdmin = roleIds.includes("2d9c89e7-466d-4b1c-b1b3-3ef5be815ed4");
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const expiresIn = rememberMe ? "6M" : "24h";
    let employee: any = null;
    let isAllowded: boolean = false;

    if (platform == "Mobile") {
      isAllowded = await this.accessService.checkPermission(
        user?.id || "",
        "login.app.*"
      );
    } else if (platform == "Admin") {
      isAllowded = await this.accessService.checkPermission(
        user?.id || "",
        "login.admin.*"
      );
    } else if (platform == "Attendance App") {
      isAllowded = await this.accessService.checkPermission(
        user?.id || "",
        "login.quickmark.*"
      );
      if (user.id) {
        employee = await this.employeeService.getEmployeeByUserId(user.id);
      }
    }

    if (isAllowded) {
      let token: string | null = jwt.sign({ userId: user.id }, secretKey, {
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

      const data: LoggedInTokens = {
        userId: user.id || "",
        token: token,
        rememberMe: rememberMe,
      };

      if (token != null) {
        await prisma.loggedInUsers.gpCreate(data);
      }

      if (employee) {
        return res.json({ token,employee});
      }

      return res.json({ token });
    } else {
      return res
        .status(401)
        .json({ message: "You don't have permission to login ! contact ERP" });
    }
  }

  async logoutUser(req: Request, res: Response) {
    const token = AuthHelper.getTokenFromHeader(req);
    console.log("token:", token);
    if (token) {
      const userId = AuthHelper.getUserIdFromHeader(req);
      console.log("user id :", userId);
      if (userId && token) {
        await this.service.removeLoggedInUser(userId, token);
      }

      res.json({ message: "User logged out successfully" });
    } else {
      res.status(400).json({ message: "Token not provided" });
    }
  }
}

export default UserController;
