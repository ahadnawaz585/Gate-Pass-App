import express, { Router } from 'express';
import GroupController from '../controller/group.controller';

class GroupRoutes {
  private router: Router;
  private controller: GroupController;

  constructor() {
    this.router = express.Router();
    this.controller = new GroupController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllGroups.bind(this.controller));
    this.router.post('/get', this.controller.getGroups.bind(this.controller));
    this.router.get('/total', this.controller.getTotalGroups.bind(this.controller));
    this.router.post('/getById', this.controller.getGroupById.bind(this.controller));
    this.router.post('/getGroupById', this.controller.getGroupByGroupId.bind(this.controller));
    this.router.post('/getByName', this.controller.getGroupByName.bind(this.controller));
    this.router.post('/create', this.controller.createGroup.bind(this.controller));
    this.router.put('/update', this.controller.updateGroup.bind(this.controller));
    this.router.post('/restore', this.controller.restoreGroup.bind(this.controller));
    this.router.post('/delete', this.controller.deleteGroup.bind(this.controller));
    this.router.post('/search', this.controller.searchGroups.bind(this.controller));
}

  public getRouter(): Router {
    return this.router;
  }
}

export default GroupRoutes;
