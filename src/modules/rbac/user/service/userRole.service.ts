import UserRoleModel from "../models/userRole.model";
import { UserRole } from "../types/user";

class UserRoleService {
  async getAllUserRoles(): Promise<UserRole[]> {
    return await UserRoleModel.userRole.gpFindMany();
  }

  async createUserRole(
    userRoleData: UserRole | UserRole[]
  ): Promise<UserRole | UserRole[]> {
    return await UserRoleModel.userRole.gpCreate(userRoleData);
  }

  async updateUserRole(
    userRoleId: string,
    userRoleData: UserRole
  ): Promise<UserRole | null> {
    return await UserRoleModel.userRole.gpUpdate(userRoleId, userRoleData);
  }

  async deleteUserRole(userRoleId: string): Promise<void> {
    await UserRoleModel.userRole.delete({
        where: {
            id: userRoleId,
        },
    });
}


  async restoreUserRole(userRoleId: string): Promise<void> {
    await UserRoleModel.userRole.gpRestore(userRoleId);
  }

  async getById(userRoleId: string,): Promise<UserRole[]> {
    return await UserRoleModel.userRole.gpFindById(userRoleId);
  }

  async getByUserId(userId: string) {
    return await UserRoleModel.userRole.getUserRolesByUserId(userId);
  }
}

export default UserRoleService;
