import express, { Router } from 'express';
import FeaturePermissionController from '../controller/featurePermission.controller';

class FeaturePermissionRoutes {
  private router: Router;
  private controller: FeaturePermissionController;

  constructor() {
    this.router = express.Router();
    this.controller = new FeaturePermissionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllFeaturePermissions.bind(this.controller));
    this.router.post('/get', this.controller.getFeaturePermissionById.bind(this.controller));
    this.router.post('/create', this.controller.createFeaturePermission.bind(this.controller)); 
    this.router.post('/allowedFeatures', this.controller.getAllowedFeatures.bind(this.controller)); 
    this.router.put('/update', this.controller.updateFeaturePermission.bind(this.controller));
    this.router.post('/restore', this.controller.restoreFeaturePermission.bind(this.controller));
    this.router.post('/delete', this.controller.deleteFeaturePermission.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default FeaturePermissionRoutes;
