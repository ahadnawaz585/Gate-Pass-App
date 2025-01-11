import prisma from "../../../../core/models/base.model";
import { startOfDay, endOfDay } from "date-fns";
import { Attendance } from "../types/Attendance";
import {
  formatTime,
  getCurrentTimeInPST,
} from "../../../../helper/date.helper";
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
          const targetDate = date ? date : new Date();
      
          // Convert to Pakistan Standard Time (PST)
          const timeZone = 'Asia/Karachi';
          const targetDateInPST = convertToPST(targetDate);
      
          // Start and end of the day in PST
          const todayStart = startOfDay(targetDateInPST);
          const todayEnd = endOfDay(targetDateInPST);
      
          console.log(`when checking attendance: ${todayStart} - ${todayEnd} for ${targetDate}`);
      
          const employee: Employee = await prisma.employee.gpFindById(employeeId);
          const existingAttendance: any = await prisma.attendance.findFirst({
            where: {
              employeeId: employeeId,
              date: {
                gte: todayStart,
                lt: todayEnd,
              },
            },
          });
      
          const employeeName = `${employee.name} ${employee.surname}`;
      
          if (existingAttendance) {
            if (existingAttendance.status === "ON_LEAVE") {
              return {
                success: true,
                message: `${employeeName} is on Leave`,
              };
            }
      
            if (existingAttendance.status === "LATE") {
              return {
                success: true,
                message: `${employeeName} is late`,
              };
            }
      
            if (existingAttendance.status === "PRESENT") {
              if (existingAttendance.checkIn && !existingAttendance.checkOut) {
                return {
                  success: true,
                  message: `${employeeName} has checked in at: ${formatTime(
                    convertToPST(existingAttendance.checkIn).toString()
                  )} and has not checked out.\nDo you want to check out ${employeeName}?`,
                };
              }
              if (existingAttendance.checkOut && existingAttendance.checkIn) {
                return {
                  success: true,
                  message: `${employeeName} has already checked in at: ${formatTime(
                    convertToPST(existingAttendance.checkIn).toString()
                  )} and checked out at: ${formatTime(
                    convertToPST(existingAttendance.checkOut).toString()
                  )}`,
                };
              }
            }
      
            if (existingAttendance.status === "ABSENT") {
              return {
                success: true,
                message: `${employeeName} is absent.`,
              };
            }
          }
      
          return {
            success: true,
            message: `${employeeName} has not checked in yet! Do you want to mark attendance for ${employeeName} as ${status}?`,
          };
        } catch (error) {
          console.error("Error checking attendance:", error);
          return { success: false, message: "An error occurred while checking attendance." };
        }
      },
      async markAttendance(attendanceData: Attendance) {
        try {
          const timeZone = 'Asia/Karachi';
          
          // Convert to Pakistan Standard Time (PST)
          const nowInPST = convertToPST(new Date());
          const targetDate = attendanceData.date ? attendanceData.date : new Date();
          const targetDateInPST = convertToPST(targetDate);
      
          // Start and end of the day in PST
          const todayStart = startOfDay(targetDateInPST);
          const todayEnd = endOfDay(targetDateInPST);
      
          console.log(`when marking attendance: ${todayStart} - ${todayEnd} for ${targetDate}`);
      
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
            // If attendance already exists, mark it as a checkout
            if (existingAttendance.checkIn && !existingAttendance.checkOut) {
              const updatedAttendance = await prisma.attendance.update({
                where: { id: existingAttendance.id },
                data: { checkOut: new Date() }, // Checkout time is the current time
              });
              return {
                success: true,
                message: "Check-out marked successfully!",
                data: updatedAttendance,
              };
            }
      
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
        } catch (error) {
          console.error("Error marking attendance:", error);
          return { success: false, message: "An error occurred while marking attendance." };
        }
      }
      
,
      async gpFindEmployeeAttendance(
        this: any,
        employeeId: string,
        from: Date,
        to: Date
      ) {
        // Calculate start and end of today
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        const today = new Date();

        const todayStart = from ? startOfDay(from) : startOfMonth;
        const todayEnd = to ? endOfDay(to) : today;
        console.log(todayStart, todayEnd ,"for finding employee");

        // Fetch full attendance details with employee data
        // const data = await prisma.$queryRaw`

        //   SELECT
        //     a.*,
        //     e."name" AS "employeeName",
        //     e."surname" AS "employeeSurname",
        //     e."designation",
        //     e."contactNo",
        //     e."address",
        //     e."department",
        //     e."code" -- Include additional employee fields if needed
        //   FROM "Attendance" a
        //   LEFT JOIN "Employee" e
        //     ON a."employeeId" = ${employeeId}
        //   WHERE a."isDeleted" IS NULL
        //     AND a."date" >= ${todayStart.toISOString()}::timestamp
        //     AND a."date" <= ${todayEnd.toISOString()}::timestamp
        // `;
        const data = await prisma.$queryRaw`
SELECT 
    a.id,
    a."employeeId",
    a."date",
    a.status,
    a."checkIn",
    a."checkOut",
    a.location,
    a."createdAt",
    a."updatedAt",
    a."isDeleted",
    e."name" AS "employeeName",
    e."surname" AS "employeeSurname",
    e."designation",
    e."contactNo",
    e."address",
    e."department"
FROM 
    public."Attendance" a
JOIN 
    public."Employee" e ON a."employeeId" = e.id
WHERE 
    a."employeeId" = ${employeeId} 
    AND a."isDeleted" IS NULL
    AND a."date" >= ${todayStart.toISOString()}::timestamp
    AND a."date" <= ${todayEnd.toISOString()}::timestamp
ORDER BY 
    a."date" ASC; 
        `;

        return data;
      },

      async gpFindDatedMany(this: any, from: Date, to: Date) {
        // Calculate start and end of today
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        const today = new Date();

        const todayStart = from ? startOfDay(from) : from;
        const todayEnd = to ? endOfDay(to) : today;
        console.log(todayStart, todayEnd);

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
            ORDER BY 
            a."date" ASC
        `;

        return data;
      },
      async gpFindMany(this: any) {
        // Calculate start and end of today
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());
        console.log(todayStart, todayEnd);

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
            ORDER BY 
    a."date" ASC
        `;

        return data;
      },
    },
  },
});

export default attendanceModel;
