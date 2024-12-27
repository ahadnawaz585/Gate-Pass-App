import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CustomerRoutes from "../../modules/app/customer/routes/customer.routes";
const cookieParser = require("cookie-parser");
import GatePassRoutes from "../../modules/app/gatePass/routes/gatePass.routes";
import GatePassItemRoutes from "../../modules/app/gatePassItem/routes/gatePassItem.routes";
import ItemRoutes from "../../modules/app/item/routes/item.routes";
import AuthRoutes from "../../Auth/routes/auth.routes";
import path from "path";

// import UserDataRoutes from "../../modules/rbac/user/routes/userData.routes";
import UserRoutes from "../../modules/rbac/user/routes/user.routes";
import RoleRoutes from "../../modules/rbac/role/routes/role.routes";
import AccessRoutes from "../../modules/rbac/Access/routes/access.routes";
import GroupRoutes from "../../modules/rbac/group/routes/group.routes";
import routesHelper from "../../helper/routes.helper";
import GroupRoleRoutes from "../../modules/rbac/group/routes/groupRole.routes";
import UserGroupRoutes from "../../modules/rbac/group/routes/userGroup.routes";
import AppFeatureRoutes from "../../modules/rbac/Features/routes/feature.routes";
import UserRoleRoutes from "../../modules/rbac/user/routes/userRole.routes";
import FeaturePermissionRoutes from "../../modules/rbac/Features/routes/featurePermission.routes";
import TokenCleanHelper from '../../helper/schedule.helper';

//AMS

import EmployeeRoutes from "../../modules/AMS/Employee/routes/employee.routes";
import AttendanceRoutes from "../../modules/AMS/Attendance/routes/attendance.routes";

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
    TokenCleanHelper;
  }

  private accessControl() {
    this.app.use(cors({ origin: true }));
    this.app.use(cookieParser());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With, application/json");
      next();
    });
    
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json({ limit: '50mb' }));;
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use('/uploads', express.static(path.join(__dirname, '..','..',  'assets', 'uploads')));
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
      UserRoutes,
      UserGroupRoutes,
      UserRoleRoutes,
      FeaturePermissionRoutes,
      AccessRoutes,
      UserGroupRoutes,
      AppFeatureRoutes,

      //AMS
      EmployeeRoutes,
      AttendanceRoutes
    ];
    
    const openRoutes: any[] = [AuthRoutes];

    this.app.get("/", (req: Request, res: Response) => {
      res.json({ message: `App is running ` });
    });

    this.helper.initializeRoutes(this.app, true, routes);
    this.helper.initializeRoutes(this.app, false, openRoutes);

    // Error handling middleware should be placed after all other middleware and routes
    this.app.use(this.handleErrors.bind(this));
  }

  private async startServer(): Promise<void> {
    const port = process.env.PORT || 3001;
    this.app.listen(port, () => {
      console.log(`path:${path.join(__dirname, '..','..',  'assets', 'uploads')}`);
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

export default App;

