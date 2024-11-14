import express, { Router } from 'express';
import RoleController from '../controller/role.controller';

class RoleRoutes {
  private router: Router;
  private controller: RoleController;

  constructor() {
    this.router = express.Router();
    this.controller = new RoleController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllRoles.bind(this.controller));
    this.router.post('/get', this.controller.getRoles.bind(this.controller));
    this.router.get('/total', this.controller.getTotalRoles.bind(this.controller));
    this.router.post('/getById', this.controller.getRoleById.bind(this.controller));
    this.router.post('/getRoleById', this.controller.getDetailedRoleById.bind(this.controller));
    this.router.post('/getByName', this.controller.getRoleByName.bind(this.controller));
    this.router.post('/create', this.controller.createRole.bind(this.controller));
    this.router.put('/changeRole', this.controller.changeRole.bind(this.controller));
    this.router.put('/update', this.controller.updateRole.bind(this.controller));
    this.router.post('/restore', this.controller.restoreRole.bind(this.controller));
    this.router.post('/delete', this.controller.deleteRole.bind(this.controller));
    this.router.post('/search', this.controller.searchRoles.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default RoleRoutes;
