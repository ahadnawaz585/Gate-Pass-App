import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import LeaveReqService from "../services/leaveReq.service";
import { LeaveRequest } from "../types/leave";

class LeaveReqController extends BaseController<LeaveReqService> {
  protected service = new LeaveReqService();

  async getAllLeaveRequests(req: Request, res: Response) {
    const operation = () => this.service.getAllLeaveRequests();
    const successMessage = "Leave requests retrieved successfully!";
    const errorMessage = "Error retrieving leave requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getLeaveRequests(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getLeaveRequests(page, pageSize);
    const successMessage = "Leave requests retrieved successfully!";
    const errorMessage = "Error retrieving leave requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getLeaveRequestsByEmployeeId(req: Request, res: Response) {
    const { employeeId } = req.body;
    const operation = () => this.service.getLeaveRequestsByEmployeeId(employeeId);
    const successMessage = "Leave requests for the employee retrieved successfully!";
    const errorMessage = "Error retrieving leave requests for the employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getDeletedLeaveRequests(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getDeletedLeaveRequests(page, pageSize);
    const successMessage = "Deleted leave requests retrieved successfully!";
    const errorMessage = "Error retrieving deleted leave requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchLeaveRequests(req: Request, res: Response) {
    const { searchTerm, page, pageSize } = req.body;
    const operation = () => this.service.searchLeaveRequests(searchTerm, page, pageSize);
    const successMessage = "Leave requests retrieved successfully!";
    const errorMessage = "Error retrieving leave requests:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getTotalLeaveRequests(req: Request, res: Response) {
    const operation = () => this.service.getTotalLeaveRequests();
    const successMessage = "Total leave requests count retrieved successfully!";
    const errorMessage = "Error retrieving total leave requests count:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createLeaveRequest(req: Request, res: Response) {
    const leaveRequestData: LeaveRequest = req.body;
    const operation = () => this.service.createLeaveRequest(leaveRequestData);
    const successMessage = "Leave request created successfully!";
    const errorMessage = "Error creating leave request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateLeaveRequest(req: Request, res: Response) {
    const { requestId, data } = req.body;
    const operation = () => this.service.updateLeaveRequest(requestId, data);
    const successMessage = "Leave request updated successfully!";
    const errorMessage = "Error updating leave request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteLeaveRequest(req: Request, res: Response) {
    const { requestId } = req.body;
    const operation = () => this.service.deleteLeaveRequest(requestId);
    const successMessage = "Leave request deleted successfully!";
    const errorMessage = "Error deleting leave request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreLeaveRequest(req: Request, res: Response) {
    const { requestId } = req.body;
    const operation = () => this.service.restoreLeaveRequest(requestId);
    const successMessage = "Leave request restored successfully!";
    const errorMessage = "Error restoring leave request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getLeaveRequestById(req: Request, res: Response) {
    const { requestId } = req.body;
    const operation = () => this.service.getLeaveRequestById(requestId);
    const successMessage = "Leave request retrieved successfully!";
    const errorMessage = "Error retrieving leave request:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateLeaveRequestStatus(req: Request, res: Response) {
    const { requestId, status } = req.body;
    const operation = () => this.service.updateLeaveRequestStatus(requestId, status);
    const successMessage = "Leave request status updated successfully!";
    const errorMessage = "Error updating leave request status:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}

export default LeaveReqController;
