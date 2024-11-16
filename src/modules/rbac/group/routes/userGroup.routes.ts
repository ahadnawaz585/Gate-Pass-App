import express, { Router } from 'express';
import UserGroupController from '../controller/userGroup.controller';

class UserGroupRoutes {
  private router: Router;
  private controller: UserGroupController;

  constructor() {
    this.router = express.Router();
    this.controller = new UserGroupController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllUserGroups.bind(this.controller));
    this.router.post('/getById', this.controller.getUserGroupById.bind(this.controller));
    this.router.post('/getByUserId', this.controller.getUserGroupByUserId.bind(this.controller));
    this.router.post('/create', this.controller.createUserGroup.bind(this.controller));
    this.router.put('/update', this.controller.updateUserGroup.bind(this.controller));
    this.router.post('/restore', this.controller.restoreUserGroup.bind(this.controller));
    this.router.post('/delete', this.controller.deleteUserGroup.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default UserGroupRoutes;

