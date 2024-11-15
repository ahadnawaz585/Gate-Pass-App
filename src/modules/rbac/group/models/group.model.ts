import prisma from "../../../../core/models/base.model";
import { createGroup } from "../types/group";

const groupModel = prisma.$extends({
    model: {
      group: {
        async actSoftDelete(this: any, id: string) {
          const existingItem = await this.findUnique({ where: { id } });
          if (existingItem.isDeleted === null) {
            await this.update({
              where: { id },
              data: { isDeleted: new Date() },
            });
          }
  
          await prisma.groupRole.deleteMany({
            where: {
              groupId: id,
            },
          });
  
          await prisma.groupRole.deleteMany({
            where: {
              groupId: id,
            },
          });
        },
  
        async actCreate(this: any, data: createGroup) {
        //   const rules: BusinessRule[] =
        //     await businessRuleModel.businessRule.actFindByFeatureId(
        //       "ca.create.*"
        //     );
  
        //   const readAccess = rules[0].operation.readAccess;
        //   const writeAccess = rules[0].operation.writeAccess;
  
          let newData = {
            name: data.name,
            createdAt: new Date(),
            // readAccess: { ...readAccess },
            // writeAccess :{...writeAccess}
          };
  
          const createdItem = await this.create({
            data: newData,
          });
  
          const mappedUsers = data.users.map((userId) => ({
            userId: userId,
            groupId: createdItem.id,
            active: true,
          }));
  
          await prisma.userGroup.gpCreate(mappedUsers);
  
          const mappedRoles = data.roles.map((roleId) => ({
            roleId: roleId,
            groupId: createdItem.id,
            active: true,
          }));
  
          await prisma.groupRole.gpCreate(mappedRoles);
  
        //   const mappedCompanies = data.companies.map((companyId) => ({
        //     companyId: companyId,
        //     groupId: createdItem.id,
        //     active: true,
        //   }));
  
        //   await prisma.companyGroups.actCreate(mappedCompanies);
  
          return createdItem;
        },
  
        async actUpdate(this: any, groupId: string, newData: createGroup) {
          const updatedGroup = await this.update({
            where: { id: groupId },
            data: { name: newData.name },
          });
  
          await prisma.userGroup.deleteMany({
            where: { groupId: updatedGroup.id },
          });
  
          await prisma.groupRole.deleteMany({
            where: { groupId: updatedGroup.id },
          });
  
        //   await prisma.companyGroups.deleteMany({
        //     where: { groupId: updatedGroup.id },
        //   });
  
          const mappedUsers = newData.users.map((userId) => ({
            userId: userId,
            groupId: updatedGroup.id,
            active: true,
          }));
  
          await prisma.userGroup.gpCreate(mappedUsers);
  
          const mappedRoles = newData.roles.map((roleId) => ({
            roleId: roleId,
            groupId: updatedGroup.id,
            active: true,
          }));
  
          await prisma.groupRole.gpCreate(mappedRoles);
  
        //   const mappedCompanies = newData.companies.map((companyId) => ({
        //     companyId: companyId,
        //     groupId: updatedGroup.id,
        //     active: true,
        //   }));
  
        //   await prisma.companyGroups.actCreate(mappedCompanies);
  
          return updatedGroup;
        },
  
        async getGroupByGroupId(groupId: string) {
          const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
          const Group = await prisma.group.findMany({
            where: {
              id: groupId,
              isDeleted: null,
            },
  
            include: {
              userGroups: {
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
                  role: true,
                },
              },
            //   companyGroups: {
            //     where: {
            //       isDeleted: null,
            //     },
            //     include: {
            //       company: true,
            //     },
            //   },
            },
            orderBy: {
              name: "asc",
            },
          });
  
          return Group[0];
        },
      },
    },
  });
  
  export default groupModel;