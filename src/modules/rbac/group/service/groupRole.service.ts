import prisma from '../../../../core/models/base.model';
import { GroupRole } from '../types/group';

class GroupRoleService {
  async getAllGroupRoles(): Promise<GroupRole[]> {
    return await prisma.groupRole.gpFindMany();
  }

  async createGroupRole(roleData: GroupRole|GroupRole[]): Promise<GroupRole|GroupRole[]> {
    return await prisma.groupRole.gpCreate(roleData);
  }

  async updateGroupRole(roleId:string, roleData: GroupRole): Promise<GroupRole | null> {
    return await prisma.groupRole.gpUpdate(roleId, roleData);
  }

  async deleteGroupRole(roleId:string): Promise<void> {
    await prisma.groupRole.delete({
      where: {
          id: roleId,
      },
  });
  }

  async restoreGroupRole(roleId:string): Promise<void> {
    await prisma.groupRole.gpRestore(roleId);
  }

  async getById(roleId:string):Promise<GroupRole[]> {
    return await prisma.groupRole.gpFindById(roleId);
  }
}

export default GroupRoleService;
