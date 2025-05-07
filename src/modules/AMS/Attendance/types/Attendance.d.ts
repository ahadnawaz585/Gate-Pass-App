export interface Attendance {
    id?: string;
    employee?: Employee;
    employeeId: string;
    date: Date;
    status: AttendanceStatus;
    checkIn?: Date;
    comment?:string;
    checkOut?: Date;
    location?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: Date;
  }
  