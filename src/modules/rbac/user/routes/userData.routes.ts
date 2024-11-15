import express, { Router } from 'express';
import UserController from '../controller/user.controller';

class UserDataRoutes {
  private router: Router;
  private controller: UserController;

  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getUsers.bind(this.controller));
    this.router.post('/get', this.controller.getAllUsers.bind(this.controller));
    this.router.post('/search', this.controller.searchUsers.bind(this.controller));
    this.router.post('/getById', this.controller.getUserById.bind(this.controller));
    this.router.get('/getLoggedInUser', this.controller.getLoggedInUser.bind(this.controller));
    this.router.post('/checkPassword', this.controller.checkPreviousPassword.bind(this.controller));
    this.router.post('/changePassword', this.controller.changePassword.bind(this.controller));
    this.router.post('/changeUserPassword', this.controller.changeUserPassword.bind(this.controller));
    // this.router.post('/changeCompany', this.controller.changeCompany.bind(this.controller));
    this.router.post('/getDetaileUserById', this.controller.getDetailedUser.bind(this.controller));
    this.router.post('/create', this.controller.createUser.bind(this.controller));
    this.router.get('/total', this.controller.totalUsers.bind(this.controller));
    this.router.put('/update', this.controller.updateUser.bind(this.controller));
    this.router.post('/restore', this.controller.restoreUser.bind(this.controller));
    this.router.post('/delete', this.controller.deleteUser.bind(this.controller));
  }
  

  public getRouter(): Router {
    return this.router;
  }
}

export default UserDataRoutes;
