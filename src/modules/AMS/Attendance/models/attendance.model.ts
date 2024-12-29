import prisma from "../../../../core/models/base.model";
import { startOfDay, endOfDay } from "date-fns";
import { Attendance } from "../types/Attendance";
import { formatTime } from "../../../../helper/date.helper";
import { AttendanceStatus, Employee } from "@prisma/client";

const attendanceModel = prisma.$extends({
  model: {
    attendance: {
      async checkAttendance(employeeId: string, status: AttendanceStatus) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const employee: Employee = await prisma.employee.gpFindById(employeeId);
        const existingAttendance: any = await prisma.attendance.findFirst({
          where: {
            employeeId: employeeId,
            date: {
              gte: today, // Start of the current day
              lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Start of the next day
            },
          },
        });

        const employeeName = employee.name + " " + employee.surname ;

        if (existingAttendance && existingAttendance.status == "ON_LEAVE") {
          return {
            success: true,
            message: `${employeeName} is on Leave`,
          };
        }

        if (existingAttendance && existingAttendance.status == "LATE") {
          return {
            success: true,
            message: `${employeeName} is late `,
          };
        }

        if (existingAttendance && existingAttendance.status == 'PRESENT') {
          if (existingAttendance.checkIn && !existingAttendance.checkOut) {
            return {
              success: true,
              message: `${employeeName} has check in at : ${formatTime(
                existingAttendance.checkIn
              )} and has not checked out .\nDo you want to checkout ${employeeName} ?`,
            };
          }
          if(existingAttendance.checkOut && existingAttendance.checkIn){
            return {
              success: true,
              message: `${employeeName} has already checked in at : ${formatTime(
                existingAttendance.checkIn
              )} and checked out at :${formatTime(
                existingAttendance.checkOut
              )}`,
            };
          }
           
        }

        if( existingAttendance && existingAttendance.status == 'ABSENT'){
          return {
            success: true,
            message: `${employeeName} is absent .`,
          };
        }

        return {
          success: true,
          message: `${employeeName} has not checked in yet ! Do you want to mark attendance for  ${employeeName}  as ${status}?`,
        };

      },
      async markAttendance(attendanceData: Attendance) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of the day

        const existingAttendance = await prisma.attendance.findFirst({
          where: {
            employeeId: attendanceData.employeeId,
            date: {
              gte: today, // Start of the current day
              lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Start of the next day
            },
          },
        });

        if (existingAttendance ) {
          // If attendance already exists, mark it as a checkout
          if(existingAttendance.checkIn){
          if (!existingAttendance.checkOut) {
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
        }

          // If checkOut already exists
          return {
            success: true,
            message: "Attendance already marked, including check-out",
          };
        }

        // If no existing attendance, proceed to create
        const newAttendance = await prisma.attendance.create({
          data: attendanceData,
        });

        return {
          success: true,
          message: "Attendance created successfully!",
          data: newAttendance,
        };
      },

      async gpFindMany(this: any) {
        // Calculate start and end of today
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());


        // Fetch full attendance details with employee data
        const data = await prisma.$queryRaw`
          SELECT 
            a.*,
            e."name" AS "employeeName",
            e."surname" AS "employeeSurname",
            e."designation",
            e."contactNo",
            e."address",
            e."department", 
            e."code" -- Include additional employee fields if needed
          FROM "Attendance" a
          LEFT JOIN "Employee" e 
            ON a."employeeId" = e.id
          WHERE a."isDeleted" IS NULL
            AND a."date" >= ${todayStart.toISOString()}::timestamp
            AND a."date" <= ${todayEnd.toISOString()}::timestamp
        `;

        return data;
      },
    },
  },
});

export default attendanceModel;
