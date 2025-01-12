// src/conf/leaveConfig.routes.ts

import express, { Router } from 'express';
import LeaveController from '../controllers/leave.controller';

class LeaveConfigRoutes {
  private router: Router;
  private controller: LeaveController;

  constructor() {
    this.router = express.Router();
    this.controller = new LeaveController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/getAll', this.controller.getAllLeaveConfigurations.bind(this.controller));
    this.router.post('/get', this.controller.getLeaveConfigurations.bind(this.controller));
    this.router.post('/create', this.controller.createLeaveConfiguration.bind(this.controller));
    this.router.put('/update', this.controller.updateLeaveConfiguration.bind(this.controller));
    this.router.post('/delete', this.controller.deleteLeaveConfiguration.bind(this.controller));
    this.router.post('/restore', this.controller.restoreLeaveConfiguration.bind(this.controller));
    this.router.post('/getById', this.controller.getLeaveConfigurationById.bind(this.controller));
    this.router.post('/getDeleted', this.controller.getDeletedLeaveConfigurations.bind(this.controller));
    this.router.post('/search', this.controller.searchLeaveConfigurations.bind(this.controller));
    this.router.get('/total', this.controller.getTotalLeaveConfigurations.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default LeaveConfigRoutes;
