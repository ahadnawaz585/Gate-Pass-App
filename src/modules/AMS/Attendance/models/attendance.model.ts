import prisma from "../../../../core/models/base.model";
import { startOfDay, endOfDay } from "date-fns";
import { Attendance } from "../types/Attendance";
import {
  formatTime,
  getCurrentTimeInPST,
} from "../../../../helper/date.helper";
import { AttendanceStatus, Employee } from "@prisma/client";
import { convertToUTC } from "../helper/date.helper";

const attendanceModel = prisma.$extends({
  model: {
    attendance: {
      async checkAttendance(employeeId: string, status: AttendanceStatus) {
        const todayStart = convertToUTC(startOfDay(getCurrentTimeInPST())); // Convert PST to UTC
        const todayEnd = convertToUTC(endOfDay(getCurrentTimeInPST()));
      
        const employee: Employee = await prisma.employee.gpFindById(employeeId);
        const existingAttendance: any = await prisma.attendance.findFirst({
          where: {
            employeeId: employeeId,
            date: {
              gte: todayStart, // UTC start of day
              lt: todayEnd, // UTC end of day
            },
          },
        });
      
        const employeeName = `${employee.name} ${employee.surname}`;
      
        if (existingAttendance && existingAttendance.status === "ON_LEAVE") {
          return {
            success: true,
            message: `${employeeName} is on Leave`,
          };
        }
      
        if (existingAttendance && existingAttendance.status === "LATE") {
          return {
            success: true,
            message: `${employeeName} is late `,
          };
        }
      
        if (existingAttendance && existingAttendance.status === "PRESENT") {
          if (existingAttendance.checkIn && !existingAttendance.checkOut) {
            return {
              success: true,
              message: `${employeeName} has checked in at: ${formatTime(
                existingAttendance.checkIn
              )} and has not checked out.\nDo you want to check out ${employeeName}?`,
            };
          }
          if (existingAttendance.checkOut && existingAttendance.checkIn) {
            return {
              success: true,
              message: `${employeeName} has already checked in at: ${formatTime(
                existingAttendance.checkIn
              )} and checked out at: ${formatTime(existingAttendance.checkOut)}`,
            };
          }
        }
      
        if (existingAttendance && existingAttendance.status === "ABSENT") {
          return {
            success: true,
            message: `${employeeName} is absent.`,
          };
        }
      
        return {
          success: true,
          message: `${employeeName} has not checked in yet! Do you want to mark attendance for ${employeeName} as ${status}?`,
        };
      },
      
      async markAttendance(attendanceData: Attendance) {
        const todayStart = convertToUTC(startOfDay(getCurrentTimeInPST())); // PST to UTC
        const todayEnd = convertToUTC(endOfDay(getCurrentTimeInPST())); // PST to UTC
      
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
          if (existingAttendance.checkIn) {
            if (!existingAttendance.checkOut) {
              const updatedAttendance = await prisma.attendance.update({
                where: { id: existingAttendance.id },
                data: { checkOut: convertToUTC(new Date()) }, // Save checkout as UTC
              });
              return {
                success: true,
                message: "Check-out marked successfully!",
                data: updatedAttendance,
              };
            }
          }
      
          return {
            success: true,
            message: "Attendance already marked, including check-out",
          };
        }
      
        // Only convert checkIn to UTC if it's defined
        if (attendanceData.checkIn) {
          attendanceData.checkIn = convertToUTC(attendanceData.checkIn);
        }
      
        const newAttendance = await prisma.attendance.create({
          data: attendanceData,
        });
      
        return {
          success: true,
          message: "Attendance created successfully!",
          data: newAttendance,
        };
      }
      
      ,
      async gpFindMany(this: any) {
        const todayStart = convertToUTC(startOfDay(getCurrentTimeInPST())); // PST to UTC
        const todayEnd = convertToUTC(endOfDay(getCurrentTimeInPST())); // PST to UTC
      
        console.log(todayStart, todayEnd);
      
        const data = await prisma.$queryRaw`
          SELECT 
            a.*,
            e."name" AS "employeeName",
            e."surname" AS "employeeSurname",
            e."designation",
            e."contactNo",
            e."address",
            e."department", 
            e."code"
          FROM "Attendance" a
          LEFT JOIN "Employee" e 
            ON a."employeeId" = e.id
          WHERE a."isDeleted" IS NULL
            AND a."date" >= ${todayStart.toISOString()}::timestamp
            AND a."date" <= ${todayEnd.toISOString()}::timestamp
        `;
      
        return data;
      }
      ,
    },
  },
});

export default attendanceModel;
