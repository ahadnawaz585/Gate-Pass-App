import express, { Router } from 'express';
import GatePassItemController from '../controllers/gatePassItem';

class GatePassItemRoutes {
  private router: Router;
  private controller: GatePassItemController;

  constructor() {
    this.router = express.Router();
    this.controller = new GatePassItemController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllGatePassItem.bind(this.controller));
    this.router.post('/get', this.controller.getGatePassItem.bind(this.controller));
    this.router.get('/total', this.controller.getTotalGatePassItem.bind(this.controller));
    this.router.post('/create', this.controller.createGatePassItem.bind(this.controller));
    this.router.put('/update', this.controller.updateGatePassItem.bind(this.controller));
    this.router.post('/delete', this.controller.deleteGatePassItem.bind(this.controller));
    this.router.post('/getById', this.controller.getGatePassItemById.bind(this.controller));
    this.router.post('/restore', this.controller.restoreGatePassItem.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default GatePassItemRoutes;
