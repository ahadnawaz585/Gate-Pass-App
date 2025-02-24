import attendanceModel from "../models/attendance.model";
import { Attendance } from "../types/Attendance";
import { paginatedData } from "../../../../types/paginatedData";
import { AttendanceStatus } from "@prisma/client";

class AttendanceService {
  async getAllattendances() {
    return await attendanceModel.attendance.gpFindMany();
  }

  async getEmployeeAttendance(employeeId:string,from:Date,to:Date){
    return await attendanceModel.attendance.gpFindEmployeeAttendance(employeeId,from,to);
  }

  async getAttendances(page: number, pageSize: number): Promise<paginatedData> {
    return await attendanceModel.attendance.gpPgFindMany(page, pageSize);
  }

  async getDatedAttendance(from:Date,to:Date){
    return await attendanceModel.attendance.gpFindDatedMany(from,to);
  }

  async faceAttendance(image:string){
return await attendanceModel.attendance.markFaceAttendance(image);
  }

  async getDeletedAttendances(
    page: number,
    pageSize: number
  ): Promise<paginatedData> {
    return await attendanceModel.attendance.gpPgFindDeletedMany(page, pageSize);
  }

  async markAttendance(
    attendanceData: Attendance 
  ){
    return await attendanceModel.attendance.markAttendance(attendanceData);
  }

  async checkAttendance(employeeId:string,attendanceStatus:AttendanceStatus,date:Date
  ){
    return await attendanceModel.attendance.checkAttendance(employeeId,attendanceStatus,date);
  }

  async createAttendance(
    attendanceData: Attendance | Attendance[]
  ): Promise<Attendance | Attendance[]> {
    return await attendanceModel.attendance.gpCreate(attendanceData);
  }

  async updateAttendance(
    attendanceId: string,
    attendanceData: Attendance
  ): Promise<any> {
    return await attendanceModel.attendance.gpUpdate(
      attendanceId,
      attendanceData
    );
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

  async getSpecifcAttendances(type:any,employeeId:any) {
    return await attendanceModel.attendance.getSpecificAttendances(type,employeeId);
  }

  async getTotalAttendances(): Promise<number> {
    return await attendanceModel.attendance.gpCount();
  }

  async searchAttendance(
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
