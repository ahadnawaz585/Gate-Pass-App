import { LeaveAllocation, Prisma } from "@prisma/client";
import prisma from "../../../../core/models/base.model";

const leaveAllocModel = prisma.$extends({
  model: {
    leaveAllocation: {
      async gpFindByEmployeeId(this: any, id: string) {
        const data = await prisma.leaveAllocation.findMany({
          where: {
            employeeId: id,
            isDeleted: null,
          },
          select: {
            allocationEndDate: true,
            allocationStartDate: true,
            note: true,
            assignedDays: true,
            leaveConfig: {
              select: {
                name: true, // Only fetch the `name` field from leaveConfig
              },
            },
          },
        });

        return data;
      },
      // Method to get leave allocations by employee ID
      async gpFindManyByEmployeeId(
        employeeId: string
      ): Promise<LeaveAllocation[]> {
        return prisma.leaveAllocation.findMany({
          where: {
            employeeId,
            isDeleted: null, // Ensures only active allocations are retrieved
          },
          include: {
            leaveConfig: true, // Include related leave configuration details
          },
        });
      },
    },
  },
});

export default leaveAllocModel;
