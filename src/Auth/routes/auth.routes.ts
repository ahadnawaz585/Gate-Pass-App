import { Router } from "express";
import auth from "../controller/auth";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/generateToken", auth.generateToken);
  }

  public getRouter() {
    return this.router;
  }
}

export default AuthRoutes;
