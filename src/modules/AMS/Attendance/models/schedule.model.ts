import prisma from "../../../../core/models/base.model";
import { startOfDay, endOfDay } from "date-fns";
import { AttendanceStatus } from "@prisma/client";
import { getCurrentTimeInPST } from "../../../../helper/date.helper";

const attendanceScheduleModel = prisma.$extends({
  model: {
    attendanceScheduler: {
      async isTodayAttendanceMarkedSuccessfully(): Promise<boolean> {
        const today = new Date();
        const todayStart = startOfDay(today); // Start of the day in PST
        const todayEnd = endOfDay(today);

        const attendanceSchedule = await prisma.attendanceScheduler.findFirst({
          where: {
            runTime: {
              gte: todayStart,
              lte: todayEnd,
            },
            parent: "ABSENT",
            status: "SUCCESS", // Check if status is SUCCESS
          },
        });

        return !!attendanceSchedule; // Return true if a matching record is found, otherwise false
      },

      async getNonCheckedOutEmployees() {
        const today = new Date();
        const todayStart = startOfDay(today); // Start of the day in PST
        const todayEnd = endOfDay(today);

        // Find all employees who have not been deleted and are not RESIGNED
        const allEmployees = await prisma.employee.findMany({
          select: { id: true },
          where: {
            isDeleted: null,
            status: {
              not: "RESIGNED",
            },
          },
        });

        const allEmployeeIds = allEmployees.map((e) => e.id);

        // Find attendance records for today where checkOut is null and status is PRESENT
        const nonCheckedOutAttendance = await prisma.attendance.findMany({
          where: {
            date: {
              gte: todayStart,
              lte: todayEnd,
            },
            checkOut: null,
            comment:null, // Condition for no check-out
            status: "PRESENT", // Condition for PRESENT status
          },
          select: { employeeId: true },
        });

        // Extract employee IDs with non-checked-out attendance
        const nonCheckedOutEmployeeIds = nonCheckedOutAttendance.map(
          (attendance) => attendance.employeeId
        );

        // Return only employees who are in today's non-checked-out attendance
        const result = allEmployeeIds.filter((id) =>
          nonCheckedOutEmployeeIds.includes(id)
        );

        return result;
      },
      async getNonMarkedEmployees() {
        const today = new Date();
        const todayStart = startOfDay(today); // Start of the day in PST
        const todayEnd = endOfDay(today);

        const allEmployees = await prisma.employee.findMany({
          select: { id: true },
          where: {
            isDeleted: null,
            status: {
              not: "RESIGNED",
            },
          },
        });

        const allEmployeeIds = allEmployees.map((e) => e.id);

        const markedAttendance = await prisma.attendance.findMany({
          where: {
            date: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
          select: { employeeId: true },
        });

        const markedEmployeeIds = markedAttendance.map(
          (attendance) => attendance.employeeId
        );

        const nonMarkedEmployeeIds = allEmployeeIds.filter(
          (id) => !markedEmployeeIds.includes(id)
        );

        return nonMarkedEmployeeIds;
      },
    },
  },
});

export default attendanceScheduleModel;
