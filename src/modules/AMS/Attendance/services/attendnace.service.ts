import attendanceModel from "../models/attendance.model";
import { Attendance } from "../types/Attendance";
import { paginatedData } from "../../../../types/paginatedData";

class AttendanceService {
  async getAllattendances() {
    return await attendanceModel.attendance.gpFindMany();
  }

  async getAttendances(page: number, pageSize: number): Promise<paginatedData> {
    return await attendanceModel.attendance.gpPgFindMany(page, pageSize);
  }


  async getDeletedAttendances(
    page: number,
    pageSize: number
  ): Promise<paginatedData> {
    return await attendanceModel.attendance.gpPgFindDeletedMany(page, pageSize);
  }

  async createAttendance(
    attendanceData: Attendance |Attendance[]
  ): Promise<Attendance |Attendance[]> {
    return await attendanceModel.attendance.gpCreate(attendanceData);
  }

  async updateAttendance(
    attendanceId: string,
    attendanceData: Attendance
  ): Promise<any> {
    return await attendanceModel.attendance.gpUpdate(attendanceId, attendanceData);
  }

  async deleteAttendance(attendanceId: string): Promise<void> {
    await attendanceModel.attendance.gpSoftDelete(attendanceId);
  }

  async restoreAttendance(attendanceId: string): Promise<void> {
    await attendanceModel.attendance.gpRestore(attendanceId);
  }

  async getAttendanceById(attendanceId: string): Promise<Attendance | null> {
    return await attendanceModel.attendance.gpFindById(attendanceId);
  }

  async getTotalAttendances(): Promise<number> {
    return await attendanceModel.attendance.gpCount();
  }

  async searchAttendance(
    searchTerm: string | string[],
    page: number,
    pageSize: number
  ): Promise<paginatedData> {
    const columns: string[] = ['name','surname','address','bloodGroup','code','designation','department','contactNo','martialStatus'];
    return await attendanceModel.attendance.gpSearch(
      searchTerm,
      columns,
      page,
      pageSize
    );
  }

  async getTotal() {
    return await attendanceModel.attendance.gpCount();
  }
}

export default AttendanceService;
