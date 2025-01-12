// src/alloc/leaveAlloc.routes.ts

import express, { Router } from 'express';
import LeaveAllocController from '../controllers/leaveAlloc.controller';

class LeaveAllocRoutes {
  private router: Router;
  private controller: LeaveAllocController;

  constructor() {
    this.router = express.Router();
    this.controller = new LeaveAllocController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllLeaveAllocations.bind(this.controller));
    this.router.post('/get', this.controller.getLeaveAllocations.bind(this.controller));
    this.router.get('/deleted', this.controller.getDeletedLeaveAllocations.bind(this.controller));
    this.router.post('/search', this.controller.searchLeaveAllocations.bind(this.controller));
    this.router.get('/total', this.controller.getTotalLeaveAllocations.bind(this.controller));
    this.router.post('/create', this.controller.createLeaveAllocation.bind(this.controller));
    this.router.put('/update', this.controller.updateLeaveAllocation.bind(this.controller));
    this.router.post('/delete', this.controller.deleteLeaveAllocation.bind(this.controller));
    this.router.post('/restore', this.controller.restoreLeaveAllocation.bind(this.controller));
    this.router.get('/getById', this.controller.getLeaveAllocationById.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default LeaveAllocRoutes;
