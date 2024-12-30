import attendanceScheduleModel from "../models/schedule.model";
import { AttendanceScheduler } from "../types/schedule";
import { paginatedData } from "../../../../types/paginatedData";
import { ScheduleParent, ScheduleStatus } from "@prisma/client";

class AttendanceScheduleService {
  
  async getAllAttendanceSchedules() {
    return await attendanceScheduleModel.attendanceScheduler.gpFindMany();
  }

  async isTodaysAttendanceMarked(){
    return await attendanceScheduleModel.attendanceScheduler.isTodayAttendanceMarkedSuccessfully();
  }

  async getAttendanceSchedules(page: number, pageSize: number): Promise<paginatedData> {
    return await attendanceScheduleModel.attendanceScheduler.gpPgFindMany(page, pageSize);
  }

  async getDeletedAttendanceSchedules(
    page: number,
    pageSize: number
  ): Promise<paginatedData> {
    return await attendanceScheduleModel.attendanceScheduler.gpPgFindDeletedMany(page, pageSize);
  }

  async getNonCheckoutEmployees(){
    return await attendanceScheduleModel.attendanceScheduler.getNonCheckedOutEmployees();
  }

  async getNonMarkedEmployees(){
    return await attendanceScheduleModel.attendanceScheduler.getNonMarkedEmployees();
  }


  async createAttendanceSchedule(
    AttendanceScheduleData: AttendanceScheduler | AttendanceScheduler[]
  ): Promise<AttendanceScheduler | AttendanceScheduler[]> {
    return await attendanceScheduleModel.attendanceScheduler.gpCreate(AttendanceScheduleData);
  }

  async updateAttendanceSchedule(
    AttendanceScheduleId: string,
    AttendanceScheduleData: AttendanceScheduler
  ): Promise<any> {
    return await attendanceScheduleModel.attendanceScheduler.gpUpdate(
      AttendanceScheduleId,
      AttendanceScheduleData
    );
  }

  async deleteAttendanceSchedule(AttendanceScheduleId: string): Promise<void> {
    await attendanceScheduleModel.attendanceScheduler.gpSoftDelete(AttendanceScheduleId);
  }

  async restoreAttendanceSchedule(AttendanceScheduleId: string): Promise<void> {
    await attendanceScheduleModel.attendanceScheduler.gpRestore(AttendanceScheduleId);
  }

  async getAttendanceScheduleById(AttendanceScheduleId: string): Promise<AttendanceScheduler | null> {
    return await attendanceScheduleModel.attendanceScheduler.gpFindById(AttendanceScheduleId);
  }

  async getTotalAttendanceSchedules(): Promise<number> {
    return await attendanceScheduleModel.attendanceScheduler.gpCount();
  }

  async searchAttendanceSchedule(
    searchTerm: string | string[],
    page: number,
    pageSize: number
  ): Promise<paginatedData> {
    const columns: string[] = [
      "name",
      "surname",
      "address",
      "bloodGroup",
      "code",
      "designation",
      "department",
      "contactNo",
      "martialStatus",
    ];
    return await attendanceScheduleModel.attendanceScheduler.gpSearch(
      searchTerm,
      columns,
      page,
      pageSize
    );
  }

  async getTotal() {
    return await attendanceScheduleModel.attendanceScheduler.gpCount();
  }
}

export default AttendanceScheduleService;
