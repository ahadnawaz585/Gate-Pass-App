// import express, { Request, Response, Router } from 'express';
// import groupRoleController from '../controllers/groupRole';

// class groupRoleRoutes {
//   private router: Router;
//   private controller: groupRoleController;

//   constructor() {
//     this.router = express.Router();
//     this.controller = new groupRoleController();
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.get('/get', this.controller.getAllGroupRoles.bind(this.controller));
//     this.router.post('/get', this.controller.getGroupRoleById.bind(this.controller));
//     this.router.post('/create', this.controller.createGroupRole.bind(this.controller));
//     this.router.put('/update', this.controller.updateGroupRole.bind(this.controller));
//     this.router.post('/restore', this.controller.restoreGroupRole.bind(this.controller));
//     this.router.post('/delete', this.controller.deleteGroupRole.bind(this.controller));
// }


//   public getRouter(): Router {
//     return this.router;
//   }
// }

// export default groupRoleRoutes;
