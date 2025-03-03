import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import AttendanceReqService from "../services/attendanceReq.service";
import { AttendanceRequest } from "../types/AttendanceRequest";

class AttendanceReqController extends BaseController<AttendanceReqService> {
  protected service = new AttendanceReqService();

  async getAllAttendanceRequests(req: Request, res: Response) {
    const operation = () => this.service.getAllAttendanceRequests();
    const successMessage = "Attendance requests retrieved successfully!";
    const errorMessage = "Error retrieving attendance requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getAttendanceRequests(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getAttendanceRequests(page, pageSize);
    const successMessage = "Attendance requests retrieved successfully!";
    const errorMessage = "Error retrieving attendance requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createAttendanceRequest(req: Request, res: Response) {
    const attendanceRequestData: AttendanceRequest = req.body;
    const operation = () => this.service.createAttendanceRequest(attendanceRequestData);
    const successMessage = "Attendance request created successfully!";
    const errorMessage = "Error creating attendance request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateAttendanceRequest(req: Request, res: Response) {
    const { id, data } = req.body;
    const operation = () => this.service.updateAttendanceRequest(id, data);
    const successMessage = "Attendance request updated successfully!";
    const errorMessage = "Error updating attendance request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteAttendanceRequest(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.deleteAttendanceRequest(id);
    const successMessage = "Attendance request deleted successfully!";
    const errorMessage = "Error deleting attendance request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreAttendanceRequest(req: Request, res: Response) {
    const { requestId } = req.body;
    const operation = () => this.service.restoreAttendanceRequest(requestId);
    const successMessage = "Attendance request restored successfully!";
    const errorMessage = "Error restoring attendance request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getAttendanceRequestById(req: Request, res: Response) {
    const { requestId } = req.body;
    const operation = () => this.service.getAttendanceRequestById(requestId);
    const successMessage = "Attendance request retrieved successfully!";
    const errorMessage = "Error retrieving attendance request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getAttendanceRequestsByEmployeeId(req: Request, res: Response) {
    const { employeeId } = req.body;
    const operation = () => this.service.getAttendanceRequestsByEmployeeId(employeeId);
    const successMessage = "Attendance requests for the employee retrieved successfully!";
    const errorMessage = "Error retrieving attendance requests for the employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getDeletedAttendanceRequests(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getDeletedAttendanceRequests(page, pageSize);
    const successMessage = "Deleted attendance requests retrieved successfully!";
    const errorMessage = "Error retrieving deleted attendance requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchAttendanceRequests(req: Request, res: Response) {
    const { searchTerm, page, pageSize } = req.body;
    const operation = () => this.service.searchAttendanceRequests(searchTerm, page, pageSize);
    const successMessage = "Attendance requests retrieved successfully!";
    const errorMessage = "Error retrieving attendance requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getTotalAttendanceRequests(req: Request, res: Response) {
    const operation = () => this.service.getTotalAttendanceRequests();
    const successMessage = "Total attendance requests count retrieved successfully!";
    const errorMessage = "Error retrieving total attendance requests count:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateAttendanceRequestStatus(req: Request, res: Response) {
    const { id, status } = req.body;
    const operation = () => this.service.updateAttendanceRequestStatus(id, status);
    const successMessage = "Attendance request status updated successfully!";
    const errorMessage = "Error updating attendance request status:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}

export default AttendanceReqController;
