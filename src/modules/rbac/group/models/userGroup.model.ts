import prisma from "../../../../core/models/base.model";
import { Prisma } from "@prisma/client";

const UserGroupModel = prisma.$extends({
  model: {
    userGroup: {
      async getUserGroupByUserId(userId: string) {
        const userGroup = await prisma.userGroup.findMany({
          where: {
            userId: userId,
            isDeleted: null,
          },
          include: {
            group: true, 
          },
          orderBy: {
            group: {
              name: 'asc',
            }
          }
        });

        return userGroup;
      },
    },
  },
});

export default UserGroupModel;
