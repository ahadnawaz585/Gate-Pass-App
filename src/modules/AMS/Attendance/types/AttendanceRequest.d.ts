import { LeaveStatus } from "@prisma/client";

export interface AttendanceRequest {
    id?:string;
    employeeId:string;
    reason:string;
    status:LeaveStatus;
    image?:string;
    location?:string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: Date;
  }