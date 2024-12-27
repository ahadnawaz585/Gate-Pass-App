import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import { Attendance } from "../types/Attendance";
import path from "path";
import AttendanceService from "../services/attendnace.service";

class AttendanceController extends BaseController<AttendanceService> {
  protected service = new AttendanceService();

  async getAllAttendances(req: Request, res: Response) {
    const operation = () => this.service.getAllattendances();
    const successMessage = "Attendances retrieved successfully!";
    const errorMessage = "Error retrieving Attendances:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getAttendances(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getAttendances(page, pageSize);
    const successMessage = "Attendances retrieved successfully!";
    const errorMessage = "Error retrieving Attendances:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getDeletedAttendances(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getDeletedAttendances(page, pageSize);
    const successMessage = "Deleted Attendances retrieved successfully!";
    const errorMessage = "Error retrieving deleted Attendances:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchAttendances(req: Request, res: Response) {
    const { searchTerm, page, pageSize } = req.body;
    const operation = () =>
      this.service.searchAttendance(searchTerm, page, pageSize);
    const successMessage = "Attendances retrieved successfully!";
    const errorMessage = "Error retrieving Attendances:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getTotalAttendances(req: Request, res: Response) {
    const operation = () => this.service.getTotalAttendances();
    const successMessage = "Total Attendances count retrieved successfully!";
    const errorMessage = "Error retrieving total Attendances count:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createAttendance(req: Request, res: Response) {
    const AttendanceData: Attendance = req.body;

    const operation = () => this.service.createAttendance(AttendanceData);
    const successMessage = "Attendance created successfully!";
    const errorMessage = "Error creating Attendance:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateAttendance(req: Request, res: Response) {
    const { id, data } = req.body;
    const operation = () => this.service.updateAttendance(id, data);
    const successMessage = "Attendance updated successfully!";
    const errorMessage = "Error updating Attendance:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteAttendance(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.deleteAttendance(id);
    const successMessage = "Attendance deleted successfully!";
    const errorMessage = "Error deleting Attendance:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getAttendanceById(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.getAttendanceById(id);
    const successMessage = "Attendance retrieved successfully!";
    const errorMessage = "Error retrieving Attendance:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreAttendance(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.restoreAttendance(id);
    const successMessage = "Attendance restored successfully!";
    const errorMessage = "Error restoring Attendance:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
  
}

export default AttendanceController;
