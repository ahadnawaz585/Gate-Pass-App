import { LeaveRequest, Prisma } from "@prisma/client";
import prisma from "../../../../core/models/base.model";
import { LeaveStatus } from "../types/leave";

const leaveReqModel = prisma.$extends({
  model: {
    leaveRequest: {
      async gpUpdateStatus(requestId: string, status: LeaveStatus): Promise<void> {
        await prisma.leaveRequest.update({
          where: { id: requestId },
          data: { status },
        });
      },

      async gpFindManyByEmployeeId(
        employeeId: string
      ): Promise<LeaveRequest[]> {
        return await prisma.leaveRequest.findMany({
          where: { employeeId, isDeleted: null },
        });
      },
    },
  },
});

export default leaveReqModel;
