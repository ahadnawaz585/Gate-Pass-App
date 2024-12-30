import { ScheduleParent, ScheduleStatus } from "@prisma/client";
export interface AttendanceScheduler {
  id?: string;
  parent: ScheduleParent;
  runTime: Date;
  status: ScheduleStatus;
  employeeIds:string[]
  log?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Date;
}
