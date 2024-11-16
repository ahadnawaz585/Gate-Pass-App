import express, { Router } from 'express';
import UserRoleController from '../controller/userRole.controller';
class UserRoleRoutes {
  private router: Router;
  private controller: UserRoleController;

  constructor() {
    this.router = express.Router();
    this.controller = new UserRoleController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllUserRoles.bind(this.controller));
    this.router.post('/getById', this.controller.getUserRoleById.bind(this.controller));
    this.router.post('/getByUserId', this.controller.getUserRoleByUserId.bind(this.controller));
    this.router.post('/create', this.controller.createUserRole.bind(this.controller));
    this.router.put('/update', this.controller.updateUserRole.bind(this.controller));
    this.router.post('/restore', this.controller.restoreUserRole.bind(this.controller));
    this.router.post('/delete', this.controller.deleteUserRole.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default UserRoleRoutes;
