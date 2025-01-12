// src/config/routes.ts

import express, { Router } from 'express';
import LeaveConfigRoutes from './leaveConf.routes';
import LeaveReqRoutes from './leaveReq.routes';
import LeaveAllocRoutes from './leaveAlloc.routes';

class LeaveRoutes {
  private router: Router;
  private leaveConfigRoutes: LeaveConfigRoutes;
  private leaveReqRoutes: LeaveReqRoutes;
  private leaveAllocRoutes: LeaveAllocRoutes;

  constructor() {
    this.router = express.Router();
    this.leaveConfigRoutes = new LeaveConfigRoutes();
    this.leaveReqRoutes = new LeaveReqRoutes();
    this.leaveAllocRoutes = new LeaveAllocRoutes();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/leave-configurations', this.leaveConfigRoutes.getRouter());
    this.router.use('/leave-requests', this.leaveReqRoutes.getRouter());
    this.router.use('/leave-allocations', this.leaveAllocRoutes.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default LeaveRoutes;
