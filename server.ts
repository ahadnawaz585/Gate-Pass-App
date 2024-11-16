import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CustomerRoutes from "./src/modules/app/customer/routes/customer.routes";
const cookieParser = require("cookie-parser");
import GatePassRoutes from "./src/modules/app/gatePass/routes/gatePass.routes";
import GatePassItemRoutes from "./src/modules/app/gatePassItem/routes/gatePassItem.routes";
import ItemRoutes from "./src/modules/app/item/routes/item.routes";
import AuthRoutes from "./src/Auth/routes/auth.routes";

import UserDataRoutes from "./src/modules/rbac/user/routes/userData.routes";
import UserRoutes from "./src/modules/rbac/user/routes/user.routes";
import RoleRoutes from "./src/modules/rbac/role/routes/role.routes";
import AccessRoutes from "./src/modules/rbac/Access/routes/access.routes";
import GroupRoutes from "./src/modules/rbac/group/routes/group.routes";
import routesHelper from "./src/helper/routes.helper";
import GroupRoleRoutes from "./src/modules/rbac/group/routes/groupRole.routes";
import UserGroupRoutes from "./src/modules/rbac/group/routes/userGroup.routes";

class App {
  private app: Express;
  private helper: typeof routesHelper;

  constructor() {
    this.app = express();
    this.helper = routesHelper;
    this.accessControl();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.startServer();
  }

  private accessControl() {
    // this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Accept, X-Requested-With, application/json"
      );
      next();
    });
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const routes: any[] = [
      //App
      CustomerRoutes,
      GatePassRoutes,
      GatePassItemRoutes,
      ItemRoutes,

      //Rbac
      GroupRoutes,
      GroupRoleRoutes,
      RoleRoutes,
      UserDataRoutes,
      AccessRoutes
    ];
    const openRoutes: any[] = [AuthRoutes,UserRoutes];

    this.app.get("/", (req: Request, res: Response) => {
      res.json({ message: `App is running ` });
    });

    this.helper.initializeRoutes(this.app, true, routes);
    this.helper.initializeRoutes(this.app, false, openRoutes);

    // Error handling middleware should be placed after all other middleware and routes
    this.app.use(this.handleErrors.bind(this));
  }

  private async startServer(): Promise<void> {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  private handleErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
}

new App();
