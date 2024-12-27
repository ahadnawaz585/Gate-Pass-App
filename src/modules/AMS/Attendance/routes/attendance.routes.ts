import express, { Router } from 'express';
import AttendanceController from '../controllers/attendance.controller';

class AttendanceRoutes {
  private router: Router;
  private controller: AttendanceController;

  constructor() {
    this.router = express.Router();
    this.controller = new AttendanceController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllAttendances.bind(this.controller));
    this.router.post('/get', this.controller.getAttendances.bind(this.controller));
    this.router.get('/total', this.controller.getTotalAttendances.bind(this.controller));
    this.router.post('/getById', this.controller.getAttendanceById.bind(this.controller));
    this.router.post('/create', this.controller.createAttendance.bind(this.controller));
    this.router.put('/update', this.controller.updateAttendance.bind(this.controller));
    this.router.post('/restore', this.controller.restoreAttendance.bind(this.controller));
    this.router.post('/delete', this.controller.deleteAttendance.bind(this.controller));
    this.router.post('/search', this.controller.searchAttendances.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AttendanceRoutes;
