import express, { Router } from 'express';
import AccessController from '../controller/access.controller';

class AccessRoutes {
  private router: Router;
  private controller: AccessController;

  constructor() {
    this.router = express.Router();
    this.controller = new AccessController();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get('/getUserGroup', this.controller.getUserGroup.bind(this.controller));
    this.router.get('/getUserRole', this.controller.getUserRole.bind(this.controller));
    // this.router.post('/userPermission', this.controller.getUserPermission.bind(this.controller));
    this.router.post('/getPermission', this.controller.getPermission.bind(this.controller));
    // this.router.post('/groupPermission', this.controller.getGroupPermission.bind(this.controller));
    this.router.post('/checkPermission', this.controller.checkPermission.bind(this.controller));
    this.router.post('/checkPermissions', this.controller.checkPermissions.bind(this.controller));
  }

  getRouter(): Router {
    return this.router;
  }
}

export default AccessRoutes;
