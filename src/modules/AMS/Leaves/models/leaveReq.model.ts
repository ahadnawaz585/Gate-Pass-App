import { LeaveRequest, Prisma } from "@prisma/client";
import prisma from "../../../../core/models/base.model";
import { LeaveStatus } from "@prisma/client";

const leaveReqModel = prisma.$extends({
  model: {
    leaveRequest: {
      async gpUpdateStatus(requestId: string, status: LeaveStatus): Promise<void> {
        const leaveRequest = await prisma.leaveRequest.update({
          where: { id: requestId },
          data: { status },
        });

        // Check if the status is APPROVED
        if (status === LeaveStatus.APPROVED) {
          // Create a corresponding LeaveAllocation entry
          const { employeeId, startDate, endDate ,reason} = leaveRequest;

          // Calculate the number of days for the leave
          const assignedDays = Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
          ) + 1;

          // Create the LeaveAllocation record
          await prisma.leaveAllocation.create({
            data: {
              employeeId,
              assignedDays,
              allocationStartDate: startDate,
              allocationEndDate: endDate,
              note: `Leave request approved for dates ${startDate.toISOString()} to ${endDate.toISOString()} due to ${reason}`,
            },
          });
        }
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

