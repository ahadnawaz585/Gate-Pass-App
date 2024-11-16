import prisma from "../../../../core/models/base.model";
import { Prisma, UserRole } from "@prisma/client";

const UserRoleModel = prisma.$extends({
  model: {
    userRole: {
      async getUserRolesByUserId(userId: string) {
        const userRoles = await prisma.userRole.findMany({
          where: {
            userId: userId,
            isDeleted: null,
          },
          include: {
            role: true, 
          },
          orderBy: {
            role: {
              name: 'asc',
            }
          }
        });

        return userRoles;
      },
    },
  },
});

export default UserRoleModel;
