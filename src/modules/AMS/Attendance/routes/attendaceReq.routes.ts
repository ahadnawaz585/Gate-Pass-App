import express, { Router } from 'express';
import AttendanceReqController from '../controllers/attendanceReq.contoller';

class AttendanceReqRoutes {
  private router: Router;
  private controller: AttendanceReqController;

  constructor() {
    this.router = express.Router();
    this.controller = new AttendanceReqController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllAttendanceRequests.bind(this.controller));
    this.router.post('/get', this.controller.getAttendanceRequests.bind(this.controller));
    this.router.post('/getEmployee', this.controller.getAttendanceRequestsByEmployeeId.bind(this.controller));
    this.router.get('/deleted', this.controller.getDeletedAttendanceRequests.bind(this.controller));
    this.router.post('/search', this.controller.searchAttendanceRequests.bind(this.controller));
    this.router.get('/total', this.controller.getTotalAttendanceRequests.bind(this.controller));
    this.router.post('/create', this.controller.createAttendanceRequest.bind(this.controller));
    this.router.put('/update', this.controller.updateAttendanceRequest.bind(this.controller));
    this.router.post('/delete', this.controller.deleteAttendanceRequest.bind(this.controller));
    this.router.post('/restore', this.controller.restoreAttendanceRequest.bind(this.controller));
    this.router.post('/updateStatus', this.controller.updateAttendanceRequestStatus.bind(this.controller));
    this.router.post('/getById', this.controller.getAttendanceRequestById.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AttendanceReqRoutes;
