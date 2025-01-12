import prisma from "../../../../core/models/base.model";
import { startOfDay, endOfDay } from "date-fns";
import { Attendance } from "../types/Attendance";
import { formatTime, getCurrentTimeInPST } from "../../../../helper/date.helper";
import { AttendanceStatus, Employee } from "@prisma/client";
import { convertToPST } from "../helper/date.helper";

const attendanceModel = prisma.$extends({
  model: {
    attendance: {
      async checkAttendance(
        employeeId: string,
        status: AttendanceStatus,
        date?: Date
      ) {
        try {
          const targetDate = date || new Date();
          const targetDateInPST = convertToPST(targetDate);

          const todayStart = startOfDay(targetDateInPST);
          const todayEnd = endOfDay(targetDateInPST);

          console.log(
            `Checking attendance for ${employeeId}: ${todayStart} - ${todayEnd}`
          );

          const employee: Employee = await prisma.employee.gpFindById(employeeId);
          const existingAttendance = await prisma.attendance.findFirst({
            where: {
              employeeId,
              date: {
                gte: todayStart,
                lt: todayEnd,
              },
            },
          });

          const employeeName = `${employee.name} ${employee.surname}`;

          if (existingAttendance) {
            switch (existingAttendance.status) {
              case "ON_LEAVE":
                return { success: true, message: `${employeeName} is on leave.` };
              case "LATE":
                return { success: true, message: `${employeeName} is late.` };
              case "PRESENT":
                if (existingAttendance.checkIn && !existingAttendance.checkOut) {
                  return {
                    success: true,
                    message: `${employeeName} checked in at ${formatTime(
                      convertToPST(existingAttendance.checkIn).toString()
                    )} but has not checked out. Do you want to check out ${employeeName}?`,
                  };
                }
                if (existingAttendance.checkOut && existingAttendance.checkIn) {
                  return {
                    success: true,
                    message: `${employeeName} checked in at ${formatTime(
                      convertToPST(existingAttendance?.checkIn).toString()
                    )} and checked out at ${formatTime(
                      convertToPST(existingAttendance.checkOut).toString()
                    )}.`,
                  };
                }
                break;
              case "ABSENT":
                return { success: true, message: `${employeeName} is absent.` };
            }
          }

          return {
            success: true,
            message: `${employeeName} has not checked in yet! Do you want to mark attendance as ${status}?`,
          };
        } catch (error) {
          console.error("Error checking attendance:", error);
          return { success: false, message: "An error occurred while checking attendance." };
        }
      },

      async markAttendance(attendanceData: Attendance) {
        try {
          const targetDate = attendanceData.date || new Date();
          const targetDateInPST = convertToPST(targetDate);

          const todayStart = startOfDay(targetDateInPST);
          const todayEnd = endOfDay(targetDateInPST);

          console.log(
            `Marking attendance for ${attendanceData.employeeId}: ${todayStart} - ${todayEnd}`
          );

          const existingAttendance = await prisma.attendance.findFirst({
            where: {
              employeeId: attendanceData.employeeId,
              date: {
                gte: todayStart,
                lt: todayEnd,
              },
            },
          });

          if (existingAttendance) {
            if (existingAttendance.checkIn && !existingAttendance.checkOut) {
              const updatedAttendance = await prisma.attendance.update({
                where: { id: existingAttendance.id },
                data: { checkOut: new Date() },
              });
              return {
                success: true,
                message: "Check-out marked successfully!",
                data: updatedAttendance,
              };
            }
            return { success: true, message: "Attendance already marked." };
          }

          const newAttendance = await prisma.attendance.create({
            data: attendanceData,
          });

          return {
            success: true,
            message: "Attendance created successfully!",
            data: newAttendance,
          };
        } catch (error) {
          console.error("Error marking attendance:", error);
          return { success: false, message: "An error occurred while marking attendance." };
        }
      },

      async gpFindEmployeeAttendance(employeeId: string, from: Date, to: Date) {
        const todayStart = from ? startOfDay(from) : startOfDay(new Date());
        const todayEnd = to ? endOfDay(to) : endOfDay(new Date());

        console.log(
          `Fetching attendance for ${employeeId}: ${todayStart} - ${todayEnd}`
        );

        const data = await prisma.$queryRaw`
          SELECT 
            a.id, a."employeeId", a."date", a.status, a."checkIn", a."checkOut", 
            a.location, a."createdAt", a."updatedAt", a."isDeleted",
            e."name" AS "employeeName", e."surname" AS "employeeSurname",
            e."designation", e."contactNo", e."address", e."department"
          FROM public."Attendance" a
          JOIN public."Employee" e ON a."employeeId" = e.id
          WHERE a."employeeId" = ${employeeId} 
            AND a."isDeleted" IS NULL
            AND a."date" >= ${todayStart.toISOString()}::timestamp
            AND a."date" <= ${todayEnd.toISOString()}::timestamp
          ORDER BY a."date" ASC;
        `;

        return data;
      },

      async gpFindDatedMany(from: Date, to: Date) {
        const todayStart = from ? startOfDay(from) : startOfDay(new Date());
        const todayEnd = to ? endOfDay(to) : endOfDay(new Date());

        console.log(`Fetching attendance between ${todayStart} and ${todayEnd}`);

        const data = await prisma.$queryRaw`
          SELECT 
            a.*, 
            e."name" AS "employeeName", e."surname" AS "employeeSurname",
            e."designation", e."contactNo", e."address", e."department"
          FROM public."Attendance" a
          LEFT JOIN public."Employee" e ON a."employeeId" = e.id
          WHERE a."isDeleted" IS NULL
            AND a."date" >= ${todayStart.toISOString()}::timestamp
            AND a."date" <= ${todayEnd.toISOString()}::timestamp
          ORDER BY a."date" ASC;
        `;

        return data;
      },

      async gpFindMany() {
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        console.log(`Fetching today's attendance: ${todayStart} - ${todayEnd}`);

        const data = await prisma.$queryRaw`
          SELECT 
            a.*, 
            e."name" AS "employeeName", e."surname" AS "employeeSurname",
            e."designation", e."contactNo", e."address", e."department"
          FROM public."Attendance" a
          LEFT JOIN public."Employee" e ON a."employeeId" = e.id
          WHERE a."isDeleted" IS NULL
            AND a."date" >= ${todayStart.toISOString()}::timestamp
            AND a."date" <= ${todayEnd.toISOString()}::timestamp
          ORDER BY a."date" ASC;
        `;

        return data;
      },
    },
  },
});

export default attendanceModel;
