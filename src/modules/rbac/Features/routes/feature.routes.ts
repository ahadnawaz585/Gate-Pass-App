import express, { Request, Response, Router } from 'express';
import AppFeatureController from '../controller/feature.controller';

class AppFeatureRoutes {
  private router: Router;
  private controller: AppFeatureController;

  constructor() {
    this.router = express.Router();
    this.controller = new AppFeatureController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllAppFeatures.bind(this.controller));
    this.router.get('/total', this.controller.getTotalAppFeatures.bind(this.controller));
    this.router.post('/get', this.controller.getAppFeatureById.bind(this.controller)); 
    this.router.post('/getByParent', this.controller.getAppFeatureByParent.bind(this.controller)); 
    this.router.post('/create', this.controller.createAppFeature.bind(this.controller));
    this.router.put('/update', this.controller.updateAppFeature.bind(this.controller));
    this.router.post('/restore', this.controller.restoreAppFeature.bind(this.controller));
    this.router.post('/delete', this.controller.deleteAppFeature.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AppFeatureRoutes;
