import express, { Router } from 'express';
import GatePassController from '../controllers/gatePass';

class GatePassRoutes {
  private router: Router;
  private controller: GatePassController;

  constructor() {
    this.router = express.Router();
    this.controller = new GatePassController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllGatePass.bind(this.controller));
    this.router.get('/report', this.controller.gatePassReport.bind(this.controller));
    this.router.post('/get', this.controller.getGatePass.bind(this.controller));
    this.router.post('/getDeleted', this.controller.getDeletedGatePass.bind(this.controller));
    this.router.get('/total', this.controller.getTotalGatePass.bind(this.controller));
    this.router.post('/create', this.controller.createGatePass.bind(this.controller));
    this.router.put('/update', this.controller.updateGatePass.bind(this.controller));
    this.router.post('/delete', this.controller.deleteGatePass.bind(this.controller));
    this.router.post('/date', this.controller.getDatedGatePass.bind(this.controller));
    this.router.post('/status', this.controller.getDatedGatePass.bind(this.controller));
    this.router.post('/approve', this.controller.approveGatePass.bind(this.controller));
    this.router.post('/getById', this.controller.getGatePassById.bind(this.controller));
    this.router.post('/customerId', this.controller.getGatePassByCustomerId.bind(this.controller));
    this.router.post('/itemId', this.controller.getGatePassByItemId.bind(this.controller));
    this.router.post('/pdf', this.controller.gatePassPDF.bind(this.controller));
    this.router.post('/restore', this.controller.restoreGatePass.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  } 
}

export default GatePassRoutes;
