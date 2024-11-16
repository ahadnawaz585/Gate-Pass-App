import UserGroupModel from '../models/userGroup.model';
import { UserGroup } from "../types/group"

class UserGroupService {
  async getAllUserGroups(): Promise<UserGroup[]> {
    return await UserGroupModel.userGroup.gpFindMany();
  }

  async createUserGroup(userGroupData: UserGroup|UserGroup[]): Promise<UserGroup|UserGroup[]> {
    return await UserGroupModel.userGroup.gpCreate(userGroupData);
  }

  async updateUserGroup(userGroupId:string, userGroupData: UserGroup): Promise<UserGroup | null> {
    return await UserGroupModel.userGroup.gpUpdate(userGroupId, userGroupData);
  }

  async deleteUserGroup(userGroupId:string): Promise<void> {
    await UserGroupModel.userGroup.delete({
      where: {
          id: userGroupId,
      },
  });;
  }

  async restoreUserGroup(userGroupId:string): Promise<void> {
    await UserGroupModel.userGroup.gpRestore(userGroupId);
  }

  async getById(userGroupId:string): Promise<UserGroup[]> {
    return await UserGroupModel.userGroup.gpFindById(userGroupId);
  }

  async getByUserId(userId:string): Promise<UserGroup[]> {
    return await UserGroupModel.userGroup.getUserGroupByUserId(userId);
  }
}

export default UserGroupService;
