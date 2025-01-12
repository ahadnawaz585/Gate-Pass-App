// src/req/leaveReq.routes.ts

import express, { Router } from 'express';
import LeaveReqController from '../controllers/leaveReq.controller';

class LeaveReqRoutes {
  private router: Router;
  private controller: LeaveReqController;

  constructor() {
    this.router = express.Router();
    this.controller = new LeaveReqController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllLeaveRequests.bind(this.controller));
    this.router.post('/get', this.controller.getLeaveRequests.bind(this.controller));
    this.router.post('/getEmployee', this.controller.getLeaveRequestsByEmployeeId.bind(this.controller));
    this.router.get('/deleted', this.controller.getDeletedLeaveRequests.bind(this.controller));
    this.router.post('/search', this.controller.searchLeaveRequests.bind(this.controller));
    this.router.get('/total', this.controller.getTotalLeaveRequests.bind(this.controller));
    this.router.post('/create', this.controller.createLeaveRequest.bind(this.controller));
    this.router.put('/update', this.controller.updateLeaveRequest.bind(this.controller));
    this.router.post('/delete', this.controller.deleteLeaveRequest.bind(this.controller));
    this.router.post('/restore', this.controller.restoreLeaveRequest.bind(this.controller));
    this.router.post('/updateStatus', this.controller.updateLeaveRequestStatus.bind(this.controller));
    this.router.get('/getById', this.controller.getLeaveRequestById.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default LeaveReqRoutes;
