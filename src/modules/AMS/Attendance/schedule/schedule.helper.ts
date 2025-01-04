import schedule from "node-schedule";
import prisma from "../../../../core/models/base.model";
import AttendanceScheduleService from "../services/schedule.service";
import { Attendance } from "../types/Attendance";
import { AttendanceScheduler } from "../types/schedule";
import {
  AttendanceStatus,
  Employee,
  ScheduleParent,
  ScheduleStatus,
} from "@prisma/client";
import AttendanceService from "../services/attendnace.service";
import { connect } from "http2";
import { getCurrentTimeInPST } from "../../../../helper/date.helper";

class AttendanceSchedulerHelper {
  private service: AttendanceScheduleService = new AttendanceScheduleService();
  private attendanceService: AttendanceService = new AttendanceService();
  private attendanceSchedulerService: AttendanceScheduleService =
    new AttendanceScheduleService();
  private attendanceSchedule: schedule.Job;

  constructor() {
    this.attendanceSchedule = schedule.scheduleJob(
      "*/1 * * * *", // Runs every minute
      this.cleanup.bind(this)
    );
  }

  private async cleanup() {
    await this.absentMarking();
  }

  // private async checkOuts(){
  //   try {
  //     const now = new Date();

  //     // Check if the time is between 11:50 PM and 12:00 AM
  //     const hour = now.getHours();
  //     const minutes = now.getMinutes();

  //     if (hour === 23 && minutes >= 50) {
  //       console.log("Running cleanup during the last 10 minutes of the day...");
  //       console.log("Not marked:", await this.service.getNonCheckoutEmployees());
  //       const data = await this.service.getNonCheckoutEmployees();

  //       try {
  //         data.forEach(async (employeeId: string) => {
  //           if (employeeId) {
  //             const attendance: Employee = {
  //               employeeId,
  //               status: AttendanceStatus.PRESENT,
  //               checkOut: now,
  //             };

  //             await this.attendanceService.markAttendance(attendance);
  //           }
  //         });

  //         const scheduleReport: AttendanceScheduler = {
  //           log: "Absents marked Successfully !",
  //           parent: ScheduleParent.ABSENT,
  //           status: ScheduleStatus.SUCCESS,
  //           runTime: now,
  //         };

  //         await this.attendanceSchedulerService.createAttendanceSchedule(
  //           scheduleReport
  //         );
  //       } catch (err: any) {
  //         const scheduleReport: AttendanceScheduler = {
  //           log: "Absents marking failed !",
  //           parent: ScheduleParent.ABSENT,
  //           status: ScheduleStatus.FAIL,
  //           runTime: now,
  //         };
  //         await this.attendanceSchedulerService.createAttendanceSchedule(
  //           scheduleReport
  //         );
  //       }
  //     } else {
  //       console.log(
  //         "Cleanup skipped. Current time is outside the last 10 minutes of the day."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error during attendance cleanup:", error);
  //   }
  // }

  private async absentMarking() {
    const now = getCurrentTimeInPST();
    try {
      // Check if the time is between 11:50 PM and 12:00 AM
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const absentsMarked =
       await this.attendanceSchedulerService.isTodaysAttendanceMarked();
      if (!absentsMarked) {
        if (hour === 11 && minutes >= 55) {
          console.log(
            "Running cleanup during the last 10 minutes of the day..."
          );
          console.log(
            "Not marked:",
            await this.service.getNonMarkedEmployees()
          );
          const data = await this.service.getNonMarkedEmployees();
          try {
            data.forEach(async (employeeId: string) => {
              if (employeeId) {
                const attendance: Attendance = {
                  employeeId,
                  status: AttendanceStatus.ABSENT,
                  date: now,
                };

                await this.attendanceService.markAttendance(attendance);
              }
            });

            const scheduleReport: AttendanceScheduler = {
              log: "Absents marked Successfully !",
              parent: ScheduleParent.ABSENT,
              status: ScheduleStatus.SUCCESS,
              employeeIds: data,
              runTime: now,
            };

            await this.attendanceSchedulerService.createAttendanceSchedule(
              scheduleReport
            );
          } catch (err: any) {
            const scheduleReport: AttendanceScheduler = {
              log: "Absents marking failed !",
              parent: ScheduleParent.ABSENT,
              status: ScheduleStatus.FAIL,
              employeeIds: [],
              runTime: now,
            };
            await this.attendanceSchedulerService.createAttendanceSchedule(
              scheduleReport
            );
          }
        } else {
          console.log(
            "Cleanup skipped. Current time is outside the last 10 minutes of the day."
          );
        }
      }else{
        console.log("skipping becasue the status is : ",absentsMarked);
      }
    } catch (error) {
      const scheduleReport: AttendanceScheduler = {
        log: "Absents marking failed !",
        parent: ScheduleParent.ABSENT,
        status: ScheduleStatus.SKIP,
        employeeIds: [],
        runTime: now,
      };
      await this.attendanceSchedulerService.createAttendanceSchedule(
        scheduleReport
      );
      console.error("Error during attendance cleanup:", error);
    }
  }
}

export default new AttendanceSchedulerHelper();
