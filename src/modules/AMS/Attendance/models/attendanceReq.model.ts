
import { AttendanceStatus, LeaveStatus } from "@prisma/client";
import prisma from "../../../../core/models/base.model";
import { AttendanceRequest } from "../types/AttendanceRequest";
import attendanceModel from "./attendance.model";


const attendanceRequestModel = prisma.$extends({
  model: {
    attendanceRequest:{

      async gpUpdateStatus(requestId: string, status: LeaveStatus): Promise<void> {
        const attendanceRequest = await prisma.attendanceRequest.update({
          where: { id: requestId },
          data: { status },
        });

        // Check if the status is APPROVED
        if (status === LeaveStatus.APPROVED) {
          // Create a corresponding LeaveAllocation entry
          const { employeeId, reason,createdAt,location} = attendanceRequest;
          
          const Attendance = {
            employeeId,
            date:createdAt || new Date(),
            status:AttendanceStatus.PRESENT,
            location: location ?? undefined,
          }

         attendanceModel.attendance.markAttendance(Attendance);
        }
      },
      async gpFindManyByEmployeeId(
        employeeId: string
      ){
        return await prisma.attendanceRequest.findMany({
          where: { employeeId, isDeleted: null },
        });
      },
    }
  },
});
export default attendanceRequestModel;
