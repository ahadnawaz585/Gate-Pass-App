import bcrypt from "bcrypt";
import prisma from "../../../../core/models/base.model";
import { createRole } from "../types/role";
const roleModel = prisma.$extends({
  model: {
    role: {
      async gpFindMany(this: any) {
        const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
        const data = await this.findMany({
          where: {
            isDeleted: null,
            id: {
              not: excludedId,
            },
          },
        });

        return data;
      },
      async gpSoftDelete(this: any, id: string) {
        const existingItem = await this.findUnique({ where: { id } });
        if (existingItem.isDeleted === null) {
          await this.update({
            where: { id },
            data: { isDeleted: new Date() },
          });
        }

        await prisma.userRole.deleteMany({
          where:{
            roleId:id
          }
        })

        await prisma.groupRole.deleteMany({
          where:{
            groupId:id
          }
        })

      
      },
      async changeRole(this: any, userId: string, role: string) {
        const userRole = await prisma.userRole.findFirst({
          where: {
            userId: userId,
            isDeleted: null,
          },
        });

        if (!userRole) {
          throw new Error(`User role for user ${userId} not found.`);
        }

        const roleData = await prisma.role.findFirst({
          where: {
            name: role,
          },
        });

        const newRole = {
          userId: userId,
          roleId: roleData?.id,
        };

        await prisma.userRole.gpUpdate(userRole.id, newRole);
        return newRole;
      },

      async gpCreate(this: any, data: createRole) {
        // const rules: BusinessRule[] =
        //   await businessRuleModel.businessRule.actFindByFeatureId(
        //     "role.create.*"
        //   );

        // const readAccess = rules[0].operation.readAccess;
        // const writeAccess = rules[0].operation.writeAccess;

        let newData = {
          name: data.name,
          createdAt: new Date(),
          // readAccess: { ...readAccess },
          // writeAccess: { ...writeAccess }
        };

        const createdItem = await this.create({
          data: newData,
        });

        const mappedUsers = data.users.map((userId) => ({
          userId: userId,
          roleId: createdItem.id,
          active: true,
        }));

        await prisma.userRole.gpCreate(mappedUsers);

        const mappedGroups = data.groups.map((groupId: string) => ({
          groupId: groupId,
          roleId: createdItem.id,
          active: true,
        }));

        await prisma.groupRole.gpCreate(mappedGroups);

        return createdItem;
      },

      async gpUpdate(this: any, roleId: string, newData: createRole) {
        const updatedRole = await this.update({
          where: { id: roleId },
          data: { name: newData.name },
        });

        await prisma.userRole.deleteMany({
          where: { roleId: updatedRole.id },
        });

        await prisma.groupRole.deleteMany({
          where: { roleId: updatedRole.id },
        });

        const mappedUsers = newData.users.map((userId) => ({
          userId: userId,
          roleId: updatedRole.id,
          active: true,
        }));

        await prisma.userRole.gpCreate(mappedUsers);

        const mappedGroups = newData.groups.map((groupId: string) => ({
          groupId: groupId,
          roleId: updatedRole.id,
          active: true,
        }));

        await prisma.groupRole.gpCreate(mappedGroups);

        return updatedRole;
      },

      async getRoleByroleId(roleId: string) {
        const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
        const Role = await prisma.role.findMany({
            where: {
                id: roleId,
                isDeleted: null,
            },
            include: {
                userRoles: {
                    where: {
                        isDeleted: null,
                        userId: {
                          not: excludedId,
                        },
                    },
                    include: {
                        user: true,
                    },
                },
                groupRoles: {
                  where: {
                      isDeleted: null,
                      
                  },
                  include: {
                      group: true,
                  },
              },
            },
            orderBy: {
                name: "asc",
            },
        });
    
        return Role[0];
    }
    
    },
  },
});

export default roleModel;
